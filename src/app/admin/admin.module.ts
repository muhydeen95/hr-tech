import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttendantsComponent } from './components/attendants/attendants.component';
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '@shared/shared.module';
import { TableModule } from 'primeng/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatTooltipModule } from '@angular/material/tooltip';


@NgModule({
  declarations: [
    AttendantsComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    TableModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    MatTooltipModule
  ]
})
export class AdminModule { }
