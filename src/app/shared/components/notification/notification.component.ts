import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import {
  Notification,
  NotificationStatusEnum,
} from '@shared/models/notification.model';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationComponent implements OnInit {
  @Input('notification') notification: Notification = {
    id: 0,
    status: 0,
    title: 'string',
    message: 'string',
  };
  @Input('indexToRemove') indexToRemove!: number;

  @Output() index: EventEmitter<number> = new EventEmitter();
  public notificationStatusEnum = NotificationStatusEnum;
  constructor() {}

  ngOnInit(): void {}

  public removeItemFromArray(): void {
    this.index.emit(this.indexToRemove);
  }
}
