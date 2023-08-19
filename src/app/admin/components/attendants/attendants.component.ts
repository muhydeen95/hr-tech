import {
  Component,
  OnInit,
  OnDestroy
} from "@angular/core";
import { Subscription } from "rxjs";
import { Attendant, ResponseModel } from "app/models/response.model";
import { AttendantsService } from "app/admin/services/attendants.service";

@Component({
  selector: 'app-attendants',
  templateUrl: './attendants.component.html',
  styleUrls: ['./attendants.component.scss']
})

export class AttendantsComponent implements OnInit, OnDestroy {
  public sub: Subscription = new Subscription();
  candidates: any[] = [];
  candidatesToDisplay: any;
  tempresult: any;
  selectedCandidates: any[] = [];
  searching: boolean = false;
  isShortlistingCandidates: boolean = false;
  isUnShortlistingCandidates: boolean = false;
  isLoading: boolean = false;
  isExporting: boolean = false;
  public cols: {header: string, field: string}[] = [];


  constructor(
    private _attendant: AttendantsService,
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
    this.searching = false;
    this.sub.add(
      this._attendant
        .getAllAttendants()
        .subscribe(
          (res: ResponseModel<any>) => {
            console.log(res);
            this.isLoading = false;
            this.candidates = res["response"];
          },
          (error) => {
            this.isLoading = false;
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
          (res: ResponseModel<Attendant>) => {
            console.log(res);
            this.isExporting = false;
          },
          (error) => {
            this.isExporting = false;
          }
        )
    );
  }

  public stopParentEvent(event: MouseEvent) {
    event.stopPropagation();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
