import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { confirmEmail } from '@auth/models/auth.model';
import { AuthService } from '@auth/services/auth.service';
import { CurrentUserService } from '@core/services/current-user.service';
import { ResponseModel } from 'app/models/response.model';

@Component({
  selector: 'app-email-confirmation',
  templateUrl: './email-confirmation.component.html',
  styleUrls: ['./email-confirmation.component.scss']
})
export class EmailConfirmationComponent implements OnInit {
  public token: string = '';
  public email: string = '';
  public error_message: string = '';
  public isLoading: boolean = false;
  public userInfo: any;

  constructor(
    private _route: ActivatedRoute,
    private _current: CurrentUserService,
    private router: Router,
    private _auth: AuthService,
  ) { }

  ngOnInit(): void {
    this._route.queryParams.subscribe(params => {
      this.token = params['token'];
      this.email = params['email'];
    });
  }

  public goToDashboard(): void {
    const payload = {
      token: this.token,
      email: this.email
    }
      this.isLoading = true;
      this._auth.confirmEmail(payload).subscribe({
        next: (res: ResponseModel<confirmEmail>) => {
          // console.log(res);
          this.isLoading = false;
          this._current.storeUserCredentials(res.response);
          this.router.navigate(['dashboard']);
        },
        error: (error: HttpErrorResponse) => {
          console.log(error, error.error);
          this.isLoading = false;
          this.error_message = error?.error.message;
        },
      });
  }

}
