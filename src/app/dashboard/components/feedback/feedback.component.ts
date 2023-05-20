import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {
  public reasons: any[] = [
    {id: 1, title: 'Get connected to verified service providers.', paragraph: 'Handyhub connects you to verified service providers who are immediately available to render the services you need whenever and wherever you need them. '},
    {id: 1, title: 'Secured mode of payment.', paragraph: 'Handyhub guarantees a safe and secure payment method. For services rendered. '},
    {id: 1, title: 'Verified service providers at a click.', paragraph: 'Service providers and customers go through different stages of verification to reduce fake identities as much as possible. '},
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
