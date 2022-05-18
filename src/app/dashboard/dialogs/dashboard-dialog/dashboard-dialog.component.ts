import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogModel } from '@shared/components/models/dialog.model';
import { Dashboard } from 'app/dashboard/models/dashboard.model';

@Component({
  selector: 'app-dashboard-dialog',
  templateUrl: './dashboard-dialog.component.html',
  styleUrls: ['./dashboard-dialog.component.scss'],
})
export class DashboardDialogComponent implements OnInit {
  @Output() event: EventEmitter<{ editObj: Dashboard; isEditing?: boolean }> =
    new EventEmitter<{ editObj: Dashboard; isEditing?: boolean }>();

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogModel<Dashboard>) {}

  ngOnInit(): void {}
}
