
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { FooterComponent } from './components/footer/footer.component';
@NgModule({
  declarations: [
    NavbarComponent,
    LayoutComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    RouterModule,
    MatDialogModule,
  ],
  exports: [
    NavbarComponent,
    LayoutComponent,
    FooterComponent
  ],
})
export class SharedModule {}
