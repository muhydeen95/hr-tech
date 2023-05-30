import { Component, OnInit } from '@angular/core';
import { FAQ } from 'app/faq/models/faq.model';
import { FaqService } from 'app/faq/services/faq.service';
import { ResponseModel } from 'app/models/response.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss'],
})
export class FaqComponent implements OnInit {
  public sub: Subscription = new Subscription();
  faqs$: FAQ[] = [];

  constructor(private _faq: FaqService) {}

  ngOnInit(): void {
   this.getFaqs();
  }

  public getFaqs(): void {
    // this._helper.startSpinner();
    this.sub.add(
      this._faq.getFaq().subscribe({
        next: (res: any) => {
          console.log(res);
          // this._helper.stopSpinner();
          this.faqs$ = res?.faq;
        },
        error: (error: ResponseModel<null>) => {
          // this._helper.stopSpinner();
        },
      })
    );
  }

}
