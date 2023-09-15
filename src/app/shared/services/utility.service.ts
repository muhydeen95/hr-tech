import { Toastr } from '@GlobalService/toastr.service';
import { Injectable, Output, EventEmitter } from '@angular/core';
import { saveAs } from "file-saver";

@Injectable({
  providedIn: 'root',
})
export class UtilityService {
  @Output() selectedFiles: EventEmitter<File[]> = new EventEmitter();
  constructor(private _toastr: Toastr) {}

  public emitUploadFiles(selectedFiles: File[]) {
    this.selectedFiles.emit(selectedFiles);
  }

  public byteToFile(data: string, fileName: string, mimeType?: BlobPropertyBag) {
    if (data != undefined) {
      const byteString = atob(data);
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      const bb = new Blob([ab]);
      try {
        const file = new File([bb], fileName, mimeType);
        // window.navigator.msSaveBlob(file, fileName);
        saveAs(file);
      } catch (err) {
        const textFileAsBlob = new Blob([bb], mimeType);
        // window.navigator.msSaveBlob(textFileAsBlob, fileName);
        console.log(textFileAsBlob);
      }
    } else {
      this._toastr.showError("Unable to download data", "error");
    }
  }


}
