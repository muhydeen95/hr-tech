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
  public userChats = [
    {
      id: 1,
      user: 'recipient',
      message: 'Lorem ipsum dolor sit amet,',
      time: '2:00pm',
    },
    {
      id: 2,
      user: 'sender',
      message: 'Lorem ipsum dolor sit amet,',
      time: '2:05pm',
    },
    {
      id: 3,
      user: 'recipient',
      message:
        'Programming is the process of creating a set of instructions that tell a computer how to perform a task. Programming can be done using a variety of computer programming languages, such as JavaScript, Python, and C++.,',
      time: '2:10pm',
    },
    {
      id: 4,
      user: 'recipient',
      message:
        'that tell a computer how an be done using a variety of computer programming languages, such as JavaScript, Python, and C++.,',
      time: '2:12pm',
    },
    {
      id: 5,
      user: 'sender',
      message:
        'that tell a computer how an be done using a variety of computer programming languages, such as JavaScript, Python, and C++.,',
      time: '2:35pm',
    },
    {
      id: 6,
      user: 'recipient',
      message:
        'that tell a computer how an be done using a variety of computer programming languages, such as JavaScript, Python, and C++.,',
      time: '2:35pm',
    },
    {
      id: 7,
      user: 'sender',
      message:
        'that tell a computer how an be done using a variety of computer programming languages, such as JavaScript, Python, and C++.,',
      time: '2:35pm',
    },
  ];
  public CustomerTransactionStatus = CustomerTransactionStatus;
  private sub: Subscription = new Subscription();
  public documentDetail: DocumentDTO =  {
    confidentialityLevel: 0,
    createdAt: '',
    dateCreated: '',
    documentType: '',
    fileSubmissionId: 0,
    files: [{
      fileType: '',
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

  constructor(
    private _docService: DocumentService,
    private activatedRoute: ActivatedRoute,
    private dashboardService: DashboardService,
    private _popper: BaseComponent
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

}
