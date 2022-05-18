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
  selector: 'app-step-three',
  templateUrl: './step-three.component.html',
  styleUrls: ['./step-three.component.scss'],
})
export class StepThreeComponent implements OnInit {
  // public presentations: string[] = [
  //   '2 Original Combined Certificate of Value and Origin (CCVO on form C16 and 3 copies)',
  //   '3 Original commercial invoice and 2 copies',
  //   '2 Original parking list and 3 copies',
  //   '2 Original manufacturers certificate of production stating standards adopted',
  //   '1 original laboratory test certificate',
  //   'Certificate issued by the beneficiary stating that one set of documents has been forwarded to Fidelity Bank by courier not later than 21 days after shipment',
  //   '2/3 original (clean/shipped on board) ocean bill of lading and 3 copies (Non-negotiabe) issued to the order and marked freight prepaid endorse to Fidelitybank PLC.',
  // ];
  public stepThreeForm!: FormGroup;
  public isLoading: boolean = false;
  public stepThreeFormSubmitted: boolean = false;
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
    this.initStepThreeForm();
  }
  public initStepThreeForm(): void {
    this.stepThreeForm = this.fb.group({
      hasCCVO: [this.applicationForm.hasCCVO ?? null, Validators.required],
      hasCommercialInvoice: [
        this.applicationForm.hasCommercialInvoice ?? null,
        Validators.required,
      ],
      hasParkingList: [
        this.applicationForm.hasParkingList ?? null,
        Validators.required,
      ],
      hasManufacturerCertificateOfProduction: [
        this.applicationForm.hasManufacturerCertificateOfProduction ?? null,
        Validators.required,
      ],
      laboratoryTestCertificate: [
        this.applicationForm.laboratoryTestCertificate ?? null,
        Validators.required,
      ],
      beneficiaryIssuedCertificate: [
        this.applicationForm.beneficiaryIssuedCertificate ?? null,
        Validators.required,
      ],
      oceanBillOfLanding: [
        this.applicationForm.oceanBillOfLanding ?? null,
        Validators.required,
      ],
      airwayBillConsigned: [
        this.applicationForm.airwayBillConsigned ?? '',
        Validators.required,
      ],
      otherDetails: [
        this.applicationForm.otherDetails ?? '',
        Validators.required,
      ],
    });
  }
  public back(): void {
    this.router.navigate([ApplicationStepRoute.step_two]);
  }
  public continue(): void {
    this.stepThreeFormSubmitted = true;
    if (this.stepThreeForm.valid) {
      this.isLoading = true;
      const stepThreePayload = this.stepThreeForm.value;
      const payload = { ...this.applicationForm, ...stepThreePayload };
      this._step.storeCurrentStepData(payload);
      this.router.navigate([ApplicationStepRoute.step_four]);
    }
  }
}
