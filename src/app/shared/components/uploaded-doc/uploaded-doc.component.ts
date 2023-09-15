import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { fileTypeEnum } from '@shared/models/file-type.model';

@Component({
  selector: 'app-uploaded-doc',
  templateUrl: './uploaded-doc.component.html',
  styleUrls: ['./uploaded-doc.component.scss'],
})
export class UploadedDocComponent implements OnInit {
  @Input() file_name: string = '';
  @Input() type: string = '';
  @Input() file_size: number = 0;
  @Input() canClose: boolean = true;
  @Output() remove: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor() {}

  ngOnInit(): void {}

  public removeFile(): void {
    this.remove.emit(true);
  }


  public getFileType(type: string): string {
    let iconPath;
    switch (true) {
      case type.toLocaleLowerCase().includes(fileTypeEnum.PDF):
        iconPath = 'assets/images/pdf.svg';
      break;
      case type.toLocaleLowerCase().includes(fileTypeEnum.DOC):
        iconPath = 'assets/images/word.svg';
      break;
      case type.toLocaleLowerCase().includes(fileTypeEnum.DOCX):
        iconPath = 'assets/images/word.svg';
      break;
      case type.toLocaleLowerCase().includes(fileTypeEnum.IMG):
        iconPath = 'assets/images/img.svg';
      break;
      case type.toLocaleLowerCase().includes(fileTypeEnum.EXCEL):
        iconPath = 'assets/images/xls.png';
      break;
      case type.toLocaleLowerCase()?.includes(fileTypeEnum.PPT):
        iconPath = 'assets/images/ppt.svg';
      break;
      case type?.toLocaleLowerCase()?.includes(fileTypeEnum.PPTX):
        iconPath = 'assets/images/ppt.svg';
      break;
      default:
        iconPath = 'assets/images/img.svg';
    }
    return iconPath;
  }

  public formatBytes(decimals = 2): string {
    if (this.file_size === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(this.file_size) / Math.log(k));
    return (
      parseFloat((this.file_size / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
    );
  }
}
