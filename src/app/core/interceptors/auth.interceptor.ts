import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  // HttpInterceptor,
  // HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { CurrentUserService } from '../services/current-user.service';
import { Router } from '@angular/router';
import { Toastr } from '@GlobalService/toastr.service';

@Injectable()
export class AuthInterceptor {
  constructor(
    private _currentUser: CurrentUserService,
    private _toastr: Toastr,
    private router: Router
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const currentUser = this._currentUser.getAuthToken();

    if (currentUser) {
      request = request.clone({
        setHeaders: {
          Accept: 'application/json',
          Authorization: `Bearer ${currentUser}`,
        },
      });
    }

    const ifConnected = window.navigator.onLine;
    if (ifConnected) {
      return next.handle(request).pipe(
        tap((data: any) => {}),
        catchError((error: any) => {
          if (request.method == 'GET') {
            this._toastr.showError(error?.error?.message, 'error');
          } else {
            this.handleError(error);
          }
          return throwError(error);
        })
      );
    } else {
      this.router.navigate(['offline']);
      return throwError({ message: 'You are not connected to the internet' });
    }
  }

  private handleError(
    error: HttpErrorResponse,
    newRequest?: HttpRequest<any>,
    next?: HttpHandler
  ) {
    // console.log(error);
    if (error.error instanceof ErrorEvent) {
      this._toastr.showError(error.error?.message, 'error');
    } else {
      if (error.status === 401) {
        this.router.navigate(['authentication/login']);
      } else if (error.status === 0) {
        this._toastr.showError(
          'An unexpectederror occured please confirm you have an internet connection or try later',
          'error'
        );
      }

      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }

    return throwError(error);
  }
}
