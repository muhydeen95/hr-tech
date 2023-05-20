import { Toastr } from '@GlobalService/toastr.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from 'app/contact/services/contact.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  public sub: Subscription = new Subscription();
  public form!: FormGroup;
  public isLoading!: boolean;

  constructor(
    private fb: FormBuilder,
    private _contact: ContactService,
    private _toastr: Toastr
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      customerId: [0, Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: [''],
      message: ['', Validators.required]
    })
  }

  public submit() {
    const payload = this.form.value;
    if(this.form.valid) {
      this.isLoading = true;
      this.sub.add(
        this._contact.contactUs(payload).subscribe({
          next: (res: any) => {
            this.isLoading = false;
            this._toastr.showSuccess(
              'You have successfully sent an email',
              'Success'
            );
            this.form.reset();
          },
          error: (error: HttpErrorResponse) => {
            this.isLoading = false;
            this._toastr.showError(
              error.error,
              'Failed'
            );
          },
        })
      );
    }
  }

}
