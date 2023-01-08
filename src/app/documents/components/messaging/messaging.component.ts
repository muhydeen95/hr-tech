import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { fileTypeEnum } from '@shared/components/file-viewer/file-viewer.component';
import { DialogModel } from '@shared/components/models/dialog.model';
import { ViewDocumentDialogComponent } from 'app/documents/dialogs/view-document-dialog/view-document-dialog.component';
import { DocumentService } from 'app/documents/services/document.service';
import { ResponseModel } from 'app/models/response.model';

@Component({
  selector: 'app-messaging',
  templateUrl: './messaging.component.html',
  styleUrls: ['./messaging.component.scss'],
})
export class MessagingComponent implements OnInit {
  public open_smiley: boolean = false;
  public toggled: boolean = false;
  @Input() messages: any[] = [];
  public filteredMessages: any[] = [];
  public files: File[] = [];
  @Input() fileSubmissionId!: number;
  public chatForm!: UntypedFormGroup;
  @Input() resLoading: boolean = false;
  public isLoading: boolean = false;
  public failed: boolean = false;
  public user!: any;
  public retryPayload: any;
  public retryFiles: File[] = [];

  constructor(
    private fb: UntypedFormBuilder,
    private _documentService: DocumentService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user_credential') || '');
    console.log(this.user);
    this.groupMessages();
    this.initChatForm();
  }

  initChatForm() {
    this.chatForm = this.fb.group({
      FileSubmissionId: [this.fileSubmissionId, Validators.required],
      Message: ['', Validators.required],
      Type: [2, Validators.required],
      Files: [[]],
    });
  }

  public groupMessages() {
    const groups = this.messages.reduce((groups: any, messages: any) => {
      const date = messages.dateSent.split('T')[0];
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(messages);
      return groups;
    }, {});

    // Edit: to add it in the array format instead
    const groupArrays = Object.keys(groups).map((date) => {
      return {
        date,
        messages: groups[date],
      };
    });
    this.filteredMessages = groupArrays;
  }

  public getFileType(fileName: string): string {
    let type = fileName.split('.')[1];
    switch (true) {
      case type.toLocaleLowerCase().includes(fileTypeEnum.PDF):
        return 'assets/images/pdf.svg';
      case type.toLocaleLowerCase().includes(fileTypeEnum.DOCX):
        return 'assets/images/word.svg';
      case type.toLocaleLowerCase().includes(fileTypeEnum.DOC):
        return 'assets/images/word.svg';
      case type.toLocaleLowerCase().includes(fileTypeEnum.IMG):
        return 'assets/images/img.svg';
      case type.toLocaleLowerCase().includes(fileTypeEnum.EXCEL):
        return 'assets/images/xls.png';
      case type.toLocaleLowerCase()?.includes(fileTypeEnum.PPT):
        return 'assets/images/ppt.svg';
      case type?.toLocaleLowerCase()?.includes(fileTypeEnum.PPTX):
        return 'assets/images/ppt.svg';
      default:
        return 'assets/images/img.svg';
    }
  }

  public isYesterday(someDateTimeStamp: any) {
    var dt = new Date(someDateTimeStamp),
      date = dt.getDate(),
      diffDays = new Date().getDate() - date,
      diffMonths = new Date().getMonth() - dt.getMonth(),
      diffYears = new Date().getFullYear() - dt.getFullYear();

    if (diffYears === 0 && diffDays === 0 && diffMonths === 0) {
      return 'Today';
    } else if (diffYears === 0 && diffDays === 1) {
      return 'Yesterday';
    } else {
      return someDateTimeStamp;
    }
  }

  public addFilesToList = (newFiles: any) => {
    for (let i = 0; i < newFiles.length; i++) {
      this.files.includes(newFiles[i]) ? null : this.files.push(newFiles[i]);
    }
  };

  public dragOverHandler(ev: any): void {
    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();
    ev.stopPropagation();
  }

  public onFileDropped(event: any) {
    if (event.target.files.length > 0) {
      this.addFilesToList(event.target.files);
    }
  }

  public removeFile(index: number): void {
    this.files.splice(index, 1);
  }

  public dropHandler(ev: any): void {
    ev.preventDefault();
    ev.stopPropagation();

    if (ev.dataTransfer.items) {
      for (var i = 0; i < ev.dataTransfer.items.length; i++) {
        if (ev.dataTransfer.items[i].kind === 'file') {
          this.addFilesToList(ev.dataTransfer.files);
        }
      }
    } else {
      for (var i = 0; i < ev.dataTransfer.files.length; i++) {
        this.addFilesToList(ev.dataTransfer.files);
      }
    }
  }

  public getFileIndex(files: any, file: any) {
    let index = files.indexOf(file);
    this.viewFileDialog({
      isEditing: false,
      editObject: { files: files, index: index, source: 'chat' },
    });
  }

  public viewFileDialog(
    payload: { isEditing?: boolean; editObject?: any } | any
  ): void {
    let object: DialogModel<any> = payload;
    const dialogRef = this.dialog.open(ViewDocumentDialogComponent, {
      // panelClass: 'dialog-width',
      data: object,
      position: { left: '5rem', top: '1rem' },
    });
    dialogRef.componentInstance.event.subscribe((event: DialogModel<any>) => {
      if (event?.isEditing) {
      }
    });
  }

  emojiClick(event: any) {
    console.log(event);
    // if (this.cinput) {
    //   this.cinput.nativeElement.innerHTML += event.emoji.native;
    //   this.chatInput();
    // }
  }

  public checkForKeyEnter(event: KeyboardEvent): void {
    var key = event.key || event.keyCode;
    if (key == 'Enter' || key == 8) {
      this.submit();
    }
  }

  public submit(): void {
    if (this.chatForm.valid) {
      this.isLoading = true;
      this.failed = false;
      const payload = this.chatForm.value;
      this.retryPayload = payload;
      this.retryFiles = this.files;
      const Files = this.files;
      let files: any = [];
      this.files.map((file: File) => {
        files.push({
          fileName: file.name,
          filePath: '',
          fileSubmissionResponseAttachmentId: 0,
          fileSubmissionResponseId: this.fileSubmissionId,
        });
      });
      payload.Files = files;
      const message = {
        dateSent: new Date().toISOString(),
        fileSubmissionId: this.fileSubmissionId,
        fileSubmissionResponseAttachments: files,
        type: 2,
        fileSubmissionResponseId: 0,
        message: payload.Message,
        sender: null,
      };
      this.files = [];
      this.chatForm.patchValue({
        Message: '',
      });
      this.isLoading = false;
      this.messages.push(message);
      this.groupMessages();
      this._documentService
        .addFileSubmissionResponse(payload, Files)
        .subscribe({
          next: (res: ResponseModel<any>) => {
            this.isLoading = false;
            this.failed = false;
            this.initChatForm();
          },
          error: (error: HttpErrorResponse) => {
            this.isLoading = false;
            this.failed = true;
          },
      });
    }
  }

  retryFailedSubmit() {
    this.failed = false;
    return this._documentService
    .addFileSubmissionResponse(this.retryPayload, this.retryFiles)
    .subscribe({
      next: (res: ResponseModel<any>) => {
        this.isLoading = false;
        this.failed = false;
        this.initChatForm();
      },
      error: (error: HttpErrorResponse) => {
        this.isLoading = false;
        this.failed = true;
      },
  });
  }

}
