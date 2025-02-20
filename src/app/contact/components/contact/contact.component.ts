import { Currencies } from './../../../shared/jsons/currencies';
import { Toastr } from '@GlobalService/toastr.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from 'app/contact/services/contact.service';
import { Attendant, ResponseModel, Speaker } from 'app/models/response.model';
import { Subscription } from 'rxjs';
import { Country } from '@shared/jsons/country-code';
import { Router } from '@angular/router';
// import { speakers } from '@shared/jsons/speakers';
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
  public speakers: Speaker[] = [];
  public images: {path: string }[] = [
    {path: 'assets/images/gallery1.jpeg'},
    {path: 'assets/images/gallery2.jpeg'},
    {path: 'assets/images/gallery3.jpeg'},
    {path: 'assets/images/gallery4.jpeg'},
    {path: 'assets/images/gallery5.jpeg'},
    {path: 'assets/images/gallery6.jpeg'},
    {path: 'assets/images/gallery7.jpeg'},
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
    private router: Router,
    private _helper: HelperService,
    private _speaker: SpeakersService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
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
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['+234', Validators.required],
      organization: ['', Validators.required],
      position: [''],
      registrationNo: [''],
      country: ['', Validators.required],
      registrationType: ['Single', Validators.required],
      applicantType: ['', Validators.required],
      noOfRegistrants: [1, Validators.required],
      modeOfAttendance: ['Physical', Validators.required],
      profMembership: [''],
      requireAccomodation: [false, Validators.required],
      noOfAccomodants: [0, Validators.required],
      comment: [''],
      hasPaid: [false],
      amountToPay: [0],
      currency: [''],
    })
  }

  public getCurrencyCode() {
    let country = this.registrationForm.get('country')!.value;
    let applicantype = this.registrationForm.get('applicantType')!.value;
    switch (country) {
      case 'Nigeria':
        this.currency = '₦';
        this.currencyCode = 'NGN';
        break;
      case 'Ghana':
        this.currency = 'GH₵';
        this.currencyCode = 'GHS';
        break;
      default:
        this.currency = '$';
        this.currencyCode = 'USD';
        break;
    }
    if(applicantype) {
      this.validateApplicanttype();
    }
    return this.currency;
  }



  public validateRegType() {
    if(this.registrationForm.get('registrationType')!.value === 'Single') {
      this.registrationForm.patchValue({
        noOfRegistrants: 1
      })
    };
    this.updatePaymentAmount();
  }

  public validateAccomodation() {
    if (!this.registrationForm.get('requireAccomodation')!.value ) {
      this.registrationForm.patchValue({
        noOfAccomodants: 0
      })
    }
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

  public validateApplicanttype() {
    const applicantType = this.registrationForm.get('applicantType')!.value;
    const noOfRegistrants = this.registrationForm.get('noOfRegistrants')!.value;
    const country = this.registrationForm.get('country')!.value;
    if(country) {
      if ( country === 'Nigeria' && applicantType === "Member") {
        this.registrationForm.patchValue({
          currency: 'NGN',
          amountToPay: 130000 * noOfRegistrants
        })
      } else if ( country === 'Nigeria' && applicantType === "Student") {
        this.registrationForm.patchValue({
          currency: 'NGN',
          amountToPay: 120000 * noOfRegistrants
        })
      } else if ( country === 'Nigeria' && applicantType === "Others") {
        this.registrationForm.patchValue({
          currency: 'NGN',
          amountToPay: 150000 * noOfRegistrants
        })
      } else if ( country === 'Ghana' && applicantType === "Member") {
        this.registrationForm.patchValue({
          currency: 'GHS',
          amountToPay: 1000 * noOfRegistrants
        })
      } else if ( country === 'Ghana' && applicantType === "Student") {
        this.registrationForm.patchValue({
          currency: 'GHS',
          amountToPay: 800 * noOfRegistrants
        })
      } else if ( country === 'Ghana' && applicantType === "Others") {
        this.registrationForm.patchValue({
          currency: 'GHS',
          amountToPay: 1100 * noOfRegistrants
        })
      } else if ( (country !== 'Nigeria' || country !== 'Ghana') && applicantType === "Member") {
        this.registrationForm.patchValue({
          currency: 'USD',
          amountToPay: 175 * noOfRegistrants
        })
      } else if ( (country !== 'Nigeria' || country !== 'Ghana') && applicantType === "Student") {
        this.registrationForm.patchValue({
          currency: 'USD',
          amountToPay: 150 * noOfRegistrants
        })
      } else {
        this.registrationForm.patchValue({
          currency: 'USD',
          amountToPay: 200 * noOfRegistrants
        })
      }
    };
    this.amountToPay = this.registrationForm.get('amountToPay')!.value;
  }

  public updatePaymentAmount() {
    const noOfRegistrants = this.registrationForm.get('noOfRegistrants')!.value;
    const newAmountToPay = this.amountToPay * noOfRegistrants;
    this.registrationForm.patchValue({
      amountToPay: newAmountToPay
    })
  }

  public onFileDropped(event: any) {
    // console.log(event)
    let me = this;
    this.file = event.target.files[0];
    const maxAllowedSize = 500000;
    if(this.file.size > maxAllowedSize) {
      // this.inputFile.nativeElement.value = null;
      this._toastr.showError(
        'kindly upload a file not more than 5MB',
        'info'
      );
    } else {
      let reader = new FileReader();
      reader.readAsDataURL(this.file);
      reader.onload = () =>{
        me.documentUrl = reader.result;
      };
      reader.onerror = (error) => {
        console.log('Error: ', error);
      };
    }

  }

  public removeFile(): void {
    this.inputFile.nativeElement.value = null;
    this.file = null as any;
  }

  public submit() {
    this.regFormSubmitted = true;
    const payload: Attendant = this.registrationForm.value;
    if(!this.file) {
      return this._toastr.showInfo(
        'You are required to upload a passport photograph not more than 2mb',
        'Passport image'
      );
    }
    if(this.file) {
      const fileUrl = this.documentUrl.split(",");
      payload.fileUrl = fileUrl[1];
    }
    if(this.registrationForm.valid) {
      this.isLoading = true;
      this.sub.add(
        this._attendant.createAttendant(payload).subscribe({
          next: (res: ResponseModel<Attendant>) => {
            // console.log(res);
            this.inputFile.nativeElement.value = null;
            this.attendant = res.response;
            this.isLoading = false;
            this.regFormSubmitted = false;
            this._toastr.showSuccess(
              res.message,
              'Success'
            );
            this.registrationForm.reset();
            this.router.navigate(['/payment', res.response._id], {
              queryParams: {
                amount: payload.amountToPay,
                currency: payload.currency,
                bulk: payload.noOfRegistrants,
                type: payload.applicantType
              }
            });
          },
          error: (error: HttpErrorResponse) => {
            // console.log(error);
            this.isLoading = false;
            this.regFormSubmitted = false;
            this._toastr.showError(
              error.error?.message,
              'Failed'
            );
          },
        })
      );
    }
  }

}
