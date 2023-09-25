import { Injectable } from '@angular/core';
import { HttpService } from '@shared/services/http.service';
import {
  ResponseModel,
} from 'app/models/response.model';
import { Observable } from 'rxjs';
import { Sponsor } from 'app/contact/models/contact.model';


@Injectable({
  providedIn: 'root',
})
export class QrConfirmationService {
  constructor(private http: HttpService) {}

  public confirmUserCode(
    payload: {token: number, id: string}
  ): Observable<ResponseModel<Sponsor>> {
    const endpoint = 'attendant/confirm-token';
    return this.http.makeRequestWithData('post', endpoint, {}, payload);
  }



}
