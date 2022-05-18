import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApplicationRoutingModule } from './application-routing.module';
import { ApplicationComponent } from './application.component';
import { FormsModule } from '@angular/forms';
import { ApplicationDetailsComponent } from './components/application-details/application-details.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [ApplicationComponent, ApplicationDetailsComponent],
  imports: [CommonModule, FormsModule, ApplicationRoutingModule, SharedModule],
})
export class ApplicationModule {}
