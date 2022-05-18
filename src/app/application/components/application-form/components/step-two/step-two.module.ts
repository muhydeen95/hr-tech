import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StepTwoRoutingModule } from './step-two-routing.module';
import { StepTwoComponent } from './step-two.component';
import { SharedModule } from '@shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [StepTwoComponent],
  imports: [
    CommonModule,
    StepTwoRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ],
})
export class StepTwoModule {}
