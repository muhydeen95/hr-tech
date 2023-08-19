import { HttpParams } from '@angular/common/http';
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
    const endpoint = 'create';
    return this.http.makeRequestWithData('post', endpoint, {}, addCompanyDetailDTO);
  }

  public getOneAttendant(
    id : string
  ): Observable<ResponseModel<any>> {
    const endpoint = 'getOneAttendant';
    const param = new HttpParams()
    .append('id', id )
    return this.http.getRequestWithParams(endpoint, param);
  }

  public makepayment(
    addCompanyDetailDTO: any
  ): Observable<ResponseModel<any>> {
    const endpoint = 'payment';
    return this.http.makeRequestWithData('post', endpoint, {}, addCompanyDetailDTO);
  }


  public confirmPayment(
    payload : any
  ): Observable<ResponseModel<any>> {
    const endpoint = 'payment-status';
    const param = new HttpParams()
    .append('id', payload.id )
    return this.http.makeRequestWithData('put', endpoint, param, payload);
  }

}
