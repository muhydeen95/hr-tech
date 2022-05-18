import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingButtonComponent } from './components/loading-button/loading-button.component';
import { LoaderComponent } from './components/loader/loader.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ConfirmationModalComponent } from './components/confirmation-modal/confirmation-modal.component';
import { DocstreamSkeletonLoaderComponent } from './components/docstream-skeleton-loader/docstream-skeleton-loader.component';
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

@NgModule({
  declarations: [
    LoadingButtonComponent,
    LoaderComponent,
    SidebarComponent,
    NavbarComponent,
    LayoutComponent,
    ErrorComponent,
    DocstreamSkeletonLoaderComponent,
    NoDataComponent,
    ConfirmationModalComponent,
    CardComponent,
    SearchbarComponent,
    HelpCenterComponent,
    InfoComponent,
    SuccessModalComponent,
    UploadedDocComponent,
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
    DocstreamSkeletonLoaderComponent,
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
  ],
})
export class SharedModule {}
