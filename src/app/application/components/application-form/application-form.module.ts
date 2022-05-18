import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApplicationFormRoutingModule } from './application-form-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { TermsComponent } from './dialogs/terms/terms.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [LayoutComponent, TermsComponent],
  imports: [CommonModule, ApplicationFormRoutingModule, MatDialogModule],
})
export class ApplicationFormModule {}
