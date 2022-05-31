import { Component, Inject, OnInit } from '@angular/core';
import {
  MatSnackBarRef,
  MAT_SNACK_BAR_DATA,
} from '@angular/material/snack-bar';
import { SnackType } from '@core/models/snack.model';

@Component({
  selector: 'app-filetra-snackbar',
  templateUrl: './filetra-snackbar.component.html',
  styleUrls: ['./filetra-snackbar.component.scss'],
})
export class FiletraSnackbarComponent implements OnInit {
  public snackType = SnackType;
  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: any,
    private _snackRef: MatSnackBarRef<FiletraSnackbarComponent>
  ) {}

  ngOnInit(): void {}

  public dismiss(): void {
    this._snackRef.dismiss();
  }
}
