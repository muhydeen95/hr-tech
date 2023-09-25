import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteGuard } from '@core/guards/route.guard';
import { LayoutComponent } from '@shared/components/layout/layout.component';

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
  {
    path: 'qr-confirmation/:id',
    loadChildren: () =>
      import('./qr-confirmation/qr-confirmation.module').then((m) => m.QrConfirmationModule),
    data: { breadcrumb: 'Admin' },
  },
  {
    path: 'admin',
    component: LayoutComponent,
    canActivate: [RouteGuard],
    children: [
      {
        path: '',
        redirectTo: 'attendants',
        pathMatch: 'full',
      },
      {
        path: 'attendants',
        loadChildren: () =>
          import('./admin/admin.module').then((m) => m.AdminModule),
          data: { breadcrumb: 'Admin' },
      },
      {
        path: 'speakers',
        loadChildren: () =>
          import('./speakers/speakers.module').then((m) => m.SpeakersModule),
          data: { breadcrumb: 'Speakers' },
      },
      {
        path: 'sponsors',
        loadChildren: () =>
          import('./sponsors/sponsors.module').then((m) => m.SponsorsModule),
          data: { breadcrumb: 'Sponsors' },
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
