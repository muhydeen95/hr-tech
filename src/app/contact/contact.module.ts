import { NgSelectModule } from '@ng-select/ng-select';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactComponent } from './components/contact/contact.component';
import { ContactRoutingModule } from './contact-routing.module';
import { SharedModule } from '@shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { Ng2TelInputModule } from 'ng2-tel-input';


@NgModule({
  declarations: [
    ContactComponent,
  ],
  imports: [
    CommonModule,
    ContactRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    IvyCarouselModule,
    Ng2TelInputModule,
    NgSelectModule
  ]
})
export class ContactModule { }
