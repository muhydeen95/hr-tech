import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpeakerRoutingModule } from './speaker-routing.module';
import { SharedModule } from '@shared/shared.module';
import { SpeakerComponent } from './components/speaker/speaker.component';



@NgModule({
  declarations: [SpeakerComponent],
  imports: [
    CommonModule,
    SpeakerRoutingModule,
    SharedModule
  ]
})
export class SpeakerModule { }
