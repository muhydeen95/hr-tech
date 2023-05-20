import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactComponent } from './components/about/about.component';
import { AboutRoutingModule } from './about-routing.module';
import { SharedModule } from '@shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ContactComponent
  ],
  imports: [
    CommonModule,
    AboutRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class AboutModule { }
