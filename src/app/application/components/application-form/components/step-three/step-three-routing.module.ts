import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StepThreeComponent } from './step-three.component';

const routes: Routes = [{ path: '', component: StepThreeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StepThreeRoutingModule { }
