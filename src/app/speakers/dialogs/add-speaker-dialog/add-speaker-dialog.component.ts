import { DialogModel } from '@shared/components/models/dialog.model';
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
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Toastr } from '@GlobalService/toastr.service';
import { SpeakersService } from 'app/speakers/services/speaker.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Speaker } from 'app/models/response.model';

@Component({
  selector: 'app-add-speaker-dialog',
  templateUrl: './add-speaker-dialog.component.html',
  styleUrls: ['./add-speaker-dialog.component.scss']
})
export class AddSpeakerDialogComponent implements OnInit {
  public sub: Subscription = new Subscription();
  @ViewChild('inputFile') public inputFile!: ElementRef;
  @ViewChild('close') close!: ElementRef;
  public speakerForm!: FormGroup;
  public isLoading: boolean = false;
  public speakerFormSubmitted: boolean = false;
  public error_message: string = '';
  public documentUrl: any;
  public file!: File;
  public config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '45rem',
    minHeight: '10rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [
      ['bold']
      ],
    customClasses: [
      {
        name: "quote",
        class: "quote",
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1",
      },
    ]
  };

  //event for added leave or updated leave
  @Output() event: EventEmitter<{
    editObject?: Speaker;
    isEditing: boolean;
  }> = new EventEmitter<{ editObject?: Speaker; isEditing: boolean }>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogModel<Speaker>,
    private fb: FormBuilder,
    public dialog: MatDialog,
    public _toastr: Toastr,
    private _speaker: SpeakersService,
  ) {}

  ngOnInit(): void {
    this.initSpeakerForm();
  }

  initSpeakerForm() {
    this.speakerForm = this.fb.group({
      fullName: [this.data.editObject?.fullName ?? '', Validators.required],
      email: [this.data.editObject?.email ?? '', Validators.email],
      organization: [this.data.editObject?.organization ?? ''],
      position: [this.data.editObject?.position ?? ''],
      phoneNumber: [this.data.editObject?.phoneNumber ?? ''],
      country: [this.data.editObject?.country ?? ''],
      biography: [this.data.editObject?.biography ?? ''],
      fileUrl: [this.data.editObject?.fileUrl ?? ''],
      imgUrl: [null],
    });

  }

  public checkForKeyEnter(event: KeyboardEvent): void {
    var key = event.key || event.keyCode;
    if (key == 'Enter' || key == 8) {
      this.submit();
    }
  }

  public onFileDropped(event: any) {
    console.log(event)
    let me = this;
    this.file = event[0];
    const maxAllowedSize = 500000;
    if(this.file.size > maxAllowedSize) {
      // this.inputFile.nativeElement.value = null;
      this._toastr.showError(
        'kindly upload a file not more than 5MB',
        'info'
      );
    } else {
      let reader = new FileReader();
      reader.readAsDataURL(this.file);
      reader.onload = () =>{
        me.documentUrl = reader.result;
      };
      reader.onerror = (error) => {
        console.log('Error: ', error);
      };
    }

  }

  public removeFile(): void {
    this.file = null as any;
  }

  public submit(): void {
    this.speakerFormSubmitted = true;
    const payload: Speaker = this.speakerForm.value;
    if(!this.file && !this.data.isEditing) {
      return this._toastr.showInfo(
        'You are required to upload a passport photograph not more than 2mb',
        'Passport image'
      );
    }
    if(this.file) {
      const imgUrl = this.documentUrl.split(",");
      payload.imgUrl = imgUrl[1];
    }
    if (this.speakerForm.valid) {
      this.isLoading = true;
      if(this.data.isEditing) {
        payload._id = this.data.editObject._id;
      }
      const operation = !this.data.isEditing ? 'addSpeaker' : 'updateSpeaker';
      this._speaker[operation](payload).subscribe({
        next: (res: any) => {
          this.isLoading = false;
            // console.log(res)
            this.event.emit({
              isEditing: this.data?.isEditing,
              editObject: res.response,
            });
            this.speakerFormSubmitted = false;
            this.close.nativeElement.click();
            this._toastr.showSuccess(
              res.message,
              'success'
            );
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
          this.isLoading = false;
          this.speakerFormSubmitted = false;
          this.error_message = error?.error?.message;
        },
      });
    }
  }
}

