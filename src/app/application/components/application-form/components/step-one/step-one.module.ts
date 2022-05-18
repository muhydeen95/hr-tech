import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StepOneRoutingModule } from './step-one-routing.module';
import { StepOneComponent } from './step-one.component';
import { SharedModule } from '@shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [StepOneComponent],
  imports: [
    CommonModule,
    StepOneRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ],
})
export class StepOneModule {}
