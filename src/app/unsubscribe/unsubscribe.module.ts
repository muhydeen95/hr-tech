import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnsubscribeRoutingModule } from './unsubscribe-routing.module';
import { SharedModule } from '@shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { UnsubscribeComponent } from './components/unsubscribe/unsubscribe.component';



@NgModule({
  declarations: [
    UnsubscribeComponent
  ],
  imports: [
    CommonModule,
    UnsubscribeRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class UnsubscribeModule { }
