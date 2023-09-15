import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginRequestDTO } from '@auth/models/auth.model';
import { AuthService } from '@auth/services/auth.service';
import { CurrentUserService } from '@core/services/current-user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;
  public isLoggingIn: boolean = false;
  public loginFormSubmitted: boolean = false;
  public showPassword: boolean = false;
  public err_message: string = '';
  public isError: boolean = false;
  public profile: any;

  constructor(
    // private _base: BaseComponent,
    private fb: FormBuilder,
    private router: Router,
    private _auth: AuthService,
    private _current: CurrentUserService,
  ) {}

  ngOnInit(): void {
    this.initLoginForm();
  }

  initLoginForm() {
    this.loginForm = this.fb.group({
      email: ["", Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required],
    })
  }


  public login(): void {
    this.isLoggingIn = true;
    this.loginFormSubmitted = true;
    const payload: LoginRequestDTO = this.loginForm.value;
    if (this.loginForm.valid) {
      this._auth.login(payload).subscribe({
        next: (res: any) => {
          // console.log(res);
          this.isLoggingIn = false;
          this.loginFormSubmitted = true;
          this._current.storeUserCredentials(res?.token);
          this._current.storeUserDetails(res?.foundUser);
          this.router.navigate(['/admin']);
        },
        error: (error: HttpErrorResponse) => {
          // console.log(error);
          this.isLoggingIn = false;
          this.loginFormSubmitted = true;
          this.err_message = error?.error?.message;
        },
      });
    } else {
      this.isLoggingIn = false;
      this.err_message = "Kindly fill the form correctly"
    }
  }

}
