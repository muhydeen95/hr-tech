import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./contact/contact.module').then((m) => m.ContactModule),
    data: { breadcrumb: 'Attendant' },
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
    data: { breadcrumb: 'Admin' },
  },
  {
    path: 'payment',
    loadChildren: () =>
      import('./payment/payment.module').then((m) => m.PaymentModule),
    data: { breadcrumb: 'Admin' },
  },
  {
    path: 'payment-confirmation',
    loadChildren: () =>
      import('./payment-confirmation/payment-confirmation.module').then((m) => m.PaymentConfirmationModule),
    data: { breadcrumb: 'Admin' },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
