import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'step-one',
        loadChildren: () =>
          import('./components/step-one/step-one.module').then(
            (m) => m.StepOneModule
          ),
      },
      {
        path: 'step-two',
        loadChildren: () =>
          import('./components/step-two/step-two.module').then(
            (m) => m.StepTwoModule
          ),
      },
      {
        path: 'step-three',
        loadChildren: () =>
          import('./components/step-three/step-three.module').then(
            (m) => m.StepThreeModule
          ),
      },
      {
        path: 'step-four',
        loadChildren: () =>
          import('./components/step-four/step-four.module').then(
            (m) => m.StepFourModule
          ),
      },
      {
        path: 'final',
        loadChildren: () =>
          import('./components/final/final.module').then((m) => m.FinalModule),
      },

      {
        path: '',
        redirectTo: 'step-one',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApplicationFormRoutingModule {}
