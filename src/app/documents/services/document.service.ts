import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from '@shared/services/http.service';
import { ResponseModel } from 'app/models/response.model';
import { Observable } from 'rxjs';
import { DocumentSearchDTO } from '../models/documents.model';
@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  constructor(private http: HttpService, client: HttpClient) {}

  //Get document by ID
  public getDocumentByIdRequest(id: string): Observable<ResponseModel<any>> {
    const endpoint = 'IncomingMail/get-customer-submission/' + id;
    return this.http.getRequest(endpoint);
  }

  public getDocument(
    query: Partial<DocumentSearchDTO>
  ): Observable<ResponseModel<any>> {
    const endpoint = 'IncomingMail/get-all-customer-submissions';
    return this.http.makeRequestWithData('post', endpoint, {}, query);
  }
}
