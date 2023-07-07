import { Injectable } from '@angular/core';
import { HttpService } from '@shared/services/http.service';
import {
  ResponseModel,
} from 'app/models/response.model';
import { Observable } from 'rxjs';
import { SubscribeDTO } from '../models/unsubscribe.model';

@Injectable({
  providedIn: 'root',
})
export class UnsubscribeService {
  constructor(private http: HttpService) {}


  public unsubscribeEmail(
    email: string
  ): Observable<ResponseModel<SubscribeDTO>> {
    const endpoint = `Services/delete/service/provider/email?email=${email}`;
    return this.http.getRequest(endpoint);
  }

}
