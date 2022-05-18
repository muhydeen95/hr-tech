import { Injectable } from '@angular/core';
import { HttpService } from '@shared/services/http.service';
import { ResponseModel } from 'app/models/response.model';
import { Observable } from 'rxjs';
import { UploadDocDTO } from '../models/dashboard.model';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private http: HttpService) {}

  public uploadDocumentRequest(
    payload: UploadDocDTO
  ): Observable<ResponseModel<UploadDocDTO>> {
    const formData = new FormData();
    Object.entries(payload).forEach(([key, value]) => {
      if (key != 'Files') {
        formData.set(key, value);
      }
    });
    payload.Files.forEach((file) => {
      formData.append('Files', file, file.name);
    });
    const endpoint = 'incomingmail/customer-create';
    return this.http.makeRequestWithData('post', endpoint, {}, formData);
  }

  public getDocumentTypesRequest(payload: any): Observable<ResponseModel<any>> {
    const endpoint = 'documentType/get-document-types';
    return this.http.makeRequestWithData('post', endpoint, {}, payload);
  }

  public getCustomerDashboard(): Observable<ResponseModel<any>> {
    const endpoint = 'IncomingMail/get-customer-dashboard';
    return this.http.getRequest(endpoint);
  }
  public getDocumentTracking(
    correspondenceNumber: any
  ): Observable<ResponseModel<any>> {
    const endpoint = 'IncomingMail/track-customer-file-submission';
    return this.http.makeRequestWithData(
      'post',
      endpoint,
      {},
      { correspondenceNumber }
    );
  }
}
