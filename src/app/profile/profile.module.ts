import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { ProfileComponent } from './components/profile/profile.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { MatDialogModule } from '@angular/material/dialog';
import { ChangePasswordDialogComponent } from './dialogs/change-password-dialog/change-password-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({
  declarations: [ProfileComponent, ChangePasswordDialogComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    MatDialogModule,
    ReactiveFormsModule,
    SharedModule,
    FormsModule,
    MatProgressBarModule,
  ],
})
export class ProfileModule {}
