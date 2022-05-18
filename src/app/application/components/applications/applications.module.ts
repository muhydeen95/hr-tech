import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApplicationsRoutingModule } from './applications-routing.module';
import { ApplicationsComponent } from './applications.component';
import { SharedModule } from '@shared/shared.module';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [ApplicationsComponent],
  imports: [
    CommonModule,
    ApplicationsRoutingModule,
    SharedModule,
    MatPaginatorModule,
  ],
})
export class ApplicationsModule {}
