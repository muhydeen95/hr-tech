import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '@shared/components/layout/layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
        data: { breadcrumb: 'Dashboard' },
      },
      {
        path: 'about',
        loadChildren: () =>
          import('./about/about.module').then((m) => m.AboutModule),
        data: { breadcrumb: 'About' },
      },
      {
        path: 'contact',
        loadChildren: () =>
          import('./contact/contact.module').then((m) => m.ContactModule),
        data: { breadcrumb: 'Contact' },
      },
      {
        path: 'terms',
        loadChildren: () =>
          import('./terms/terms.module').then((m) => m.TermsModule),
        data: { breadcrumb: 'Terms' },
      },
      {
        path: 'faq',
        loadChildren: () =>
          import('./faq/faq.module').then((m) => m.FaqModule),
        data: { breadcrumb: 'Faqs' },
      },
      {
        path: 'unsubscribe',
        loadChildren: () =>
          import('./unsubscribe/unsubscribe.module').then((m) => m.UnsubscribeModule),
        data: { breadcrumb: 'unsubscribe' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
