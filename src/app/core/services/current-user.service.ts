import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LocalStorageService } from '@shared/services/local-storage.service';
// import { ResponseModel } from 'app/models/response.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CurrentUserService {
  constructor(
    private localStorageAS: LocalStorageService,
    private _jwt: JwtHelperService,
    private router: Router
  ) {}

  public logOut(): void {
    localStorage.clear();
    this.localStorageAS.clear();
    this.router.navigate(['authentication/login']);
  }

  public isLoggedIn(): boolean {
    const token = JSON.parse(
      localStorage.getItem('token') || 'null'
    );

    if (
      token !== null &&
      token !== undefined &&
      !this._jwt.isTokenExpired(token)
    ) {
      return true;
    }
    return false;
  }

  public getUserDetails(): any {
    return this.decrypt_jwt(this.getAuthToken());
  }

  /**
   *
   * @param token
   * @returns
   * TODO:
   * -Setup when you see the structure
   */

  public storeUserCredentials(responseData: any): void {
    const jwtData: any = this.decrypt_jwt(responseData);
    const data_to_store = {
      email: jwtData.email,
      id: jwtData.id,
    };
    localStorage.setItem('user_credential', JSON.stringify(data_to_store));
    localStorage.setItem('token', JSON.stringify(responseData));
  }

  public storeUserDetails(userDetails: any) {
    const user_data_to_store = {
      organizationName: userDetails.organizationName,
      email: userDetails.email,
      id: userDetails._id,
    };
    this.localStorageAS.set('GOS_user_details', user_data_to_store);
  }

  private decrypt_jwt(token: string): any {
    if (token) {
      const decoded = this._jwt.decodeToken(token);
      return decoded;
    }
    return null;
  }

  public getAuthToken(): string {
    const token = JSON.parse(
      localStorage.getItem('token') || 'null'
    );
    return token;
  }

  public getUser(): Observable<any> {
    return JSON.parse(localStorage.getItem('GOS_user_details') || 'null');
  }
}
