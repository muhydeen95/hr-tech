import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
// import { DialogModel } from '@shared/components/models/dialog.model';
import { Subscription } from 'rxjs';
import {
  DashboardResponseDTO,
  // UploadDocDTO,
} from 'app/dashboard/models/dashboard.model';
import { UploadDocumentComponent } from 'app/dashboard/dialogs/upload-document/upload-document.component';
import { TrackDocumentComponent } from 'app/dashboard/dialogs/track-document/track-document.component';
import { ResponseModel } from '../../../models/response.model';
import { Router, NavigationExtras } from '@angular/router';
import { DashboardService } from 'app/dashboard/services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  private sub: Subscription = new Subscription();
  public isDocumentFetching: boolean = true;
  public applicationLoading: boolean = true;
  public isFetchingDashboard: boolean = true;
  public dashboardMetrics!: DashboardResponseDTO;
  navigationExtras: NavigationExtras = {
    queryParams: { isSearching: true },
  };

  constructor(
    public dialog: MatDialog,
    private _dashboard: DashboardService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getDashboard();
  }

  public getDashboard(): void {
    this._dashboard.getCustomerDashboard().subscribe({
      next: (res: ResponseModel<DashboardResponseDTO>) => {
        this.isFetchingDashboard = false;
        this.dashboardMetrics = res.response;
        console.log(this.dashboardMetrics);
      },
      error: (error: ResponseModel<any>) => {
        this.isFetchingDashboard = false;
      },
    });
  }

  public openUploadDialog(): void {
    const dialogRef = this.dialog.open(UploadDocumentComponent);
    dialogRef.componentInstance.isUploaded.subscribe(
      (isFileUploaded: boolean) => {
        isFileUploaded && this.getDashboard();
      }
    );
  }

  routeToPage(query: string, isSearching: boolean): void {
    this.router.navigate([`documents/status/${query}`], this.navigationExtras);
  }
  triggerClick(query: string): void {
    const param: NavigationExtras = {
      queryParams: { query },
    };
    this.router.navigate([`documents`], param);
  }

  public openTrackDialog(): void {
    const dialogRef = this.dialog.open(TrackDocumentComponent);
    dialogRef.componentInstance.searchAction.subscribe(
      (correspondenceNumber: string) => {
        correspondenceNumber &&
          (() => {
            dialogRef.close();
            this.routeToPage(correspondenceNumber, true);
          })();
      }
    );
  }

  public viewDocument(documentId: string): void {
    this.routeToPage(documentId, false);
  }
  public viewLcApplication(lcApplicationId: number): void {
    this.router.navigate(['application/detail', lcApplicationId]);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
