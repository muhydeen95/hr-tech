import { Injectable } from '@angular/core';
import { HttpService } from '@shared/services/http.service';
import {
  ResponseModel,
} from 'app/models/response.model';
import { Observable } from 'rxjs';
import { ContactDTO } from '../models/contact.model';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  constructor(private http: HttpService) {}


  public contactUs(
    addCompanyDetailDTO: ContactDTO
  ): Observable<ResponseModel<ContactDTO>> {
    const endpoint = 'Services/update/contact/us';
    return this.http.makeRequestWithData('post', endpoint, {}, addCompanyDetailDTO);
  }

}
