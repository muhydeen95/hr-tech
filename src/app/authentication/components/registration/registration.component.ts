import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { countryCodes } from '@core/models/country-code.model';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AuthService } from '@auth/services/auth.service';
import { RegisterRequestDTO } from '@auth/models/auth.model';
import { Subscription } from 'rxjs';
import { RegistrationDialogComponent } from './dialogs/registration-dialog/registration-dialog.component';
import { ResponseModel } from 'app/models/response.model';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  public registrationForm!: FormGroup;
  public isLoggingIn: boolean = false;
  public showPassword: boolean = false;
  public showConfirmPassword: boolean = false;
  public loginForm!: FormGroup;
  private sub: Subscription = new Subscription();
  public isSiginingUp: boolean = false;
  public registerFormSubmitted: boolean = false;
  public error_message: string = '';
  public countryCodes: { name: string, dial_code: string, code: string}[] = countryCodes;
  public code: any = 'NG (+234)';

  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private _auth: AuthService
  )
  {}

  ngOnInit() {
    this.initRegisterForm();
  }

  initRegisterForm() {
    this.registrationForm = this.fb.group(
      {
        FirstName: ['', Validators.required],
        MiddleName: [''],
        LastName: ['', Validators.required],
        PhoneNumber: ['', Validators.required],
        AlternatePhoneNumber: [''],
        Email: ['', [Validators.required, Validators.email]],
        ConfirmEmail: ['', Validators.email],
        AlternateEmail: ['', Validators.email],
        OrganizationName: [''],
        Password: ['', 
          [
            Validators.required,
            Validators.pattern(/^(?=.?[A-Z])(?=.?[a-z])(?=.*?[0-9]).{8,}$/)
          ]
        ],
        ConfirmPassword: ['', [Validators.required]],
      },
      { validators: [this.passwordMatchValidator, this.EmailMatchValidator] }
    );
  }

  passwordMatchValidator(f: FormGroup) {
    return f.get('Password')?.value === f.get('ConfirmPassword')?.value
      ? null
      : { passwordMismatch: true };
  }

  EmailMatchValidator(f: FormGroup) {
    return f.get('Email')?.value === f.get('ConfirmEmail')?.value
      ? null
      : { emailMismatch: true };
  }

  public getCountryCode(event: any) {
    this.code = event.code + ` ( ${event.dial_code} )`;
    this.registrationForm.patchValue({
      PhoneNumber: event.dial_code,
    })
  }

  public register(): void {
    this.registerFormSubmitted = true;
    if(!this.registrationForm.valid) {
      this.error_message = 'Please fill all required field!';
      window.scroll(0,0);
    }
    if (this.registrationForm.valid) {
      this.isSiginingUp = true;
      const payload = this.registrationForm.value;
      if(payload.AlternateEmail == '') {
        delete payload.AlternateEmail;
      }
      delete payload.code;
      this._auth.register(payload).subscribe({
        next: (res: ResponseModel<RegisterRequestDTO>) => {
          this.isSiginingUp = false;
          this.registerFormSubmitted = true;
          // this.router.navigate(['authentication/login']);
          this.openModal();
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
          this.isSiginingUp = false;
          this.registerFormSubmitted = true;
          this.error_message = error?.error?.response[0].description;
          window.scroll(0,0);
        },
      });
    }
  }

  public checkForKeyEnter(event: KeyboardEvent): void {
    var key = event.key || event.keyCode;
    if (key == 'Enter' || key == 8) {
      this.register();
    }
  }

  public openModal(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.height = '365px';
    dialogConfig.width = '600px';
    dialogConfig.data = {
      email: `${this.registrationForm.get('Email')?.value}`,
      counter: '00:05',
      name: `
        ${this.registrationForm.get('FirstName')?.value}  
        ${this.registrationForm.get('LastName')?.value}
      `
    };
    const dialogRef = this.dialog.open(
      RegistrationDialogComponent,
      dialogConfig
    );
    dialogRef.afterClosed().subscribe((result) => {});
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
