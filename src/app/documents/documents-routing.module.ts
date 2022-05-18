import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocumentStatusComponent } from './components/document-status/document-status.component';
import { DocumentComponent } from './components/document/document.component';

const routes: Routes = [
  { path: '', component: DocumentComponent },
  { path: 'status/:id', component: DocumentStatusComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DocumentsRoutingModule {}
