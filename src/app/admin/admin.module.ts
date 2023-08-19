import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttendantsComponent } from './components/attendants/attendants.component';
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '@shared/shared.module';
import { TableModule } from 'primeng/table';


@NgModule({
  declarations: [
    AttendantsComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    TableModule
  ]
})
export class AdminModule { }
