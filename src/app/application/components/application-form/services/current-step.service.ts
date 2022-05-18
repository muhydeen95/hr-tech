import { Injectable } from '@angular/core';
import { LocalStorageService } from '@shared/services/local-storage.service';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  INITIAL_FORM_DATA,
  lCApplicationDTO,
} from '../models/lc-application.model';

@Injectable({
  providedIn: 'root',
})
export class CurrentStepService {
  private initialFormData = INITIAL_FORM_DATA;
  private subject = new BehaviorSubject<number>(1);
  constructor(private localStorageAS: LocalStorageService) {}

  addRouteNumber(route_number: number) {
    this.subject.next(route_number);
  }

  clearRouteNumber() {
    this.subject.complete();
  }

  getRouteNumber(): Observable<number> {
    return this.subject.asObservable();
  }

  public storeCurrentStepData(applicationForm: lCApplicationDTO) {
    this.localStorageAS.set(
      'lc_application_form',
      JSON.stringify(applicationForm)
    );
  }

  public initializeNewForm() {
    this.localStorageAS.set(
      'lc_application_form',
      JSON.stringify(this.initialFormData)
    );
  }

  public clearFormFromStorage() {
    this.localStorageAS.remove('lc_application_form');
  }
}
