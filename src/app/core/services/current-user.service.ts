import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LocalStorageService } from '@shared/services/local-storage.service';

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
    const filetra_token = JSON.parse(
      localStorage.getItem('filetra_token') || 'null'
    );
    // const currentUser = JSON.parse(
    //   localStorage.getItem('filetra_user_credential') || 'null'
    // );
    if (
      filetra_token !== null &&
      filetra_token !== undefined &&
      !this._jwt.isTokenExpired(filetra_token)
      // &&
      // currentUser !== undefined &&
      // currentUser !== null
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
   * @param filetra_token
   * @returns
   * TODO:
   * -Setup when you see the structure
   */

  public storeUserCredentials(responseData: any): void {
    const jwtData: any = this.decrypt_jwt(responseData.token);
    const data_to_store = {
      email: jwtData.email,
      role: jwtData.role,
      unique_name: jwtData.unique_name,
    };
    localStorage.setItem('user_credential', JSON.stringify(data_to_store));
    localStorage.setItem('filetra_token', JSON.stringify(responseData.token));
  }

  public storeUserDetails(userDetails: any) {
    const user_data_to_store = {
      firstName: userDetails.firstName,
      lastName: userDetails.lastName,
      email: userDetails.email,
      phoneNumber: userDetails.phoneNumber,
    };
    this.localStorageAS.set('filetra_user_details', user_data_to_store);
  }

  private decrypt_jwt(filetra_token: string): any {
    if (filetra_token) {
      const decoded = this._jwt.decodeToken(filetra_token);
      return decoded;
    }
    return null;
  }

  public getAuthToken(): string {
    const filetra_token = JSON.parse(
      localStorage.getItem('filetra_token') || 'null'
    );
    return filetra_token;
  }

  // public getUser(): Observable<ResponseModel> {
  //   return ;
  // }
}
