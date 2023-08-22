// import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from '@shared/services/http.service';
import {
  Attendant,
  ResponseModel,
} from 'app/models/response.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  constructor(private http: HttpService) {}


  public createAttendant(
    addCompanyDetailDTO: Attendant
  ): Observable<ResponseModel<Attendant>> {
    const endpoint = 'attendant/register';
    return this.http.makeRequestWithData('post', endpoint, {}, addCompanyDetailDTO);
  }

  public getOneAttendant(
    id : string | null
  ): Observable<ResponseModel<any>> {
    const endpoint = `attendant/getOneAttendant/${id}`;
    return this.http.getRequest(endpoint);
  }

  public makepayment(
    addCompanyDetailDTO: any
  ): Observable<ResponseModel<any>> {
    const endpoint = 'payment/makePayment';
    return this.http.makeRequestWithData('post', endpoint, {}, addCompanyDetailDTO);
  }


  public confirmPayment(
    payload : any
  ): Observable<ResponseModel<any>> {
    const endpoint = `payment/payment-status/${payload.id}`;
    return this.http.makeRequestWithData('put', endpoint, {}, payload);
  }

}
