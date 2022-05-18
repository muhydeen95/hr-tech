import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { EmailConfirmationComponent } from './email-confirmation.component';
import { EmailConfirmationRoutingModule } from './email-confirmation-routing.module';

@NgModule({
  declarations: [EmailConfirmationComponent],
  imports: [
    CommonModule,
    EmailConfirmationRoutingModule,
    SharedModule,
  ],
})
export class EmailconfirmationModule {}
