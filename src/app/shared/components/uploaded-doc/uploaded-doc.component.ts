import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { fileTypeEnum } from '../file-viewer/file-viewer.component';

@Component({
  selector: 'app-uploaded-doc',
  templateUrl: './uploaded-doc.component.html',
  styleUrls: ['./uploaded-doc.component.scss'],
})
export class UploadedDocComponent implements OnInit {
  @Input() file_name: string = '';
  @Input() type: string = '';
  @Input() file_size: number = 0;
  @Output() remove: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor() {}

  ngOnInit(): void {}

  public removeFile(): void {
    this.remove.emit(true);
  }

  public getFileType(): string {
    switch (true) {
      case this.type.toLocaleLowerCase().includes(fileTypeEnum.PDF):
        return 'assets/images/pdf.svg';
      case this.type.toLocaleLowerCase().includes(fileTypeEnum.DOC):
        return 'assets/images/word.svg';
      case this.type.toLocaleLowerCase().includes(fileTypeEnum.DOCX):
        return 'assets/images/word.svg';
      case this.type.toLocaleLowerCase().includes(fileTypeEnum.IMG):
        return 'assets/images/img.svg';
      case this.type.toLocaleLowerCase().includes(fileTypeEnum.EXCEL):
        return 'assets/images/xls.png';
      case this.type.toLocaleLowerCase()?.includes(fileTypeEnum.PPT):
        return 'assets/images/ppt.svg';
      case this.type?.toLocaleLowerCase()?.includes(fileTypeEnum.PPTX):
        return 'assets/images/ppt.svg';
      default:
        return 'assets/images/img.svg';
    }
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
