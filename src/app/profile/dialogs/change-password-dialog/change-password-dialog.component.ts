// import { HttpErrorResponse } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import {
  Component,
  Input,
  Inject,
  OnInit,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseComponent } from '@core/base/base/base.component';
import { ResponseModel } from 'app/models/response.model';
import { Password } from 'app/profile/models/user-profile.model';
import { ProfileService } from 'app/profile/services/profile.service';
// import { ResponseModel } from 'app/models/response.model';

@Component({
  selector: 'app-leave-dialog',
  templateUrl: './change-password-dialog.component.html',
  styleUrls: ['./change-password-dialog.component.scss'],
})
export class ChangePasswordDialogComponent implements OnInit {
  @ViewChild('close') close!: ElementRef;
  @Input() btnAction: boolean = false;
  public changePasswordForm!: UntypedFormGroup;
  public CurrentPassword: boolean = false;
  public showPassword: boolean = false;
  public showConfirmPassword: boolean = false;
  public isLoading: boolean = false;
  public passwordFormSubmitted: boolean = false;
  public isError: boolean = false;
  public error_message: string = '';

  constructor(
    public dialogRef: MatDialogRef<ChangePasswordDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public modalData: any,
    private fb: UntypedFormBuilder,
    private _base: BaseComponent,
    private _profile: ProfileService
  ) {}

  ngOnInit() {
    this.initChangePasswordForm();
  }

  public initChangePasswordForm() {
    this.changePasswordForm = this.fb.group({
      CurrentPassword: ['', Validators.required],
      NewPassword: [
        '',
      [ 
        Validators.required,
        Validators.pattern(/^(?=.?[A-Z])(?=.?[a-z])(?=.*?[0-9]).{8,}$/),
      ]],
      confirmPassword: ['', Validators.required],
    }, {validators: [ this.passwordMatchValidator]})
  }

  passwordMatchValidator(f: UntypedFormGroup) {
    return f.get('NewPassword')?.value === f.get('confirmPassword')?.value ? null : {'passwordMismatch' : true};
}

  public checkForKeyEnter(event: KeyboardEvent): void {
    var key = event.key || event.keyCode;
    if (key == 'Enter' || key == 8) {
      this.submit();
    }
  }

  public submit(): void {
    const payload = this.changePasswordForm.value;
    this.passwordFormSubmitted = true;
    if(!this.changePasswordForm.valid) {
      this.error_message = "Please fill all required field!"
    }
    if (this.changePasswordForm.valid) {
      this.isLoading = true;
      this._profile.changePassword(payload).subscribe({
        next: (res: ResponseModel<Password>) => {
          console.log(res)
          this.isLoading = false;
          this.passwordFormSubmitted = false;
          this.close.nativeElement.click();
          this._base.openSnackBar(
            'Great...!!!, Your action was successful',
            'success'
          );
        },
        error: (error: HttpErrorResponse) => {
          console.log(error, error.error);
          this.isLoading = false;
          this.passwordFormSubmitted = false;
          this.isError = true;
          this.error_message = error?.error.message;
        },
      });
    }
  }
}
