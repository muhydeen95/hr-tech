import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  CustomerTransactionStatus,
  DocumentDTO,
} from 'app/documents/models/documents.model';
import { DocumentService } from 'app/documents/services/document.service';
import { DashboardService } from '../../../dashboard/services/dashboard.service';
import { ResponseModel } from 'app/models/response.model';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { BaseComponent } from '@core/base/base/base.component';
import { FileType } from 'app/application/components/application-form/components/final/models/filetype.model';
import { ViewDocumentDialogComponent } from 'app/documents/dialogs/view-document-dialog/view-document-dialog.component';
import { DialogModel } from '@shared/components/models/dialog.model';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-document-status',
  templateUrl: './document-status.component.html',
  styleUrls: ['./document-status.component.scss'],
})
export class DocumentStatusComponent implements OnInit {
  public toggled: boolean = false;
  public message: string = '';
  public attachmentLink: {
    name: string;
    path: string;
    uniqueName: string;
  } = {
    name: '',
    path: '',
    uniqueName: '',
  };
  public CustomerTransactionStatus = CustomerTransactionStatus;
  private sub: Subscription = new Subscription();
  public documentDetail: DocumentDTO =  {
    confidentialityLevel: 0,
    createdAt: '',
    dateCreated: '',
    documentType: '',
    fileSubmissionId: 0,
    files: [{
      fileType: 'img',
      base64String: '',
      name: '',
      path: '',
      uniqueName: '',
      url: '',
    }],
    subject: '',
    treatmentStatusId: '',
  };
  public loading: boolean = false;
  public docId: string = '';
  public isSearching: boolean = false;
  public jumpToSelectedFileIndex: number = 0;
  public fileType = FileType;

  public chats = [
    { id: 1, file: null, time: '2011-08-12T20:17:46.384Z', sender: 1,
      message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elit urna nulla aliquam quis metus facilisi nisi nullam. Sit enim mauris non sollicitudin suscipit viverra mi libero. Ornare.'
    },
    { id: 2, file: null, time: '2011-08-12T20:17:46.384Z', sender: 2,
      message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elit urna nulla aliquam quis metus facilisi nisi nullam. Sit enim mauris non sollicitudin suscipit viverra mi libero. Ornare.'
    },
    { id: 3, file: null, time: '2011-08-12T20:17:46.384Z', sender: 1,
      message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elit urna nulla aliquam quis metus facilisi nisi nullam. Sit enim mauris non sollicitudin suscipit viverra mi libero. Ornare.'
    },
    { id: 4, file: null, time: '2011-08-12T20:17:46.384Z', sender: 1,
      message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elit urna nulla aliquam quis metus facilisi nisi nullam. Sit enim mauris non sollicitudin suscipit viverra mi libero. Ornare.'
    },
    { id: 5, file: null, time: '2011-08-12T20:17:46.384Z', sender: 2,
      message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elit urna nulla aliquam quis metus facilisi nisi nullam. Sit enim mauris non sollicitudin suscipit viverra mi libero. Ornare.'
    },
    { id: 6, file: {name: 'attachment.pdf', size: '5.63MB', type: 'pdf' }, 
      time: '2011-08-12T20:17:46.384Z', sender: 1, message: ''
    },
    { id: 7, file: null, time: '2011-08-12T20:17:46.384Z', sender: 2,
      message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elit urna nulla aliquam quis metus facilisi nisi nullam. Sit enim mauris non sollicitudin suscipit viverra mi libero. Ornare.'
    },
    { id: 8, file: null, time: '2011-08-12T20:17:46.384Z', sender: 1,
      message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elit urna nulla aliquam quis metus facilisi nisi nullam. Sit enim mauris non sollicitudin suscipit viverra mi libero. Ornare.'
    },
    { id: 9, file: {name: 'attachment.pdf', size: '5.63MB', type: 'pdf' }, 
      time: '2011-08-12T20:17:46.384Z', sender: 2, message: ''
    },
    { id: 10, file: null, time: '2011-08-12T20:17:46.384Z', sender: 1,
      message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elit urna nulla aliquam quis metus facilisi nisi nullam. Sit enim mauris non sollicitudin suscipit viverra mi libero. Ornare.'
    },
  ]

  constructor(
    private _docService: DocumentService,
    private activatedRoute: ActivatedRoute,
    private dashboardService: DashboardService,
    private _popper: BaseComponent,
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    const param: any = this.activatedRoute.params;
    const searchQuery: any = this.activatedRoute.queryParams;
    this.docId = param['value'].id;
    this.isSearching = searchQuery['value'].isSearching;
    this.isSearching
      ? this.getSearchedDocument()
      : this.getDocumentDetail(this.docId);
  }

  public getDocumentDetail(id: string): void {
    this.loading = true;
    this.sub.add(
      this._docService.getDocumentByIdRequest(id).subscribe({
        next: (res: ResponseModel<DocumentDTO>) => {
          // console.log(res);
          this.loading = false;
          this.documentDetail = res.response;
        },
        error: (error: ResponseModel<null>) => {
          this.loading = false;
        },
      })
    );
  }

  public getSearchedDocument(): void {
    this.loading = true;
    this.dashboardService.getDocumentTracking(this.docId).subscribe({
      next: (res: ResponseModel<DocumentDTO>) => {
        this.loading = false;
        this.documentDetail = res.response;
      },
      error: (error: HttpErrorResponse) => {
        this.loading = false;
        console.log(error?.error?.message);
        this._popper.goBack();
        this._popper.openSnackBar(
          error?.error?.message || 'Unable to process your request',
          'error'
        );
      },
    });
  }

  handleSelection(event: any) {
    this.message += event.char;
  }

  getFileIndex(file: any) {
    let index = this.documentDetail.files.indexOf(file);
    this.jumpToSelectedFileIndex = index;
    this.viewFileDialog(
      { isEditing: false, editObject: {files: this.documentDetail.files, index: index}}
      )
  }

  public getFileType(fileType: string) {
    switch (true) {
      case fileType?.toLocaleLowerCase()?.includes(FileType.PDF):
        return 'assets/images/pdf.svg';
      case fileType?.toLocaleLowerCase()?.includes(FileType.WORD):
        return 'assets/images/word.svg';
      case fileType?.toLocaleLowerCase()?.includes(FileType.IMG):
        return 'assets/images/img.svg';
      case fileType?.toLocaleLowerCase()?.includes(FileType.EXCEL):
        return 'assets/images/xls.png';
      case fileType?.toLocaleLowerCase()?.includes(FileType.PPT):
        return 'assets/images/ppt.svg';
      case fileType?.toLocaleLowerCase()?.includes(FileType.PPTX):
        return 'assets/images/ppt.svg';
      default:
        return 'assets/images/img.svg';
    }
  }

  public viewFileDialog(
    payload: { isEditing?: boolean; editObject?: any } | any
  ): void {
    let object: DialogModel<any> = payload;
    // object.source = 'memo';
    const dialogRef = this.dialog.open(ViewDocumentDialogComponent, {
      // panelClass: 'modal-width',
      data: object,
    });
    dialogRef.componentInstance.event.subscribe((event: DialogModel<any>) => {
      if (event?.isEditing) {
      }
    });
  }

}
