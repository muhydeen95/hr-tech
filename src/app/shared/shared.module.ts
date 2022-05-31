import { FiletraCardComponent } from './components/filetra-card/filetra-card.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingButtonComponent } from './components/loading-button/loading-button.component';
import { LoaderComponent } from './components/loader/loader.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ConfirmationModalComponent } from './components/confirmation-modal/confirmation-modal.component';
import { FiletraSkeletonLoaderComponent } from './components/filetra-skeleton-loader/filetra-skeleton-loader.component';
import { ErrorComponent } from './components/error/error.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NoDataComponent } from './components/no-data/no-data.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { LayoutComponent } from './components/layout/layout.component';
import { CardComponent } from './components/card/card.component';
import { SearchbarComponent } from './components/searchbar/searchbar.component';
import { HelpCenterComponent } from './components/help-center/help-center.component';
import { InfoComponent } from './components/info/info.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { SuccessModalComponent } from './components/success-modal/success-modal.component';
import { UploadedDocComponent } from './components/uploaded-doc/uploaded-doc.component';
import { TableHeaderComponent } from './components/table-header/table-header.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { NotificationComponent } from './components/notification/notification.component';
import { ReusableSideDrawerComponent } from './components/reusable-side-drawer/reusable-side-drawer.component';
import { ReusableSideDrawerDirective } from './directives/reusable-side-drawer.directive';

@NgModule({
  declarations: [
    LoadingButtonComponent,
    LoaderComponent,
    SidebarComponent,
    NavbarComponent,
    LayoutComponent,
    ErrorComponent,
    FiletraSkeletonLoaderComponent,
    NoDataComponent,
    ConfirmationModalComponent,
    CardComponent,
    SearchbarComponent,
    HelpCenterComponent,
    InfoComponent,
    SuccessModalComponent,
    UploadedDocComponent,
    FiletraCardComponent,
    TableHeaderComponent,
    NotificationsComponent,
    NotificationComponent,
    ReusableSideDrawerComponent,
    ReusableSideDrawerDirective,
  ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    RouterModule,
    NgxSkeletonLoaderModule,
    MatDialogModule,
    NgSelectModule,
  ],
  exports: [
    LoadingButtonComponent,
    LoaderComponent,
    SidebarComponent,
    NavbarComponent,
    LayoutComponent,
    ErrorComponent,
    FiletraSkeletonLoaderComponent,
    NgxSkeletonLoaderModule,
    NoDataComponent,
    ConfirmationModalComponent,
    CardComponent,
    SearchbarComponent,
    HelpCenterComponent,
    InfoComponent,
    NgSelectModule,
    SuccessModalComponent,
    UploadedDocComponent,
    FiletraCardComponent,
    TableHeaderComponent,
    NotificationsComponent,
    NotificationComponent,
    ReusableSideDrawerComponent,
    ReusableSideDrawerDirective,
  ],
})
export class SharedModule {}
