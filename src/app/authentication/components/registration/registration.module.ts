import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistrationRoutingModule } from './registration-routing.module';
import { SharedModule } from '@shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RegistrationComponent } from './registration.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FormatTimePipe, RegistrationDialogComponent } from './dialogs/registration-dialog/registration-dialog.component';

@NgModule({
  declarations: [RegistrationComponent, RegistrationDialogComponent, FormatTimePipe],
  imports: [
    CommonModule,
    RegistrationRoutingModule,
    MatDialogModule,
    SharedModule,
    ReactiveFormsModule,
  ],
})
export class RegistrationModule {}
