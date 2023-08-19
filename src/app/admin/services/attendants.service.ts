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
export class AttendantsService {
  constructor(private http: HttpService) {}


  public getAllAttendants(): Observable<ResponseModel<Attendant>> {
    const endpoint = 'attendants';
    return this.http.getRequest(endpoint);
  }

  public exportAllAttendants(): Observable<ResponseModel<Attendant>> {
    const endpoint = 'export';
    return this.http.getRequest(endpoint);
  }

}
