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
  public amountToPay: number = 0;
  public currenttab: number = 1;
  public applicantType!: string;
  public noOfRegistrants!: number;

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
      this.noOfRegistrants = +params['bulk'];
      this.applicantType = params['type'];
      this.getAmount(this.applicantType);
      this.getDefaultTab(this.currency);
    });
  }

  public getCurrentTab(tab: number) {
    this.currenttab = tab;
  }

  public getDefaultTab(currency: string) {
    switch (currency) {
      case 'GHS':
        this.currenttab = 1;
        break;
      case 'NGN':
        this.currenttab = 2;
        break;
      default:
        this.currenttab = 3;
        break;
    }
    return this.currenttab;
  }

  public getAmount(type: string) {
    switch (type) {
      case 'Member':
        this.amountToPay = 175 * this.noOfRegistrants;
        break;
      case 'Student':
        this.amountToPay = 150 * this.noOfRegistrants;
        break;
      default:
        this.amountToPay = 200 * this.noOfRegistrants;
        break;
    }
    return this.amountToPay;
  }


  submit() {
    this.isLoading = true;
    const payload = {
      tx_ref: this.clientId,
      amountToPay: this.amountToPay
    }
    this._attendant.makepayment(payload).subscribe({
        next: (res: any) => {
            // console.log(res);
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
