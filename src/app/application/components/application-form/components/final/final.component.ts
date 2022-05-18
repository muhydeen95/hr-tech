import {
  animate,
  group,
  query,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BaseComponent } from '@core/base/base/base.component';
import { ConfirmationModalComponent } from '@shared/components/confirmation-modal/confirmation-modal.component';
import { LocalStorageService } from '@shared/services/local-storage.service';
import { LcApplicationService } from 'app/application/services/lc-application.service';
import { ResponseModel } from 'app/models/response.model';
import {
  lCApplicationDTO,
  INITIAL_FORM_DATA,
} from '../../models/lc-application.model';

import { ApplicationStepRoute } from '../../models/step.model';
import { CurrentStepService } from '../../services/current-step.service';

@Component({
  selector: 'app-final',
  templateUrl: './final.component.html',
  styleUrls: ['./final.component.scss'],
  animations: [
    trigger('signatureAnimation', [
      transition('sign => upload', [
        group([
          query(
            ':enter',
            [
              style({ transform: 'scale(0.5)' }),
              animate('0.35s ease-in-out', style({ transform: 'none' })),
            ],
            { optional: true }
          ),
        ]),
      ]),

      transition('upload => sign', [
        group([
          query(
            ':enter',
            [
              style({ transform: 'scale(0.5)' }),
              animate('0.3s ease-in-out', style({ transform: 'none' })),
            ],
            { optional: true }
          ),
        ]),
      ]),
    ]),
  ],
})
export class FinalComponent implements OnInit {
  @ViewChild('signaturePad', { static: false }) signaturePad: any;
  public finalForm!: FormGroup;
  public disableButton: boolean = false;
  public finalFormSubmitted: boolean = false;
  public tab: string = 'sign';
  public arrToSplice = [1, 2, 3, 5, 5];
  public isSignatureUploaded: boolean = false;
  public error_message: string = '';
  public signatureFile: any;
  public supportingDocuments: File[] = [];
  public signaturePreview: any;
  public stampFile: any;
  public isStampUploaded: boolean = false;
  public stampPreview: any;
  public options: any;
  public isLoading: boolean = false;
  public fileReader = new FileReader();
  public applicationForm: lCApplicationDTO = INITIAL_FORM_DATA;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private _step: CurrentStepService,
    private _localStorageAS: LocalStorageService,
    public dialog: MatDialog,
    private _base: BaseComponent,
    private _lc: LcApplicationService
  ) {
    this._localStorageAS.watch('lc_application_form').subscribe((res) => {
      if (res) {
        this.applicationForm = JSON.parse(res);
      }
    });
  }

  ngOnInit(): void {
    window.scroll(0, 0);
    this.initFinalForm();
    this.options = {
      penColor: 'rgb(70, 78, 117)',
      backgroundColor: 'transparent',
    };
  }

  public initFinalForm(): void {
    this.finalForm = this.fb.group({
      signature: [this.applicationForm.signature ?? {}, Validators.required],
      stamp: [this.applicationForm.stamp ?? {}, Validators.required],
      supportingDocument: [
        this.applicationForm.supportingDocument ?? [],
        Validators.required,
      ],
    });
  }
  public back(): void {
    this.router.navigate([ApplicationStepRoute.step_four]);
  }

  public savePng(): void {
    const data = this.signaturePad.toDataURL();
    this.isSignatureUploaded = true;
    this.signaturePreview = data;
    fetch(data)
      .then((res) => res.blob())
      .then((blob) => {
        this.signatureFile = new File([blob], 'File name', {
          type: 'image/png',
        });

        this.finalForm.patchValue({
          signature: this.signatureFile,
        });
      });
  }

  public clearSupporting(): void {
    this.supportingDocuments = [];
    this.finalForm.patchValue({
      supportingDocuments: [],
    });
  }
  public clearSignature(): void {
    this.signaturePad?.isEmpty ? this.signaturePad.clear() : null;
    this.signatureFile = null;
    this.finalForm.patchValue({
      signature: '',
    });
    this.isSignatureUploaded = false;
  }

  public clearStamp(): void {
    this.stampFile = null;
    this.finalForm.patchValue({
      stamp: '',
    });
    this.isStampUploaded = false;
  }

  public changeTab(tab: string): void {
    this.tab = tab;
  }

  public changeStamp(event: any): void {
    if (event.target.files.length > 0) {
      this.stampFile = event.target.files[0];
      this.finalForm.patchValue({
        stamp: this.stampFile,
      });
      this.isStampUploaded = true;
      this.fileReader.readAsDataURL(event.target.files[0]);
      this.fileReader.onloadend = () => {
        this.stampPreview = this.fileReader.result;
      };
    }
  }

  public changeSignature(event: any): void {
    if (event.target.files.length > 0) {
      this.signatureFile = event.target.files[0];
      this.finalForm.patchValue({
        signature: this.signatureFile,
      });
      this.isSignatureUploaded = true;
      this.fileReader.readAsDataURL(event.target.files[0]);
      this.fileReader.onloadend = () => {
        this.signaturePreview = this.fileReader.result;
      };
    }
  }

  public addFiles(event: any): void {
    if (event.target.files.length > 0) {
      for (let i = 0; i < event.target.files.length; i++) {
        this.supportingDocuments.includes(event.target.files[i])
          ? null
          : this.supportingDocuments.push(event.target.files[i]);
      }
      this.finalForm.patchValue({
        supportingDocument: this.supportingDocuments,
      });
    }
  }

  public removeFile(index: number): void {
    this.supportingDocuments.splice(index, 1);
    this.finalForm.patchValue({
      supportingDocument: this.supportingDocuments,
    });
  }

  public openDialog(): void {
    let object = {
      title: 'Confirm Action',
      modalMessage:
        'Would you like to crosscheck information you’ve provided or continue to submit form',
      actionButtonText: 'Submit form',
    };
    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      data: object,
    });

    dialogRef.componentInstance.confirm.subscribe((event: boolean) => {
      if (event) {
        this.finalSubmit();
      } else {
        return;
      }
    });
  }
  public submitForm(): void {
    this.finalFormSubmitted = true;
    if (this.finalForm.valid) {
      this.openDialog();
    }
  }

  public finalSubmit(): void {
    this.isLoading = true;
    const finalFormPayload = this.finalForm.value;
    const payload = { ...this.applicationForm, ...finalFormPayload };
    this._lc.addLcApplication(payload).subscribe({
      next: (res: ResponseModel<any>) => {
        this.error_message = '';
        this.isLoading = false;
        this._step.clearFormFromStorage();
        this._base.openSnackBar(res?.message);
        this.router.navigate(['application']);
      },
      error: (error: HttpErrorResponse) => {
        this.isLoading = false;
        this.finalFormSubmitted = true;
        // Object.values(error?.error).forEach((e: any) =>
        //   this.error_messages.push(e[0])
        // );
        this.error_message = error?.error?.message;
        window.scroll(0, 0);
      },
    });
  }

  public openSucessDialog(): void {
    let object = {
      title: '',
      modalMessage:
        'Your LC application has been submitted successfully. You will be notified once there is an update on you application ',
      actionButtonText: 'Continue',
    };
    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      data: object,
    });
    dialogRef.componentInstance.confirm.subscribe((event: boolean) => {
      if (event) {
        this.router.navigate(['application']);
      } else {
        this.router.navigate(['application']);
      }
    });
  }
}
