import { HttpErrorResponse } from '@angular/common/http';
import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
} from "@angular/core";
import { Subscription } from "rxjs";
import { ResponseModel } from "app/models/response.model";
import { HelperService } from "@shared/services/helper.service";
import { MatDialog } from "@angular/material/dialog";
import { DialogModel } from "@shared/components/models/dialog.model";
import { Toastr } from "@GlobalService/toastr.service";
import { SponsorsService } from 'app/sponsors/services/sponsors.service';
import { Sponsor } from 'app/contact/models/contact.model';
import { AddSponsorDialogComponent } from 'app/sponsors/dialogs/add-sponsor-dialog/add-sponsor-dialog.component';

@Component({
  selector: 'app-sponsors',
  templateUrl: './sponsors.component.html',
  styleUrls: ['./sponsors.component.scss']
})
export class SponsorsComponent implements OnInit, OnDestroy {
  @ViewChild('profileCard') profileCard!: ElementRef;
  public sub: Subscription = new Subscription();
  public sponsors: Sponsor[] = [];
  public selectedSponsors: Sponsor[] = [];
  public selectedIds: string[] = [];
  public sponsorDetail: Sponsor = {
    _id: '',
    companyName: '',
    email: '',
    phoneNumber: '',
    contactPerson: '',
    website: '',
    country: '',
    sponsorPlan: '',
    fileUrl: '',
    imgUrl: '',
    createdAt: '',
  };;
  public isInitial: boolean = true;
  public isLoading: boolean = false;
  public isExporting: boolean = false;
  public cols: {header: string, field: string}[] = [];
  public sponsorId!: string;


  constructor(
    private _sponsor: SponsorsService,
    private _helper: HelperService,
    private dialog: MatDialog,
    private _toastr: Toastr
  ) {}

  ngOnInit() {
    this.loadCandidates();
    this.cols = [
      {
        header: "companyName",
        field: "companyName",
      },
      {
        header: "contactPerson",
        field: "contactPerson",
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
        header: "website",
        field: "website",
      },
      {
        header: "sponsorPlan",
        field: "sponsorPlan",
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
      this._sponsor
        .getAllSponsors()
        .subscribe(
          (res: ResponseModel<Sponsor[]>) => {
            // console.log(res);
            this.isLoading = false;
            this.isInitial = true;
            this._helper.stopSpinner();
            this.sponsors = res["response"];
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
    payload: { isEditing?: boolean; editObject?: Sponsor } | any
  ): void {
    let object: DialogModel<Sponsor> = payload;
    const dialogRef = this.dialog.open(AddSponsorDialogComponent, {
      data: object
    });
    // console.log(payload)
    dialogRef.componentInstance.event.subscribe(
      (event: DialogModel<Sponsor>) => {
        if (event?.isEditing) {
          const index = this.sponsors.findIndex((leave: Sponsor) => {
            return leave._id == event?.editObject?._id;
          });
          this.sponsors[index] = event?.editObject;
        } else {
          this.sponsors = [event?.editObject, ...this.sponsors];
        }
        this.sponsorId = '';
      }
    );
  }

  public deleteSpeaker(speaker: Sponsor): void {
    this.sponsorId = speaker._id;
    this.sub.add(
      this._sponsor.deleteSponsor(speaker).subscribe({
        next: (res: any) => {
          this._toastr.showSuccess(res.message, 'success');
          this.sponsors.splice(
            this.sponsors.findIndex((a: Sponsor) => a._id == speaker._id),
            1
          );
          this.sponsorId = '';
        },
        error: (error: HttpErrorResponse) => {
          this.sponsorId =  '';
          this._toastr.showError(error?.error?.message, 'error');
        },
      })
    );
  }


  public exportAttendants() {
    this.isExporting = true;
    this.sub.add(
      this._sponsor
        .exportAllSponsors()
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

  showStudentDetails(sponsor: Sponsor) {
    this.profileCard.nativeElement.classList.add("active");
    this.sponsorDetail = sponsor;
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
