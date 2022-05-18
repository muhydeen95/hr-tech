import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ForgotPassswordDTO } from '@auth/models/auth.model';
import { AuthService } from '@auth/services/auth.service';
import { ResponseModel } from 'app/models/response.model';
import { Subscription } from 'rxjs';
import { DialogComponent } from './dialog/dialog.component';

@Component({
  selector: 'app-registration',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  public sub: Subscription = new Subscription()
  public forgotPasswordForm!: FormGroup;
  public forgotPasswordFormSubmitted: boolean = false;
  public isLoggingIn: boolean = false;
  public error_message: string = '';
  public isError: boolean = false

  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private _auth: AuthService, 
    private router: Router
  ) { }

  ngOnInit() {
    this.initForgotPasswordForm();
  }

  initForgotPasswordForm() {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    })
  }

  public openModal(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.height = '365px';
    dialogConfig.width = '600px';
    dialogConfig.data = {
      email: `${this.forgotPasswordForm.get('email')?.value}`,
    };
    const dialogRef = this.dialog.open(
      DialogComponent,
      dialogConfig
    );
    dialogRef.afterClosed().subscribe((result) => {});
  }

  public submit(): void {
    this.forgotPasswordFormSubmitted = true;
    if (this.forgotPasswordForm.valid) {
      this.isLoggingIn = true;
      this._auth.forgotPassword(this.forgotPasswordForm.value).subscribe({
        next: (res: ResponseModel<ForgotPassswordDTO>) => {
          // console.log(res)
          this.isLoggingIn = false;
          this.forgotPasswordFormSubmitted = true;
          this.openModal();
        },
        error: (error: HttpErrorResponse) => {
          this.isLoggingIn = false;
          this.forgotPasswordFormSubmitted = true;
          this.isError = true;
          // this.error_message = error?.error?.message;
          this.error_message = 'Email does not exist!';
        },
      });
    }
  }
  public checkForKeyEnter(event: KeyboardEvent): void {
    var key = event.key || event.keyCode;
    if (key == 'Enter' || key == 8) {
      this.submit();
    }
  }

  back() {
    this.router.navigate(['/authentication/login'])
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
