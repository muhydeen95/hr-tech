import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from '@shared/services/local-storage.service';
import {
  INITIAL_FORM_DATA,
  lCApplicationDTO,
  LC_Type,
} from '../../models/lc-application.model';
import { ApplicationStepRoute } from '../../models/step.model';
import { CurrentStepService } from '../../services/current-step.service';

@Component({
  selector: 'app-step-one',
  templateUrl: './step-one.component.html',
  styleUrls: ['./step-one.component.scss'],
})
export class StepOneComponent implements OnInit {
  public stepOneForm!: FormGroup;
  public types: { id: number; type: string }[] = LC_Type;
  public isFetchingTypes: boolean = false;
  public isFetchingTypesFailed: boolean = false;
  public isLoading: boolean = false;
  public isFetchingUssances: boolean = false;
  public isFetchingUssancesFailed: boolean = false;
  public stepOneFormSubmitted: boolean = false;
  public applicationForm: lCApplicationDTO = INITIAL_FORM_DATA;
  constructor(
    private _location: Location,
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
    this.initStepOneForm();
  }

  public initStepOneForm(): void {
    this.stepOneForm = this.fb.group({
      lCApplicationDate: [
        (this.applicationForm.lCApplicationDate = this.setDateValue(
          new Date()
        )),
        Validators.required,
      ],
      applicantName: [
        this.applicationForm.applicantName ?? '',
        Validators.required,
      ],
      applicantAddress: [
        this.applicationForm.applicantAddress ?? '',
        Validators.required,
      ],
      beneficiaryName: [
        this.applicationForm.beneficiaryName ?? '',
        Validators.required,
      ],
      beneficiaryPhoneNumber: [
        this.applicationForm.beneficiaryPhoneNumber ?? '',
        [
          Validators.required,
          Validators.pattern('^0(((8)(0|1))|((7)(0))|((9)(0)))\\d{8}$'),
        ],
        ,
      ],
      beneficiaryAddress: [
        this.applicationForm.beneficiaryAddress ?? '',
        Validators.required,
      ],
      type: [this.applicationForm.type ?? null, Validators.required],
      ussance: [this.applicationForm.ussance ?? null, Validators.required],
      cFR: [this.applicationForm.cFR ?? '', Validators.required],
      sight: [this.applicationForm.sight ?? null, Validators.required],
      location: [this.applicationForm.location ?? '', Validators.required],
    });
  }

  setDateValue(date: Date): string {
    var newDate = (date).getTimezoneOffset() * 60000; 
    var isoString = (new Date(Date.now() - newDate)).toISOString().slice(0,-1);
    return isoString.substring(0, ((isoString.indexOf('T') | 0) + 6) | 0);
  }
  public back(): void {
    this._location.back();
  }

  public continue(): void {
    this.stepOneFormSubmitted = true;
    if (this.stepOneForm.valid) {
      this.isLoading = true;
      const stepOnePayload = this.stepOneForm.value;

      const payload = { ...this.applicationForm, ...stepOnePayload };
      this._step.storeCurrentStepData(payload);
      this.router.navigate([ApplicationStepRoute.step_two]);
    }
  }
}
