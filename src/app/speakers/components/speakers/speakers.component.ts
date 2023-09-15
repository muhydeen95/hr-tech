import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
} from "@angular/core";
import { Subscription } from "rxjs";
import { ResponseModel, Speaker } from "app/models/response.model";
import { HelperService } from "@shared/services/helper.service";
import { SpeakersService } from "app/speakers/services/speaker.service";
import { MatDialog } from "@angular/material/dialog";
import { DialogModel } from "@shared/components/models/dialog.model";
import { AddSpeakerDialogComponent } from "app/speakers/dialogs/add-speaker-dialog/add-speaker-dialog.component";

@Component({
  selector: 'app-speakers',
  templateUrl: './speakers.component.html',
  styleUrls: ['./speakers.component.scss']
})
export class SpeakersComponent implements OnInit, OnDestroy {
  @ViewChild('profileCard') profileCard!: ElementRef;
  public sub: Subscription = new Subscription();
  candidates: Speaker[] = [];
  selectedCandidates: Speaker[] = [];
  selectedIds: string[] = [];
  candidateDetail: Speaker = {
    _id: '',
    fullName: '',
    email: '',
    phoneNumber: '',
    organization: '',
    position: '',
    country: '',
    biography: '',
    fileUrl: '',
    imgUrl: '',
    createdAt: '',
  };;
  candidatesToDisplay: any;
  tempresult: any;
  isInitial: boolean = true;
  isShortlistingCandidates: boolean = false;
  isUnShortlistingCandidates: boolean = false;
  isLoading: boolean = false;
  isExporting: boolean = false;
  public cols: {header: string, field: string}[] = [];
  public hasPaid!: boolean;
  public statusOption: {name: string, value: any}[] = [
    {name: 'All', value: null}, {name: 'Paid', value: true}, {name:'Not Paid', value: false}
  ];
  public sendReminder: boolean = false;
  public sendProfileCard: boolean = false;


  constructor(
    private _speaker: SpeakersService,
    private _helper: HelperService,
    private dialog: MatDialog
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

  public padWithLeadingZeros(num: any) {
    return String(num).padStart(4, '0');
  }

  public loadCandidates() {
    this.isLoading = true;
    this._helper.startSpinner();
    this.sub.add(
      this._speaker
        .getAllSpeakers()
        .subscribe(
          (res: ResponseModel<Speaker[]>) => {
            // console.log(res);
            this.isLoading = false;
            this.isInitial = true;
            this._helper.stopSpinner();
            this.candidates = res["response"];
          },
          (error) => {
            this.isLoading = false;
            this._helper.stopSpinner();
            console.log(error);
          }
        )
    );
  }

  public openDialog(
    payload: { isEditing?: boolean; editObject?: Speaker } | any
  ): void {
    let object: DialogModel<Speaker> = payload;
    const dialogRef = this.dialog.open(AddSpeakerDialogComponent, {
      data: object,
      panelClass: 'modal-width'
    });
    // console.log(payload)
    dialogRef.componentInstance.event.subscribe(
      (event: DialogModel<Speaker>) => {
        if (event?.isEditing) {
          const index = this.candidates.findIndex((leave: Speaker) => {
            return leave._id == event?.editObject?._id;
          });
          this.candidates[index] = event?.editObject;
        } else {
          this.candidates = [event?.editObject, ...this.candidates];
        }
      }
    );
  }


  public exportAttendants() {
    this.isExporting = true;
    this.sub.add(
      this._speaker
        .exportAllSpeakers()
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

  showStudentDetails(candidates: Speaker) {
    this.profileCard.nativeElement.classList.add("active");
    this.candidateDetail = candidates;
  }

  removeStudentDetails() {
    this.profileCard.nativeElement.classList.remove("active");
  }



  public stopParentEvent(event: MouseEvent) {
    event.stopPropagation();
  }



  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
