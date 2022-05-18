import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResetPasswordRoutingModule } from './reset-password-routing.module';
import { SharedModule } from '@shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ResetPasswordComponent } from './reset-password.component';
import { ResetDialogComponent } from './reset-dialog/reset-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [ResetPasswordComponent, ResetDialogComponent],
  imports: [
    CommonModule,
    ResetPasswordRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    MatDialogModule
  ],
})
export class ResetPasswordModule {}
