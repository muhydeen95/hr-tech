import { HttpErrorResponse } from '@angular/common/http';
import {
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseComponent } from '@core/base/base/base.component';
import { DialogModel } from '@shared/components/models/dialog.model';
import { DocTypeDTO, UploadDocDTO } from 'app/dashboard/models/dashboard.model';
import { DashboardService } from 'app/dashboard/services/dashboard.service';
import {
  InitialSearchDTO,
  ResponseModel,
  SearchDTO,
} from 'app/models/response.model';

@Component({
  selector: 'app-upload-document',
  templateUrl: './upload-document.component.html',
  styleUrls: ['./upload-document.component.scss'],
})
export class UploadDocumentComponent implements OnInit {
  @ViewChild('close') close!: ElementRef;
  @Output() event: EventEmitter<{
    editObj: UploadDocDTO;
    isEditing?: boolean;
  }> = new EventEmitter<{ editObj: UploadDocDTO; isEditing?: boolean }>();
  @Output() isUploaded: EventEmitter<boolean> = new EventEmitter<boolean>();
  public AcceptedFileTypes: string = 'application/PDF';
  public fileNames: Array<string> = [];
  public uploadForm!: UntypedFormGroup;
  public isLoading: boolean = false;
  public uploadFormSubmitted: boolean = false;
  public error_message: string = '';
  public showPassword: boolean = false;
  public gettingDocTypes: boolean = true;
  public gettingDept: boolean = true;
  public searchQuery: SearchDTO = { ...InitialSearchDTO, pageSize: 50 };
  public gettingDocTypesFailed: boolean = false;
  public gettingDeptFailed: boolean = false;
  public docTypes: Array<DocTypeDTO> = [];
  public receivingDepts: Array<any> = [];
  public files: File[] = [];
  constructor(
    private fb: UntypedFormBuilder,
    private _base: BaseComponent,
    private dashboardService: DashboardService,
    @Inject(MAT_DIALOG_DATA) public data: DialogModel<UploadDocDTO>
  ) {}

  ngOnInit(): void {
    this.initUploadForm();
    this.getDocumentTypes();
    this.getReceivingDepts();
  }

  public getDocumentTypes(): void {
    this.gettingDocTypes = true;
    this.dashboardService.getDocumentTypesRequest(this.searchQuery).subscribe({
      next: (res: ResponseModel<any>) => {
        this.gettingDocTypes = false;
        this.docTypes = res.response['result'];
      },
      error: (error: HttpErrorResponse) => {
        this.gettingDocTypes = false;
        this.gettingDocTypesFailed = true;
        this.error_message = error?.error?.message;
      },
    });
  }

  public getReceivingDepts(): void {
    this.gettingDept = true;
    this.dashboardService.getReceivingMailDepartments(this.searchQuery).subscribe({
      next: (res: ResponseModel<any>) => {
        this.gettingDept = false;
        this.receivingDepts = res.response['result'];
      },
      error: (error: HttpErrorResponse) => {
        this.gettingDept = false;
        this.gettingDeptFailed = true;
        this.error_message = error?.error?.message;
      },
    });
  }

  initUploadForm() {
    this.uploadForm = this.fb.group({
      DocumentType: ['', Validators.required],
      SubjectMatter: ['', Validators.required],
      Files: ['', Validators.required],
      DepartmentId: ['', Validators.required],
    });
  }

  public uploadDocument(): void {
    this.uploadFormSubmitted = true;
    if (this.uploadForm.valid) {
      this.isLoading = true;
      this.dashboardService
        .uploadDocumentRequest(this.uploadForm.value)
        .subscribe({
          next: (res: ResponseModel<UploadDocDTO>) => {
            this.isLoading = false;
            this.uploadFormSubmitted = false;
            this.event.emit({
              editObj: this.uploadForm.value,
            });
            this.isUploaded.emit(true);
            this.close.nativeElement.click();
            this._base.openSnackBar(
              'Document uploaded successfully',
              'success'
            );
          },
          error: (error: HttpErrorResponse) => {
            this.isLoading = false;
            this.uploadFormSubmitted = true;
            this.error_message = error?.error?.message;
          },
        });
    }
  }
  public addFilesToList = (newFiles: any) => {
    for (let i = 0; i < newFiles.length; i++) {
      this.files.includes(newFiles[i]) ? null : this.files.push(newFiles[i]);
    }
    this.uploadForm.patchValue({
      Files: this.files,
    });
  };
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
    this.uploadForm.patchValue({
      Files: this.files,
    });
  }
}
