import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StepFourComponent } from './step-four.component';

const routes: Routes = [{ path: '', component: StepFourComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StepFourRoutingModule { }
