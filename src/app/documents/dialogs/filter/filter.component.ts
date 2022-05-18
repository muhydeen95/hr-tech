import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogModel } from '@shared/components/models/dialog.model';
import { FilterDTO } from 'app/documents/models/documents.model';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  public date: string = new Date().toISOString();
  @Output() event: EventEmitter<string> = new EventEmitter<string>();

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogModel<FilterDTO>) {}
  ngOnInit(): void {}

  public getDate(date: any): void {
    this.event.emit(new Date(date).toISOString());
  }
}
