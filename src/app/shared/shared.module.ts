
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { LoaderComponent } from './components/loader/loader.component';
import { LoadingButtonComponent } from './components/loading-button/loading-button.component';
import { NoDataComponent } from './components/no-data/no-data.component';
@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    LoaderComponent,
    LoadingButtonComponent,
    NoDataComponent
  ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    RouterModule,
    MatDialogModule,
  ],
  exports: [
    NavbarComponent,
    FooterComponent,
    LoaderComponent,
    LoadingButtonComponent,
    NoDataComponent
  ],
})
export class SharedModule {}
