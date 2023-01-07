import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from '@shared/services/http.service';
import { ResponseModel } from 'app/models/response.model';
import { Observable } from 'rxjs';
import { AddFileSubmissionResponse, DocumentSearchDTO } from '../models/documents.model';
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

  public getFileSubmissionResponse(
    fileSubmissionResponseId: number
  ): Observable<ResponseModel<any>> {
    const endpoint = 'Internal/get-filesubmission-response';
    const formData: FormData = new FormData();
    formData.append('fileSubmissionResponseId', JSON.stringify(fileSubmissionResponseId));
    return this.http.makeRequestWithData('post', endpoint, {}, formData);
  }

  public addFileSubmissionResponse(
    payload: AddFileSubmissionResponse, fileItems: Array<File>
  ): Observable<ResponseModel<any>> {
    const endpoint = 'Internal/add-filesubmission-response';
    const formData: FormData = new FormData();
    formData.append('FileSubmissionId', JSON.stringify(payload.FileSubmissionId));
    formData.append('Message', payload.Message);
    formData.append('Type', JSON.stringify(payload.Type));
    fileItems.forEach((file) => {
      formData.append('Files', file, file.name);
    });
    return this.http.makeRequestWithData('post', endpoint, {}, formData);
  }
}
