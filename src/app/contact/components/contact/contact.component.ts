import { Currencies } from './../../../shared/jsons/currencies';
import { Toastr } from '@GlobalService/toastr.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from 'app/contact/services/contact.service';
import { Attendant, ResponseModel, Speaker } from 'app/models/response.model';
import { Subscription } from 'rxjs';
import { Country } from '@shared/jsons/country-code';
import { HelperService } from '@shared/services/helper.service';
import { SpeakersService } from 'app/speakers/services/speaker.service';
import { SponsorPackages } from '@shared/jsons/sponsor';
import { DialogModel } from '@shared/components/models/dialog.model';
import { MatDialog } from '@angular/material/dialog';
import { AddSponsorDialogComponent } from 'app/sponsors/dialogs/add-sponsor-dialog/add-sponsor-dialog.component';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  @ViewChild('registration') public registration!: ElementRef;
  @ViewChild('inputFile') public inputFile!: ElementRef;
  public sub: Subscription = new Subscription();
  public registrationForm!: FormGroup;
  public isLoading!: boolean;
  public regFormSubmitted!: boolean;
  public responsiveOptions: any[] | undefined;
  public ipAddress: string = '102.88.71.189';
  public training: any;
  public trainingFee: any;
  public trainingMode: any;
  public speakers: Speaker[] = [];
  public images: {path: string }[] = [
    {path: 'https://pix8.agoda.net/hotelImages/12375842/-1/1e25acc4c5fda917d4159ac1717e315f.jpg?ca=10&ce=1&s=1024x'},
    {path: 'https://pix8.agoda.net/hotelImages/12375842/-1/fe5f7006ad55b5faf0aca836872df500.jpg?ca=10&ce=1&s=1024x'},
    {path: 'https://pix8.agoda.net/hotelImages/12375842/-1/2bc0a08b633da8841d4bdddbb88e020b.jpg?ca=10&ce=1&s=1024x'},
    {path: 'https://pix8.agoda.net/hotelImages/12375842/-1/1f526c4b06cb4b5cfeabf8dfb2283164.jpg?ca=10&ce=1&s=1024x'},
    {path: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS04J60XDu2UjgzT2vnjrQWxjitlQNy7aeF2g&s'},
  ];
  public countries = Country;
  public currencies = Currencies;
  public currency: string = '₦';
  public currencyCode: string = 'NGN';
  public amountToPay: number = 0;
  public attendant!: Attendant;
  public documentUrl: any;
  public file!: File;
  public packages = SponsorPackages;
  public payments = [
    {
      countryname: 'Nigeria',
      fee: [
        {id: 1, type: 'Member', amount: 130000},
        {id: 2, type: 'Student', amount: 120000},
        {id: 3, type: 'Others', amount: 150000},
      ]
    },
    {
      countryname: 'Ghana',
      fee: [
        {id: 1, type: 'Member', amount: 1000},
        {id: 2, type: 'Student', amount: 800},
        {id: 3, type: 'Others', amount: 1100},
      ]
    },
    {
      countryname: 'Others',
      Fee: [
        {id: 1, type: 'Member', amount: 175},
        {id: 2, type: 'Student', amount: 150},
        {id: 3, type: 'Others', amount: 200},
      ]
    },
  ];
  public profMemberships: string[] = [
    'ALHRP', 'ANPGRH', 'CIHRM', 'CIPM', 'HRMAU', 'IPM', 'IPMZ', 'MAHRM', 'PNGHRI', 'SHRM',
  ];
  public telOptions = {initialCountry: 'ng', preferredCountries: ['ng', 'gh']};
  public hasError!: boolean;

  constructor(
    private fb: FormBuilder,
    private _attendant: ContactService,
    private _toastr: Toastr,
    private _helper: HelperService,
    private _speaker: SpeakersService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getTrainingDetail();
    this.getSpeakers();
    this.initForm();
    this.responsiveOptions = [
      {
          breakpoint: '1199px',
          numVisible: 1,
          numScroll: 1
      },
      {
          breakpoint: '991px',
          numVisible: 2,
          numScroll: 1
      },
      {
          breakpoint: '767px',
          numVisible: 1,
          numScroll: 1
      }
    ];
  }

  public getTrainingDetail() {
    this.isLoading = true;
    this._helper.startSpinner();
    const payload = {
      ip: this.ipAddress,
      friendly_name: 'THEBF',
      trainingId: 145
    }
    this.sub.add(
      this._attendant
        .getTrainingById(payload)
        .subscribe(
          (res: any) => {
            console.log(res);
            this.isLoading = false;
            this._helper.stopSpinner();
            this.training = res.trainings[0];
            this.trainingFee = this.training?.streams[0]?.trainingfee;
          },
          (error) => {
            this.isLoading = false;
            this._helper.stopSpinner();
            console.log(error);
          }
        )
    );
  }

  public getSpeakers() {
    this.isLoading = true;
    this._helper.startSpinner();
    this.sub.add(
      this._speaker
        .getAllSpeakers()
        .subscribe(
          (res: ResponseModel<Speaker[]>) => {
            // console.log(res);
            this.isLoading = false;
            this._helper.stopSpinner();
            this.speakers = res["response"];
          },
          (error) => {
            this.isLoading = false;
            this._helper.stopSpinner();
            console.log(error);
          }
        )
    );
  }

  public moveToStructure():void {
    this.registration.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'start' });
  }

  public initForm() {
    this.registrationForm = this.fb.group({
      name: ["", Validators.required],
      company: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      phone: ["", Validators.required],
      position: ["", Validators.required],
      sex: ["", Validators.required],
      trainingMode: ["classroom", Validators.required],
      trainingid: [145, Validators.required],
      signup_date: [new Date(), Validators.required],
      isFree: [false, Validators.required]
    })
  }

  public openDialog(
    payload: { isEditing?: boolean; editObject?: Speaker } | any
  ): void {
    let object: DialogModel<Speaker> = payload;
    const dialogRef = this.dialog.open(AddSponsorDialogComponent, {
      data: object
    });
    // console.log(payload)
    dialogRef.componentInstance.event.subscribe(
      (event: DialogModel<Speaker>) => {
        console.log(event)
      }
    );
  }

  numericOnly(event: any) {
    let patt = /^([0-9])$/;
    let result = patt.test(event.key);
    return result;
  }

  onError(obj: any) {
    this.hasError = obj;
    // console.log('hasError: ', obj);
}

  public telInputObject(obj: any) {

  }

  public onCountryChange(country: any) {
    this.registrationForm.patchValue({
      phoneNumber: '+' + country.dialCode
    })
  }

  public submit() {
    this.regFormSubmitted = true;
    const payload: any = this.registrationForm.value;
    payload.ip = this.ipAddress;
    if(this.registrationForm.valid) {
      this.isLoading = true;
      this.sub.add(
        this._attendant.registerEvent(payload).subscribe({
          next: (res: any) => {
            // console.log(res);
            this.isLoading = false;
            this.regFormSubmitted = false;
            if(res?.status?.isSuccessful) {
              this._toastr.showSuccess(
                'You have successfully register for the training',
                'Success'
              );
              this.registrationForm.reset();
            } else {
              this._toastr.showError(
                'Error occured',
                'Failed'
              );
            }
            
          },
          error: (error: HttpErrorResponse) => {
            // console.log(error);
            this.isLoading = false;
            this.regFormSubmitted = false;
            this._toastr.showError(
              'Error occured',
              'Failed'
            );
          },
        })
      );
    }
  }

}
