import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteGuard } from '@core/guards/route.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./contact/contact.module').then((m) => m.ContactModule),
    data: { breadcrumb: 'Attendant' },
  },
  {
    path: 'authentication',
    loadChildren: () =>
      import('./authentication/authentication.module').then((m) => m.AuthenticationModule),
    data: { breadcrumb: 'Attendant' },
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
      data: { breadcrumb: 'Admin' },
      canActivate: [RouteGuard],
  },
  {
    path: 'speaker/:id',
    loadChildren: () =>
      import('./speaker/speaker.module').then((m) => m.SpeakerModule),
    data: { breadcrumb: 'Speaker' },
  },
  {
    path: 'payment/:id',
    loadChildren: () =>
      import('./payment/payment.module').then((m) => m.PaymentModule),
    data: { breadcrumb: 'Admin' },
  },
  {
    path: 'payment-confirmation/:id',
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
