import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { MatDialogModule } from '@angular/material/dialog';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { SponsorsComponent } from './components/sponsors/sponsors.component';
import { AddSponsorDialogComponent } from './dialogs/add-sponsor-dialog/add-sponsor-dialog.component';
import { SponsorsRoutingModule } from './sponsors-routing.module';
import { Ng2TelInputModule } from 'ng2-tel-input';


@NgModule({
  declarations: [SponsorsComponent, AddSponsorDialogComponent],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    TableModule,
    MatDialogModule,
    NgSelectModule,
    SponsorsRoutingModule,
    MatTooltipModule,
    AngularEditorModule,
    Ng2TelInputModule
  ]
})
export class SponsorsModule { }
