import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from '@shared/services/http.service';
import {
  Attendant,
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
export class AttendantsService {
  constructor(private http: HttpService) {}


  public getAllAttendants(): Observable<ResponseModel<Attendant[]>> {
    const endpoint = 'attendant';
    return this.http.getRequest(endpoint);
  }

  public exportAllAttendants(): Observable<ResponseModel<Attendant>> {
    const endpoint = 'attendant/export';
    return this.http.getRequest(endpoint);
  }

  public getAttendantWithPaymentStatus(
    status: boolean
  ): Observable<ResponseModel<Attendant[]>> {
    const endpoint = 'attendant/attendantByStatus';
    const param = new HttpParams()
    .set('status', status);
    return this.http.getRequestWithParams(endpoint, param);
  }

  public sendpaymentReminder(
    id: string
  ): Observable<ResponseModel<any>> {
    const endpoint = `payment/payment-reminder/${id}`;
    return this.http.makeRequestWithData('post', endpoint, {});
  }

  public sendprofileCard(
    id: string
  ): Observable<ResponseModel<any>> {
    const endpoint = `payment/send-profile-card/${id}`;
    return this.http.makeRequestWithData('post', endpoint, {});
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
