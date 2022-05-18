import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocumentsRoutingModule } from './documents-routing.module';
import { DocumentComponent } from './components/document/document.component';
import { SharedModule } from '@shared/shared.module';
import { FilterComponent } from './dialogs/filter/filter.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DocumentStatusComponent } from './components/document-status/document-status.component';
// import { NgxEmojiPickerModule } from 'ngx-emoji-picker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { MatPaginatorModule } from '@angular/material/paginator';
@NgModule({
  declarations: [DocumentComponent, DocumentStatusComponent, FilterComponent],
  imports: [
    CommonModule,
    DocumentsRoutingModule,
    SharedModule,
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule,
    PdfViewerModule,
    MatPaginatorModule,
    // NgxEmojiPickerModule.forRoot(),
  ],
})
export class DocumentsModule {}
