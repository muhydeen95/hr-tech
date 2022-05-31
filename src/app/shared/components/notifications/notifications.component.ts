import { Component, OnInit, Input } from '@angular/core';
import {
  Notification,
  NotificationStatusEnum,
} from '@shared/models/notification.model';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent implements OnInit {
  @Input('notifications') notifications: Notification[] = [];

  notificationStatusEnum = NotificationStatusEnum;

  constructor() {}

  ngOnInit(): void {}
  ngAfterContentChecked(): void {
    this.notifications = this.notifications.sort((a, b) => b.status - a.status);
    // this.actions = this.actions.filter(
    //   (el) => el.type !== this.actionTypes.FAILED
    // );
  }

  public getIndex(event: any): void {
    this.notifications.splice(event, 1);
  }
}
