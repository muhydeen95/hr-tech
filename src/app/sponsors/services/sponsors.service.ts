import { Injectable } from '@angular/core';
import { HttpService } from '@shared/services/http.service';
import {
  ResponseModel,
} from 'app/models/response.model';
import { Observable } from 'rxjs';
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import { Sponsor } from 'app/contact/models/contact.model';

const EXCEL_TYPE =
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
const EXCEL_EXTENSION = ".xlsx";

@Injectable({
  providedIn: 'root',
})
export class SponsorsService {
  constructor(private http: HttpService) {}


  public getAllSponsors(): Observable<ResponseModel<Sponsor[]>> {
    const endpoint = 'sponsor';
    return this.http.getRequest(endpoint);
  }

  public getOneSponsor(
    id: string
  ): Observable<ResponseModel<Sponsor>> {
    const endpoint = `sponsor/getOneSponsor/${id}`;
    return this.http.getRequestWithParams(endpoint, {});
  }

  public addSponsor(
    payload: Sponsor
  ): Observable<ResponseModel<Sponsor>> {
    const endpoint = 'sponsor/create';
    return this.http.makeRequestWithData('post', endpoint, {}, payload);
  }

  public updateSponsor(
    payload: Sponsor
  ): Observable<ResponseModel<Sponsor>> {
    const endpoint = `sponsor/update-sponsor/${payload._id}`;
    return this.http.makeRequestWithData('put', endpoint, {}, payload);
  }

  public deleteSponsor(
    payload: Sponsor
  ): Observable<ResponseModel<Sponsor>> {
    const endpoint = `sponsor/delete/${payload._id}`;
    return this.http.makeRequestWithData('delete', endpoint, {});
  }

  public exportAllSponsors(): Observable<ResponseModel<Sponsor>> {
    const endpoint = 'sponsor/export';
    return this.http.getRequest(endpoint);
  }


  public exportAsExcelFile(json: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = {
      Sheets: { data: worksheet },
      SheetNames: ["data"],
    };
    const excelBuffer: any = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    FileSaver.saveAs(data, fileName + EXCEL_EXTENSION);
  }


}
