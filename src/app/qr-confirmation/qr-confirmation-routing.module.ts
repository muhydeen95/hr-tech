import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QrConfirmationComponent } from './components/qr-confirmation/qr-confirmation.component';

const routes: Routes = [{ path: '', component: QrConfirmationComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QrConfirmationRoutingModule {}
