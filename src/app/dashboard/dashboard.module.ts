import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { MatDialogModule } from '@angular/material/dialog';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BannerComponent } from './components/banner/banner.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { ServicesComponent } from './components/services/services.component';
import { FeedbackComponent } from './components/feedback/feedback.component';

@NgModule({
  declarations: [
    DashboardComponent,
    BannerComponent,
    GalleryComponent,
    ServicesComponent,
    FeedbackComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatDialogModule,
    SharedModule,
    ReactiveFormsModule,
  ],
})
export class DashboardModule {}
