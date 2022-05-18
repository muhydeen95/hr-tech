import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StepThreeRoutingModule } from './step-three-routing.module';
import { StepThreeComponent } from './step-three.component';
import { SharedModule } from '@shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [StepThreeComponent],
  imports: [
    CommonModule,
    StepThreeRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ],
})
export class StepThreeModule {}
