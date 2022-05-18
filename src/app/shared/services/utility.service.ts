import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilityService {
  constructor() {}

  //Custom functions will go here
  public covertDateToIsoString(date: any): Date {
    return new Date(date);
  }
}
