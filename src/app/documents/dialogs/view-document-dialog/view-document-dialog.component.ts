import {
  Component,
  OnInit,
  Inject,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter,
} from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-view-document-dialog',
  templateUrl: './view-document-dialog.component.html',
  styleUrls: ['./view-document-dialog.component.scss'],
})
export class ViewDocumentDialogComponent implements OnInit {
  @ViewChild('close') close!: ElementRef;
  @Output() event: EventEmitter<{
    editObj: any;
    isEditing?: boolean;
  }> = new EventEmitter<{ editObj: any; isEditing?: boolean }>();
  public jumpToSelectedFileIndex: number = 0;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.jumpToSelectedFileIndex = this.data.editObject.index
  }
}
