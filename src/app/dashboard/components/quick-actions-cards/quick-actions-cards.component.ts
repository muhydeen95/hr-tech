import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-quick-actions-cards',
  templateUrl: './quick-actions-cards.component.html',
  styleUrls: ['./quick-actions-cards.component.scss'],
})
export class QuickActionsCardsComponent implements OnInit {
  @Input('image') image!: string | undefined;
  @Input('tag') tag!: string;
  @Input('route') route!: string;
  @Output() clickAction = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  triggerClick() {
    this.clickAction.emit(true);
  }
}
