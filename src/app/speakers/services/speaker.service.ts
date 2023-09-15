import { Injectable } from '@angular/core';
import { HttpService } from '@shared/services/http.service';
import {
  Speaker,
  ResponseModel,
} from 'app/models/response.model';
import { Observable } from 'rxjs';
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

const EXCEL_TYPE =
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
const EXCEL_EXTENSION = ".xlsx";

@Injectable({
  providedIn: 'root',
})
export class SpeakersService {
  constructor(private http: HttpService) {}


  public getAllSpeakers(): Observable<ResponseModel<Speaker[]>> {
    const endpoint = 'speaker';
    return this.http.getRequest(endpoint);
  }

  public getOneSpeaker(
    id: string
  ): Observable<ResponseModel<Speaker>> {
    const endpoint = `speaker/getOneSpeaker/${id}`;
    return this.http.getRequestWithParams(endpoint, {});
  }

  public addSpeaker(
    payload: Speaker
  ): Observable<ResponseModel<Speaker>> {
    const endpoint = 'speaker/create';
    return this.http.makeRequestWithData('post', endpoint, {}, payload);
  }

  public updateSpeaker(
    payload: Speaker
  ): Observable<ResponseModel<Speaker>> {
    const endpoint = `speaker/update-speaker/${payload._id}`;
    return this.http.makeRequestWithData('put', endpoint, {}, payload);
  }

  public deleteSpeaker(
    payload: Speaker
  ): Observable<ResponseModel<Speaker>> {
    const endpoint = `speaker/delete/${payload._id}`;
    return this.http.makeRequestWithData('delete', endpoint, {});
  }

  public exportAllSpeakers(): Observable<ResponseModel<Speaker>> {
    const endpoint = 'Speaker/export';
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
