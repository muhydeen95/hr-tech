import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { PaymentConfirmationComponent } from './components/payment-confirmation/payment-confirmation.component';
import { PaymentConfirmationRoutingModule } from './payment-confirmation-routing.module';
import { QRCodeModule } from 'angularx-qrcode';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';


@NgModule({
  declarations: [
    PaymentConfirmationComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PaymentConfirmationRoutingModule,
    QRCodeModule,
    NgxQRCodeModule
  ]
})
export class PaymentConfirmationModule { }
