import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { QrConfirmationComponent } from './components/qr-confirmation/qr-confirmation.component';
import { QrConfirmationRoutingModule } from './qr-confirmation-routing.module';
import { QRCodeModule } from 'angularx-qrcode';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { QrTokenDialogComponent } from './dialogs/qr-token-dialog/qr-token-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    QrConfirmationComponent,
    QrTokenDialogComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    QrConfirmationRoutingModule,
    QRCodeModule,
    NgxQRCodeModule,
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class QrConfirmationModule { }
