import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StepFourRoutingModule } from './step-four-routing.module';
import { StepFourComponent } from './step-four.component';
import { SharedModule } from '@shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [StepFourComponent],
  imports: [
    CommonModule,
    StepFourRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ],
})
export class StepFourModule {}
