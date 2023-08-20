import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Toastr } from '@GlobalService/toastr.service';
import { ContactService } from 'app/contact/services/contact.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  public clientId!: string | null;
  public fee!: number;
  public currency!: string;
  public isLoading: boolean = false;

  constructor(
    private _attendant: ContactService,
    private route: ActivatedRoute,
    private _toastr: Toastr
  ) { }

  ngOnInit(): void {
    this.clientId = this.route.snapshot.paramMap.get('id');
    this.route.queryParams.subscribe(params => {
      this.fee = +params['amount'];
      this.currency = params['currency'];
    });
  }


  submit() {
    this.isLoading = true;
    const payload = {
      tx_ref: this.clientId,
    }
    this._attendant.makepayment(payload).subscribe({
        next: (res: any) => {
            console.log(res);
            this.isLoading = false;
            const url = res.response.link;
            localStorage.setItem('paymentUrl', url);
            window.location.href = url;
        }, error: (e: any) => {
          this.isLoading = false;
          console.log(e);
          this._toastr.showError(
            e.error?.message,
            'Failed'
          );
        }
    });
  }

}
