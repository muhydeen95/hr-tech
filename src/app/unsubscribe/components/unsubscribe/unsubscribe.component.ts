import { Toastr } from '@GlobalService/toastr.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UnsubscribeService } from 'app/unsubscribe/services/unsubscribe.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-contact',
  templateUrl: './unsubscribe.component.html',
  styleUrls: ['./unsubscribe.component.scss']
})
export class UnsubscribeComponent implements OnInit {
  public sub: Subscription = new Subscription();
  public form!: FormGroup;
  public isLoading!: boolean;

  constructor(
    private fb: FormBuilder,
    private _unsubscribe: UnsubscribeService,
    private _toastr: Toastr
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    })
  }

  public submit() {
    const payload = this.form.value;
    if(this.form.valid) {
      this.isLoading = true;
      this.sub.add(
        this._unsubscribe.unsubscribeEmail(payload.email).subscribe({
          next: (res: any) => {
            this.isLoading = false;
            if(res?.status?.isSuccessful) {
              this._toastr.showSuccess(
                'You have successfully unsubscribe from handyhub',
                'Success'
              );
              this.form.reset();
            } else {
              this._toastr.showInfo(
                'Email does not exist on the system',
                'Failed'
              );
            }
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
