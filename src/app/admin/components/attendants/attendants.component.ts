import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
} from "@angular/core";
import { Subscription } from "rxjs";
import { Attendant, ResponseModel } from "app/models/response.model";
import { AttendantsService } from "app/admin/services/attendants.service";
import { HelperService } from "@shared/services/helper.service";
import { HttpErrorResponse } from "@angular/common/http";
import { Toastr } from "@GlobalService/toastr.service";
// import { isNullOrUndefined } from "util";

@Component({
  selector: 'app-attendants',
  templateUrl: './attendants.component.html',
  styleUrls: ['./attendants.component.scss']
})

export class AttendantsComponent implements OnInit, OnDestroy {
  @ViewChild('profileCard') profileCard!: ElementRef;
  public sub: Subscription = new Subscription();
  public attendants: Attendant[] = [];
  public selectedAttendants: Attendant[] = [];
  public selectedIds: string[] = [];
  public attendantDetail: Attendant = {
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
  };;
  public isInitial: boolean = false;
  public isLoading: boolean = false;
  public isExporting: boolean = false;
  public cols: {header: string, field: string}[] = [];
  public hasPaid!: boolean;
  public statusOption: {name: string, value: any}[] = [
    {name: 'All', value: null}, {name: 'Paid', value: true}, {name:'Not Paid', value: false}
  ];
  public sendReminder: boolean = false;
  public sendProfileCard: boolean = false;


  constructor(
    private _attendant: AttendantsService,
    private _helper: HelperService,
    private _toastr: Toastr
  ) {}

  ngOnInit() {
    this.loadCandidates();
    this.cols = [
      {
        header: "fullName",
        field: "fullName",
      },
      {
        header: "registrationNo",
        field: "registrationNo",
      },
      {
        header: "email",
        field: "email",
      },
      {
        header: "phoneNumber",
        field: "phoneNumber",
      },
      {
        header: "organization",
        field: "organization",
      },
      {
        header: "position",
        field: "position",
      },
      {
        header: "country",
        field: "country",
      },
      {
        header: "registrationType",
        field: "registrationType",
      },
      {
        header: "applicantType",
        field: "applicantType",
      },
      {
        header: "noOfRegistrants",
        field: "noOfRegistrants",
      },
      {
        header: "modeOfAttendance",
        field: "modeOfAttendance",
      },
      {
        header: "profMembership",
        field: "profMembership",
      },
      {
        header: "requireAccomodation",
        field: "requireAccomodation",
      },
      {
        header: "noOfAccomodants",
        field: "noOfAccomodants",
      },
      {
        header: "hasPaid",
        field: "hasPaid",
      },
    ];
  }


  public loadCandidates() {
    this.isLoading = true;
    this._helper.startSpinner();
    this.sub.add(
      this._attendant
        .getAllAttendants()
        .subscribe(
          (res: ResponseModel<Attendant[]>) => {
            // console.log(res);
            this.isLoading = false;
            this.isInitial = true;
            this._helper.stopSpinner();
            this.attendants = res["response"];
          },
          (error) => {
            this.isLoading = false;
            this._helper.stopSpinner();
            console.log(error);
          }
        )
    );
  }

  public filterByStatus(status: any) {
    (status === null) ? this.loadCandidates() : this.getUserWithStatus(status);
  }

  public getUserWithStatus(status: boolean) {
    this.isLoading = true;
    this._helper.startSpinner();
    this.sub.add(
      this._attendant
        .getAttendantWithPaymentStatus(status)
        .subscribe(
          (res: ResponseModel<Attendant[]>) => {
            // console.log(res);
            this.isLoading = false;
            this.isInitial = false;
            this._helper.stopSpinner();
            this.attendants = res["response"];
          },
          (error) => {
            this.isLoading = false;
            this._helper.stopSpinner();
            console.log(error);
          }
        )
    );
  }

  public exportAttendants() {
    this.isExporting = true;
    this.sub.add(
      this._attendant
        .exportAllAttendants()
        .subscribe(
          (res: any) => {
            console.log(res);
            this.isExporting = false;
            const blob = new Blob([res.response], { type: 'text/csv' });
            const url= window.URL.createObjectURL(blob);
            window.open(url);
          },
          (error) => {
            this.isExporting = false;
          }
        )
    );
  }

  showStudentDetails(attendant: Attendant) {
    this.profileCard.nativeElement.classList.add("active");
    this.attendantDetail = attendant;
  }

  removeStudentDetails() {
    this.profileCard.nativeElement.classList.remove("active");
  }

  public paymentReminder(id: string) {
    this.sendReminder = true;
    this.sub.add(
      this._attendant.sendpaymentReminder(id).subscribe({
        next: (res: ResponseModel<any>) => {
          // console.log(res);
          this.sendReminder = false;
          this._toastr.showSuccess(
            res.message,
            'Success'
          );
          this.loadCandidates();
          this.removeStudentDetails();
        },
        error: (error: HttpErrorResponse) => {
          // console.log(error);
          this.sendReminder = false;
          this._toastr.showError(
            error.error?.message,
            'Failed'
          );
        },
      })
    );
  }

  public multiSendPaymentReminder() {
    this.selectedAttendants.map((item: Attendant) => {
      this.selectedIds.push(item._id);
    });
    const payload = {
      id: this.selectedIds,
    };
    this.sendReminder = true;
    this.sub.add(
      this._attendant.multiSendpaymentReminder(payload).subscribe({
        next: (res: ResponseModel<any>) => {
          // console.log(res);
          this.sendReminder = false;
          this._toastr.showSuccess(
            res.message,
            'Success'
          );
          this.loadCandidates();
          this.removeStudentDetails();
        },
        error: (error: HttpErrorResponse) => {
          // console.log(error);
          this.sendReminder = false;
          this._toastr.showError(
            error.error?.message,
            'Failed'
          );
        },
      })
    );
  }

  public sendProfileCardToAttendant(id: string) {
    this.sendProfileCard = true;
    this.sub.add(
      this._attendant.sendprofileCard(id).subscribe({
        next: (res: ResponseModel<any>) => {
          // console.log(res);
          this.sendProfileCard = false;
          this._toastr.showSuccess(
            res.message,
            'Success'
          );
          this.loadCandidates();
          this.removeStudentDetails();
        },
        error: (error: HttpErrorResponse) => {
          // console.log(error);
          this.sendProfileCard = false;
          this._toastr.showError(
            error.error?.message,
            'Failed'
          );
        },
      })
    );
  }

  public confirmPayment(id: string) {
    this.sendProfileCard = true;
    const payload = {
      id: id,
      hasPaid: true
    }
    this.sub.add(
      this._attendant.confirmPayment(payload).subscribe({
        next: (res: ResponseModel<any>) => {
          // console.log(res);
          this.sendProfileCard = false;
          this._toastr.showSuccess(
            res.message,
            'Success'
          );
          this.loadCandidates();
          this.removeStudentDetails();
        },
        error: (error: HttpErrorResponse) => {
          // console.log(error);
          this.sendProfileCard = false;
          this._toastr.showError(
            error.error?.message,
            'Failed'
          );
        },
      })
    );
  }


  public stopParentEvent(event: MouseEvent) {
    event.stopPropagation();
  }

  // public exportAsXLSX(): void {
  //   this.isExporting = true;
  //   if (!isNullOrUndefined(this.candidates)) {
  //     let candidates: Attendant[] = this.candidates.map((s: any) => {
  //       return <Attendant>{
  //         fullName: s.fullName,
  //         email: s.email,
  //         registrationNo: s.registrationNo,
  //       };
  //     });

  //     if (candidates.length > 0) {
  //       this._attendant.exportAsExcelFile(
  //         candidates,
  //         `HR-Tech Attendant`
  //       );
  //       this._toastr.showSuccess("success", "Export complete");
  //     } else {
  //       this._toastr.showSuccess("success", "No Candidates to Export");
  //     }

  //     this.isExporting = false;
  //   }
  //   this.isExporting = false;
  // }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
