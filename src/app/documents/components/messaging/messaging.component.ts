import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-messaging',
  templateUrl: './messaging.component.html',
  styleUrls: ['./messaging.component.scss'],
})
export class MessagingComponent implements OnInit {
  public open_smiley: boolean = false;
  public toggled: boolean = false;
  @Input() messages: any[] = [];

  constructor() {}

  ngOnInit(): void {}

  emojiClick(event: any) {
    console.log(event);
    // if (this.cinput) {
    //   this.cinput.nativeElement.innerHTML += event.emoji.native;
    //   this.chatInput();
    // }
  }
}
