import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StepTwoComponent } from './step-two.component';

const routes: Routes = [{ path: '', component: StepTwoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StepTwoRoutingModule { }
