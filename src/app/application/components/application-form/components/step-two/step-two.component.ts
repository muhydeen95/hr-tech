import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from '@shared/services/local-storage.service';
import {
  lCApplicationDTO,
  INITIAL_FORM_DATA,
} from '../../models/lc-application.model';
import { ApplicationStepRoute } from '../../models/step.model';
import { CurrentStepService } from '../../services/current-step.service';

@Component({
  selector: 'app-step-two',
  templateUrl: './step-two.component.html',
  styleUrls: ['./step-two.component.scss'],
})
export class StepTwoComponent implements OnInit {
  public stepTwoForm!: FormGroup;
  public isLoading: boolean = false;
  public stepTwoFormSubmitted: boolean = false;
  public applicationForm: lCApplicationDTO = INITIAL_FORM_DATA;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private _step: CurrentStepService,
    private _localStorageAS: LocalStorageService
  ) {
    this._localStorageAS.watch('lc_application_form').subscribe((res) => {
      if (res) {
        this.applicationForm = JSON.parse(res);
      }
    });
  }

  ngOnInit(): void {
    window.scroll(0, 0);
    this.initStepTwoForm();
  }
  public initStepTwoForm(): void {
    this.stepTwoForm = this.fb.group({
      itemsOfImport: [
        this.applicationForm.itemsOfImport ?? '',
        Validators.required,
      ],
      valueInFigures: [
        this.applicationForm.valueInFigures ?? '',
        Validators.required,
      ],
      valueInWords: [
        this.applicationForm.valueInWords ?? '',
        Validators.required,
      ],
      proformaInvoiceNumber: [
        this.applicationForm.proformaInvoiceNumber ?? '',
        Validators.required,
      ],
      proformaInvoiceDate: [
        this.applicationForm.proformaInvoiceDate ?? '',
        Validators.required,
      ],
      mFNumber: [this.applicationForm.mFNumber ?? '', Validators.required],
      bANumber: [this.applicationForm.bANumber ?? '', Validators.required],
      validUntil: [this.applicationForm.validUntil ?? '', Validators.required],
      latestShipment: [
        this.applicationForm.latestShipment ?? '',
        Validators.required,
      ],
      expiryDate: [this.applicationForm.expiryDate ?? '', Validators.required],
    });
  }
  public back(): void {
    this.router.navigate([ApplicationStepRoute.step_one]);
  }
  public continue(): void {
    this.stepTwoFormSubmitted = true;
    if (this.stepTwoForm.valid) {
      this.isLoading = true;
      const stepTwoPayload = this.stepTwoForm.value;
      // stepTwoPayload.latestShipment = this._util.covertDateToIsoString(
      //   stepTwoPayload.latestShipment
      // );
      // stepTwoPayload.validUntil = this._util.covertDateToIsoString(
      //   stepTwoPayload.validUntil
      // );
      // stepTwoPayload.expiryDate = this._util.covertDateToIsoString(
      //   stepTwoPayload.expiryDate
      // );
      // stepTwoPayload.proformaInvoiceDate = this._util.covertDateToIsoString(
      //   stepTwoPayload.proformaInvoiceDate
      // );
      const payload = { ...this.applicationForm, ...stepTwoPayload };
      this._step.storeCurrentStepData(payload);
      this.router.navigate([ApplicationStepRoute.step_three]);
    }
  }
}
