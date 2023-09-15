
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { LoaderComponent } from './components/loader/loader.component';
import { LoadingButtonComponent } from './components/loading-button/loading-button.component';
import { NoDataComponent } from './components/no-data/no-data.component';
import { ErrorComponent } from './components/error/error.component';
import { UploadDocComponent } from './components/upload-doc/upload-doc.component';
import { UploadedDocComponent } from './components/uploaded-doc/uploaded-doc.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LayoutComponent } from './components/layout/layout.component';
import { HeaderComponent } from './components/header/header.component';
@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    LoaderComponent,
    LoadingButtonComponent,
    NoDataComponent,
    ErrorComponent,
    UploadDocComponent,
    UploadedDocComponent,
    SidebarComponent,
    LayoutComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    RouterModule,
    MatDialogModule,
  ],
  exports: [
    NavbarComponent,
    FooterComponent,
    LoaderComponent,
    LoadingButtonComponent,
    NoDataComponent,
    ErrorComponent,
    UploadDocComponent,
    UploadedDocComponent,
    SidebarComponent,
    LayoutComponent,
    HeaderComponent
  ],
})
export class SharedModule {}
