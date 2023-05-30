import { Injectable } from '@angular/core';
import { HttpService } from '@shared/services/http.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FaqService {
  constructor(private http: HttpService) {}


  public getFaq(): Observable<any> {
    const endpoint = 'Category/all/faq';
    return this.http.getRequest(endpoint);
  }

}
