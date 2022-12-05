import {
  Component,
  OnInit,
  OnChanges,
  OnDestroy,
  ChangeDetectorRef,
  Input,
} from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-file-viewer',
  templateUrl: './file-viewer.component.html',
  styleUrls: ['./file-viewer.component.scss'],
})
export class FileViewerComponent implements OnInit, OnChanges, OnDestroy {
  private sub: Subscription = new Subscription();
  public sanitizedUrl!: any;
  public hasSanitized: boolean = false;
  public isProcessingBinaries: boolean = false;
  public fileTypeEnum = fileTypeEnum;
  public currentViewingFileIndex: number = 0;
  @Input() files: file[] = [];
  @Input() jumpToIndex: number = this.currentViewingFileIndex;
  constructor(
    private _cd: ChangeDetectorRef,
    private _sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.getFileType();
  }

  ngOnChanges(changes: any): void {
    this.checkFileTypeAndDisplay(changes);
    this.currentViewingFileIndex = this.jumpToIndex;
  }

  public getFileType() {
    let item = this.files.filter((f: any) => {
      let fileType = f.name.split('.')[1];
      return (f.fileType = fileType);
    });
    this.files = item;
    this.prependType();
  }

  public checkFileTypeAndDisplay(changes: any): void {
    this.isProcessingBinaries = true;
    if (!Util.isNullOrUndefined(changes.files)) {
      this.files = changes.files.currentValue;
      if (
        this.files != null &&
        this.files != undefined &&
        this.files.length > 0
      ) {
        this.getFileType();
        // this.prependType();
      } else {
        this.isProcessingBinaries = false;
      }
    }
  }

  public prependType(): void {
    let dataPrefix = '';
    let suffix = '';
    // console.log(
    //   this.files[this.currentViewingFileIndex].fileType?.toLowerCase()
    // );
    if (
      this.files[this.currentViewingFileIndex].fileType?.toLowerCase() ===
        fileTypeEnum.PPT ||
      this.files[this.currentViewingFileIndex].fileType?.toLowerCase() ===
        fileTypeEnum.PPTX ||
      this.files[this.currentViewingFileIndex].fileType?.toLowerCase() ===
        fileTypeEnum.DOC ||
      this.files[this.currentViewingFileIndex].fileType?.toLowerCase() ===
        fileTypeEnum.DOCX ||
      this.files[this.currentViewingFileIndex].fileType?.toLowerCase() ===
        fileTypeEnum.EXCEL ||
      this.files[this.currentViewingFileIndex].fileType?.toLowerCase() ===
        fileTypeEnum.XLS
    ) {
      dataPrefix = 'https://docs.google.com/gview?url=';
      suffix = '&embedded=true';

      this.sanitizedUrl = this._sanitizer.bypassSecurityTrustResourceUrl(
        `${dataPrefix}${this.files[this.currentViewingFileIndex].path}${suffix}`
      );
    } else {
      if (
        this.files[this.currentViewingFileIndex].fileType?.toLowerCase() ===
        fileTypeEnum.PDF
      ) {
        dataPrefix = 'data:application/PDF;base64';
      } else if (
        this.files[this.currentViewingFileIndex].fileType?.toLowerCase() ===
        fileTypeEnum.GIF
      ) {
        dataPrefix = 'data:image/gif;base64';
      } else {
        dataPrefix = 'data:image/png;base64';
      }

      this.sanitizedUrl = this._sanitizer.bypassSecurityTrustResourceUrl(
        `${dataPrefix},${this.files[this.currentViewingFileIndex].base64String}`
      );
      // console.log(this.sanitizedUrl);
    }

    this._cd.detectChanges();
    this.isProcessingBinaries = false;
    this.hasSanitized = true;
  }

  public sanitizeUrl(url: any): SafeUrl {
    return this._sanitizer.bypassSecurityTrustResourceUrl(url);
  }
  public goBack(): void {
    this.currentViewingFileIndex = this.currentViewingFileIndex - 1;
    this.ngOnChanges({
      files: { currentValue: this.files, previousValue: this.files },
    });
  }
  public goForward(): void {
    this.currentViewingFileIndex = this.currentViewingFileIndex + 1;
    this.ngOnChanges({
      files: { currentValue: this.files, previousValue: this.files },
    });
  }

  ngOnDestroy() {
    this.sanitizedUrl = '';
    this.sub.unsubscribe();
  }
}

export interface file {
  fileType: string;
  base64String: string;
  name: string;
  path: string;
  uniqueName: string;
  url: string;
}

export enum fileTypeEnum {
  PDF = 'pdf',
  GIF = 'gif',
  PNG = 'png',
  JPG = 'jpg',
  JPEG = 'jpeg',
  IMG = 'img',
  DOC = 'doc',
  DOCX = 'docx',
  PPT = 'ppt',
  PPTX = 'pptx',
  EXCEL = 'xlsx',
  XLS = 'xls',
}

export class Util {
  static isNullOrUndefined<T>(
    obj: T | null | undefined
  ): obj is null | undefined {
    return typeof obj === 'undefined' || obj === null;
  }
}
