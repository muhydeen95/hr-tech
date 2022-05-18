import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FinalRoutingModule } from './final-routing.module';
import { FinalComponent } from './final.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { NgxSignaturepadModule } from 'ngx-signaturepad2';

@NgModule({
  declarations: [FinalComponent],
  imports: [
    CommonModule,
    FinalRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    NgxSignaturepadModule,
  ],
})
export class FinalModule {}
