import {
  confirmEmail,
  ForgotPassswordDTO,
  LoginRequestDTO,
  LoginResponseDTO,
  RegisterRequestDTO,
  ResendLink,
  ResetPasswordDTO,
} from './../models/auth.model';
import { Injectable } from '@angular/core';
import { HttpService } from '@shared/services/http.service';
import { ResponseModel } from 'app/models/response.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpService) {}

  public login(
    loginRequestDTO: LoginRequestDTO
  ): Observable<ResponseModel<LoginResponseDTO>> {
    const endpoint = 'CustomerAuth/login';
    return this.http.makeRequestWithData('post', endpoint, {}, loginRequestDTO);
  }

  public register(
    registerRequestDTO: RegisterRequestDTO
  ): Observable<ResponseModel<RegisterRequestDTO>> {
    const endpoint = 'CustomerAuth/ext/sign-up';
    return this.http.makeRequestWithData(
      'post',
      endpoint,
      {},
      registerRequestDTO
    );
  }
  public forgotPassword(
    forgotPasswordRequestDTO: ForgotPassswordDTO
  ): Observable<ResponseModel<ForgotPassswordDTO>> {
    const endpoint = 'CustomerAuth/password-recovery';
    return this.http.makeRequestWithData(
      'post',
      endpoint,
      {},
      forgotPasswordRequestDTO
    );
  }
  public resetPassword(
    resetPasswordRequestDTO: ResetPasswordDTO
  ): Observable<ResponseModel<ResetPasswordDTO>> {
    const endpoint = 'CustomerAuth/reset-password';
    return this.http.makeRequestWithData(
      'post',
      endpoint,
      {},
      resetPasswordRequestDTO
    );
  }

  public verifyResendlink(
    email: ResendLink
  ): Observable<ResponseModel<ResendLink>> {
    const endpoint = `CustomerAuth/resend-confirmation-mail/${email}`;
    return this.http.makeRequestWithData(
      'post',
      endpoint,
      {},
    );
  }

  public confirmEmail(
    payload: confirmEmail
  ): Observable<ResponseModel<confirmEmail>> {
    const endpoint = 'CustomerAuth/confirm-email';
    return this.http.makeRequestWithData(
      'post',
      endpoint,
      {},
      payload
    );
  }


}
