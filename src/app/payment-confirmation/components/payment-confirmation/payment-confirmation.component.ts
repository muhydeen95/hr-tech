
import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Toastr } from '@GlobalService/toastr.service';
import { HelperService } from '@shared/services/helper.service';
import { AttendantsService } from 'app/admin/services/attendants.service';
import { ContactService } from 'app/contact/services/contact.service';
import { Attendant, ResponseModel } from 'app/models/response.model';

declare var require: any;

import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import { Subscription } from 'rxjs';
const htmlToPdfmake = require("html-to-pdfmake");
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

const css = `<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css"
integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4" crossorigin="anonymous">
<style>
@font-face {
  font-family: psBold;
  src: url('https://res.cloudinary.com/cctlf-org/raw/upload/v1625699242/ProductSans-Bold_bkj1qc.ttf');
}
@font-face {
  font-family: psMedium;
  src: url('https://res.cloudinary.com/cctlf-org/raw/upload/v1625699243/ProductSans-Medium_so2ifg.ttf');
}
@font-face {
  font-family: psLight;
  src: url('https://res.cloudinary.com/cctlf-org/raw/upload/v1625957116/ProductSans-Light_vnyikn.ttf');
}
.card-wrapper {
  width: 300px;
  max-width: 100%;
  border-radius: 10px;
  text-align: center;
  background: #fff;
  height: 469px;
  margin: auto;
}
.nerc-logo{
width: 50px;
}
.bg-grey{
  background:#f0f3f5 !important;
}
.qrcode-wrapper{
  width: 170px;
  height: 170px;
  margin: auto;
}
  .card {
    box-sizing: border-box;
    box-shadow: 0px 2px 5px rgba(153, 153, 153, 0.25);
    border-radius: 30px;
  }

  .card-top {
    border-radius: 30px;
  }

  .profile-name {
    font-size: 1.2em;
    font-weight: bold;
  }

  .exam-no {
    font-size: 0.4em;
  }

  .profile-img {
    width: 100px;
    height: 100px;
    object-fit: cover;
    margin: auto;
  }

  .regNo {
    padding-top: 3rem;
  }

  .footer p {
    font-size: 0.8em;
  }

  .footer span {
    font-size: 0.5em;
  }
</style>
`;

@Component({
  selector: 'app-payment-confirmation',
  templateUrl: './payment-confirmation.component.html',
  styleUrls: ['./payment-confirmation.component.scss']
})
export class PaymentConfirmationComponent implements OnInit {
  @ViewChild('registration') public registration!: ElementRef;
  @ViewChild('pdfTable') pdfTable!: ElementRef;
  public sub: Subscription = new Subscription();
  public paymentStatus: boolean = false;
  public status!: string;
  public clientId!: string | null;
  public isLoading!: boolean;
  public currentYear = new Date().getFullYear();
  public attendant: Attendant = {
    _id: '',
    fullName: '',
    email: '',
    phoneNumber: '',
    organization: '',
    position: '',
    country: '',
    applicantType: '',
    registrationType: '',
    noOfRegistrants: '',
    modeOfAttendance: '',
    profMembership: '',
    requireAccomodation: false,
    noOfAccomodants: 0,
    comment: '',
    fileUrl: '',
    hasPaid: false,
    amountToPay: 0,
    currency: '',
    registrationNo: '',
    createdAt: '',
  };
  public qrData!: string;
  public card!: boolean;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _attendant: ContactService,
    private _toastr: Toastr,
    private _helper: HelperService,
    private _admin: AttendantsService
  ) { }

  ngOnInit(): void {
    this.clientId = this.route.snapshot.paramMap.get('id');
    this.route.queryParams.subscribe(params => {
      this.status = params['status'];
      this.card = params['card'] === 'true' ? true : false;
    });
    (this.card) ?
      this.getOneAttendant()
      : this.confirmPayment();
  }

  public confirmPayment() {
    this.isLoading = true;
    this._helper.startSpinner();
    const payload = {
      id: this.clientId,
      hasPaid: true,
    }
    this._attendant.confirmPayment(payload).subscribe({
        next: (res: any) => {
            // console.log(res);
            this.isLoading = false;
            this._helper.stopSpinner();
            this._toastr.showSuccess(
              res?.message,
              'Success'
            );
            this.getOneAttendant();
          }, error: (e: any) => {
            this.isLoading = false;
            this._helper.stopSpinner();
              console.log(e);
              this._toastr.showError(
                e.error?.message,
                'Failed'
              );
          }
    });
  }

  public getOneAttendant() {
    this._helper.startSpinner();
    this._attendant.getOneAttendant(this.clientId).subscribe({
      next: (res: any) => {
          // console.log(res);
          this._helper.stopSpinner();
          if(res.response) {
            this.attendant = res.response;
            this.qrData = `Name: ${this.attendant.fullName} Email:${this.attendant.email} RegistrationNo: ${this.attendant.registrationNo}`;
          };
          this.sendprofileCard(this.clientId);
        }, error: (e: any) => {
          this._helper.stopSpinner();
          console.log(e);
        }
    });
  }

  public sendprofileCard(id: any) {
    this.sub.add(
      this._admin.sendprofileCard(id).subscribe({
        next: (res: ResponseModel<any>) => {
          // console.log(res);
          // this._toastr.showSuccess(
          //   res.message,
          //   'Success'
          // );
        },
        error: (error: HttpErrorResponse) => {
          // console.log(error);
          this._toastr.showError(
            error.error?.message,
            'Failed'
          );
        },
      })
    );
  }

  public padWithLeadingZeros(num: any) {
    return String(num).padStart(4, '0');
  }

  public downloadAsPDF() {
    const pdfTable = this.pdfTable.nativeElement;
    var html = htmlToPdfmake(pdfTable.innerHTML);
    const documentDefinition = { content: html };
    pdfMake.createPdf(documentDefinition).download();

  }

  public printCard() {
    const printContents =
    document.querySelector(".exam-card-wrapper")!.innerHTML;
    const pageContent = `<!DOCTYPE html><html><head>${css}</head><body onload="window.print()">${printContents}</html>`;
    let popupWindow: Window | null;
    if (navigator.userAgent.toLowerCase().indexOf("chrome") > -1) {
      popupWindow = window.open(
        "",
        "_blank",
        "width=600,height=600,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no"
      );
      popupWindow!.window.focus();
      popupWindow!.document.write(pageContent);
      popupWindow!.document.close();
      popupWindow!.onbeforeunload = (event) => {
        popupWindow!.close();
      };
      popupWindow!.onabort = (event) => {
        popupWindow!.document.close();
        popupWindow!.close();
      };
    } else {
      popupWindow = window.open("", "_blank", "width=600,height=600");
      popupWindow!.document.open();
      popupWindow!.document.write(pageContent);
      popupWindow!.document.close();
    }
  }

  public goHome() {
    this.router.navigate(['/']);
    localStorage.removeItem('paymentUrl')
  }

  public tryAgain() {
    // const url = localStorage.getItem('paymentUrl');
    window.location.href;
  }

}
