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
import { Sponsor } from 'app/contact/models/contact.model';
import { Country } from '@shared/jsons/country-code';
import { SponsorsService } from 'app/sponsors/services/sponsors.service';

@Component({
  selector: 'app-add-sponsor-dialog',
  templateUrl: './add-sponsor-dialog.component.html',
  styleUrls: ['./add-sponsor-dialog.component.scss']
})
export class AddSponsorDialogComponent implements OnInit {
  public sub: Subscription = new Subscription();
  @ViewChild('inputFile') public inputFile!: ElementRef;
  @ViewChild('close') close!: ElementRef;
  public sponsorForm!: FormGroup;
  public isLoading: boolean = false;
  public sponsorFormSubmitted: boolean = false;
  public error_message: string = '';
  public documentUrl: any;
  public file!: File;
  public countries = Country;
  public sponsorplan: string[] = ['Platinum', 'Gold', 'Customized'];
  public telOptions = {initialCountry: 'ng', preferredCountries: ['ng', 'gh']};
  public hasError!: boolean;


  @Output() event: EventEmitter<{
    editObject?: Sponsor;
    isEditing: boolean;
  }> = new EventEmitter<{ editObject?: Sponsor; isEditing: boolean }>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogModel<Sponsor>,
    private fb: FormBuilder,
    public dialog: MatDialog,
    public _toastr: Toastr,
    private _sponsor: SponsorsService,
  ) {}

  ngOnInit(): void {
    this.initsponsorForm();
  }

  initsponsorForm() {
    this.sponsorForm = this.fb.group({
      companyName: [this.data.editObject?.companyName ?? '', Validators.required],
      email: [this.data.editObject?.email ?? '', [Validators.required, Validators.email]],
      contactPerson: [this.data.editObject?.contactPerson ?? '', Validators.required],
      website: [this.data.editObject?.website ?? '', [Validators.required, Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')]],
      phoneNumber: [this.data.editObject?.phoneNumber ?? '+234'],
      country: [this.data.editObject?.country ?? null, Validators.required],
      sponsorPlan: [this.data.editObject?.sponsorPlan ?? null],
      fileUrl: [this.data.editObject?.fileUrl ?? ''],
      imgUrl: [null],
    });

  }

  numericOnly(event: any) {
    let patt = /^([0-9])$/;
    let result = patt.test(event.key);
    return result;
  }

  onError(obj: any) {
    this.hasError = obj;
    // console.log('hasError: ', obj);
}

  public telInputObject(obj: any) {

  }

  public onCountryChange(country: any) {
    this.sponsorForm.patchValue({
      phoneNumber: '+' + country.dialCode
    })
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
    this.sponsorFormSubmitted = true;
    const payload: Sponsor = this.sponsorForm.value;
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
    if (this.sponsorForm.valid) {
      this.isLoading = true;
      if(this.data.isEditing) {
        payload._id = this.data.editObject._id;
      }
      const operation = !this.data.isEditing ? 'addSponsor' : 'updateSponsor';
      this._sponsor[operation](payload).subscribe({
        next: (res: any) => {
          this.isLoading = false;
            // console.log(res)
            this.event.emit({
              isEditing: this.data?.isEditing,
              editObject: res.response,
            });
            this.sponsorFormSubmitted = false;
            this.close.nativeElement.click();
            this._toastr.showSuccess(
              res.message,
              'success'
            );
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
          this.isLoading = false;
          this.sponsorFormSubmitted = false;
          this.error_message = error?.error?.message;
          this._toastr.showError(
            error?.error?.message,
            'error'
          );
        },
      });
    }
  }
}

