// import { HttpParams } from '@angular/common/http';
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

  public getIpAddress(): Observable<ResponseModel<any>> {
    return this.http.getIpRequest('?format=json');
  }

  public createAttendant(
    addCompanyDetailDTO: Attendant
  ): Observable<ResponseModel<Attendant>> {
    const endpoint = 'attendant/register';
    return this.http.makeRequestWithData('post', endpoint, {}, addCompanyDetailDTO);
  }

  public getTrainingById(
    payload: any
  ): Observable<any> {
    const params = new HttpParams()
    .set("ip", payload.ip)
    .set("friendly_name", payload.friendly_name )
    .set("trainingId", payload.trainingId );
    const endpoint = `training/get/trainings`;
    return this.http.getGodpRequestWithParams(endpoint, params);
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

  public registerEvent(
    payload: any
  ): Observable<any> {
    const endpoint = 'Registration/add/update/training';
    return this.http.makeRequestWithGodpData('post', endpoint, {}, payload);
  }

}
