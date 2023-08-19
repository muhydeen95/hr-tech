import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AttendantsComponent } from './components/attendants/attendants.component';

const routes: Routes = [{ path: '', component: AttendantsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
