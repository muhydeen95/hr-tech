import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { CurrentUserService } from '../services/current-user.service';
import { BaseComponent } from '../base/base/base.component';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private _currentUser: CurrentUserService,
    private _base: BaseComponent,
    private router: Router
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const headers: any = {
      'Cache-Control': 'no-cache',
      Pragma: 'no-cache',
    };

    if (request.url.includes('login')) {
      const loginRequest = request.clone({
        setHeaders: headers,
      });
      return next.handle(loginRequest);
    }
    const withoutAuth = request.headers.get('Without-Auth');
    if (withoutAuth) {
      return this.continueWithoutAuth(request, next, headers);
    }
    const token = this._currentUser.getAuthToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    const newRequest = request.clone({ setHeaders: headers });

    const ifConnected = window.navigator.onLine;

    if (ifConnected) {
      return next.handle(newRequest).pipe(
        tap(
          (event: any) => {
            if (newRequest.method != 'GET' && event['body']) {
            }
            if (event instanceof HttpResponse) {
            }
          },
          (err) => {
            console.log(err);
            if (err instanceof HttpErrorResponse) {
              this.handleError(err, newRequest, next);
            }
          }
        ),
        catchError((e: any) => {
          console.log(e.status);
          return throwError(e);
        })
      );
    } else {
      this._base.openSnackBar('Internet not connected', 'error');
      return throwError({ message: 'Internet not connected' });
    }
  }

  private continueWithoutAuth(
    request: HttpRequest<any>,
    next: HttpHandler,
    globalHeaders: any
  ): Observable<any> {
    request = request.clone({
      setHeaders: globalHeaders,
    });
    return next.handle(request).pipe(
      tap(
        (event: any) => {
          if (request.method != 'GET' && event['body']) {
            // this._base.openSnackBarSuccess(event['body'].message);
          }
        },
        (err) => {
          if (err instanceof HttpErrorResponse) {
            this.handleError(err);
          }
        }
      )
    );
  }

  private handleError(
    error: HttpErrorResponse,
    newRequest?: HttpRequest<any>,
    next?: HttpHandler
  ) {
    if (error.error instanceof ErrorEvent) {
      this._base.openSnackBar(error.error?.message, 'error');
    } else {
      if (error.status === 401) {
        this.router.navigate(['authentication/login']);
        // this.handleRefresh(newRequest!, next!);
      }

      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }

    return throwError(error);
  }
}
