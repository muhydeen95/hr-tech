import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnsubscribeComponent } from './components/unsubscribe/unsubscribe.component';

const routes: Routes = [{ path: '', component: UnsubscribeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UnsubscribeRoutingModule {}
