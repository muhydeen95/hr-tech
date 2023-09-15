import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpeakersComponent } from './components/speakers/speakers.component';
import { SharedModule } from '@shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { MatDialogModule } from '@angular/material/dialog';
import { NgSelectModule } from '@ng-select/ng-select';
import { SpeakersRoutingModule } from './speakers-routing.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { AddSpeakerDialogComponent } from './dialogs/add-speaker-dialog/add-speaker-dialog.component';


@NgModule({
  declarations: [SpeakersComponent, AddSpeakerDialogComponent],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    TableModule,
    MatDialogModule,
    NgSelectModule,
    SpeakersRoutingModule,
    MatTooltipModule,
    AngularEditorModule
  ]
})
export class SpeakersModule { }
