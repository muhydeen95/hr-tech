import { QrConfirmationService } from './../../services/qr-confirmation.service';
import { DialogModel } from '@shared/components/models/dialog.model';
import { HttpErrorResponse } from '@angular/common/http';
import {
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Toastr } from '@GlobalService/toastr.service';

@Component({
  selector: 'app-qr-token-dialog',
  templateUrl: './qr-token-dialog.component.html',
  styleUrls: ['./qr-token-dialog.component.scss']
})
export class QrTokenDialogComponent implements OnInit {
  public sub: Subscription = new Subscription();
  @ViewChild('close') close!: ElementRef;
  public tokenForm!: FormGroup;
  public isLoading: boolean = false;
  public tokenFormSubmitted: boolean = false;
  public error_message: string = '';


  @Output() event: EventEmitter<{
    editObject?: string;
    isEditing: boolean;
  }> = new EventEmitter<{ editObject?: string; isEditing: boolean }>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogModel<string>,
    private fb: FormBuilder,
    public dialog: MatDialog,
    public _toastr: Toastr,
    private _qrConfimation: QrConfirmationService,
  ) {}

  ngOnInit(): void {
    this.inittokenForm();
  }

  inittokenForm() {
    this.tokenForm = this.fb.group({
      token: ['', [Validators.required]],
      id: [this.data.editObject, Validators.required]
    });

  }


  public checkForKeyEnter(event: KeyboardEvent): void {
    var key = event.key || event.keyCode;
    if (key == 'Enter' || key == 8) {
      this.submit();
    }
  }

  public submit(): void {
    if (this.tokenForm.valid) {
      this.isLoading = true;
      const payload = this.tokenForm.value;
      this._qrConfimation.confirmUserCode(payload).subscribe({
        next: (res: any) => {
          this.isLoading = false;
            // console.log(res)
            this.event.emit({
              isEditing: true,
              editObject: res.response,
            });
            this.tokenFormSubmitted = false;
            this.close.nativeElement.click();
            this._toastr.showSuccess(
              res.message,
              'success'
            );
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
          this.isLoading = false;
          this.tokenFormSubmitted = false;
          this.error_message = error?.error?.message;
          this._toastr.showError(
            error?.error?.message,
            'error'
          );
        },
      });
    }

  }
}

