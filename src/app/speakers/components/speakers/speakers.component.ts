import { HttpErrorResponse } from '@angular/common/http';
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
import { Toastr } from "@GlobalService/toastr.service";

@Component({
  selector: 'app-speakers',
  templateUrl: './speakers.component.html',
  styleUrls: ['./speakers.component.scss']
})
export class SpeakersComponent implements OnInit, OnDestroy {
  @ViewChild('profileCard') profileCard!: ElementRef;
  public sub: Subscription = new Subscription();
  public speakers: Speaker[] = [];
  public selectedSpeakers: Speaker[] = [];
  public selectedIds: string[] = [];
  public speakerDetail: Speaker = {
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
  public isInitial: boolean = true;
  public isLoading: boolean = false;
  public isExporting: boolean = false;
  public cols: {header: string, field: string}[] = [];
  public speakerId!: string;


  constructor(
    private _speaker: SpeakersService,
    private _helper: HelperService,
    private dialog: MatDialog,
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
    ];
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

  public openDialog(
    payload: { isEditing?: boolean; editObject?: Speaker } | any
  ): void {
    let object: DialogModel<Speaker> = payload;
    const dialogRef = this.dialog.open(AddSpeakerDialogComponent, {
      data: object
    });
    // console.log(payload)
    dialogRef.componentInstance.event.subscribe(
      (event: DialogModel<Speaker>) => {
        if (event?.isEditing) {
          const index = this.speakers.findIndex((leave: Speaker) => {
            return leave._id == event?.editObject?._id;
          });
          this.speakers[index] = event?.editObject;
        } else {
          this.speakers = [event?.editObject, ...this.speakers];
        }
        this.speakerId = '';
      }
    );
  }

  public deleteSpeaker(speaker: Speaker): void {
    this.speakerId = speaker._id;
    this.sub.add(
      this._speaker.deleteSpeaker(speaker).subscribe({
        next: (res: any) => {
          this._toastr.showSuccess(res.message, 'success');
          this.speakers.splice(
            this.speakers.findIndex((a: Speaker) => a._id == speaker._id),
            1
          );
          this.speakerId = '';
        },
        error: (error: HttpErrorResponse) => {
          this.speakerId =  '';
          this._toastr.showError(error?.error?.message, 'error');
        },
      })
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

  showStudentDetails(speaker: Speaker) {
    this.profileCard.nativeElement.classList.add("active");
    this.speakerDetail = speaker;
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
