
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogModel } from '@shared/components/models/dialog.model';
import { HelperService } from '@shared/services/helper.service';
import { ContactService } from 'app/contact/services/contact.service';
import { Attendant } from 'app/models/response.model';
import { QrTokenDialogComponent } from 'app/qr-confirmation/dialogs/qr-token-dialog/qr-token-dialog.component';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-qr-confirmation',
  templateUrl: './qr-confirmation.component.html',
  styleUrls: ['./qr-confirmation.component.scss']
})
export class QrConfirmationComponent implements OnInit {
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

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _attendant: ContactService,
    private _helper: HelperService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.clientId = this.route.snapshot.paramMap.get('id');
    this.openDialog({isEditing: false, editObject: this.clientId});
  }

  public openDialog(
    payload: { isEditing?: boolean; editObject?: string } | any
  ): void {
    let object: DialogModel<any> = payload;
    const dialogRef = this.dialog.open(QrTokenDialogComponent, {
      data: object,
      panelClass: 'modal-width'
    });
    dialogRef.componentInstance.event.subscribe(
      (event: DialogModel<any>) => {
        if (event) {
          this.getOneAttendant()
        }
      }
    );
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
        }, error: (e: any) => {
          this._helper.stopSpinner();
          console.log(e);
        }
    });
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
