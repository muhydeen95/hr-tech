import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LocalStorageService } from '@shared/services/local-storage.service';
import { TermsComponent } from '../../dialogs/terms/terms.component';
import {
  lCApplicationDTO,
  INITIAL_FORM_DATA,
  ShipmentStatusEnum,
  BankChargesEnum,
} from '../../models/lc-application.model';
import { ApplicationStepRoute } from '../../models/step.model';
import { CurrentStepService } from '../../services/current-step.service';

@Component({
  selector: 'app-step-four',
  templateUrl: './step-four.component.html',
  styleUrls: ['./step-four.component.scss'],
})
export class StepFourComponent implements OnInit {
  public stepFourForm!: FormGroup;
  public isLoading: boolean = false;
  public stepFourFormSubmitted: boolean = false;
  public applicationForm: lCApplicationDTO = INITIAL_FORM_DATA;
  public shipmentStatusEnum = ShipmentStatusEnum;
  public bankChargesEnum = BankChargesEnum;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private dialog: MatDialog,
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
    this.initStepFourForm();
  }
  public initStepFourForm(): void {
    this.stepFourForm = this.fb.group({
      dispatchFrom: [
        this.applicationForm.dispatchFrom ?? '',
        Validators.required,
      ],
      dispatchTo: [this.applicationForm.dispatchTo ?? '', Validators.required],
      partialShipment: [
        this.applicationForm.partialShipment ?? 1,
        Validators.required,
      ],
      transShipment: [
        this.applicationForm.transShipment ?? 1,
        Validators.required,
      ],
      overseesBankCharges: [
        this.applicationForm.overseesBankCharges ?? 1,
        Validators.required,
      ],
    });
  }
  public back(): void {
    this.router.navigate([ApplicationStepRoute.step_three]);
  }

  public openTermsDialog(): void {
    const dialogRef = this.dialog.open(TermsComponent);
    dialogRef.componentInstance.event.subscribe((event: boolean) => {
      if (event) {
        this.router.navigate([ApplicationStepRoute.final]);
      }
    });
  }

  public continue(): void {
    this.stepFourFormSubmitted = true;
    if (this.stepFourForm.valid) {
      this.isLoading = true;
      const stepFourPayload = this.stepFourForm.value;
      const payload = { ...this.applicationForm, ...stepFourPayload };
      this._step.storeCurrentStepData(payload);
      this.openTermsDialog();
    }
  }
}
