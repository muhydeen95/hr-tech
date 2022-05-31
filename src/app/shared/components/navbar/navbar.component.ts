import { Component, OnInit } from '@angular/core';
import {
  Notification,
  NotificationStatusEnum,
} from '@shared/models/notification.model';
import { LocalStorageService } from '@shared/services/local-storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  public user!: any;
  public notifications: Notification[] = [
    {
      id: 1,
      status: NotificationStatusEnum.UN_TREATED,
      title: 'Your file has been Submitted',
      message:
        'Your file submission with the correspondence number Nov21-EC00001 has been uploaded and acknowleged.',
    },
    {
      id: 2,
      status: NotificationStatusEnum.PENDING,
      title: 'Your file is being treated',
      message:
        'Your Submission with correspondence No: #4284VXKB has been picked for treatment',
    },
    {
      id: 3,
      status: NotificationStatusEnum.TREATED,
      title: 'Your file has been treated',
      message: 'Your submission #4284VXKB has been treated',
    },
  ];

  constructor(private _loacalStorageAS: LocalStorageService) {
    this._loacalStorageAS.watch('user_credential').subscribe((_res: any) => {
      if (_res) {
        this.user = _res;
      }
    });
  }

  ngOnInit(): void {}
}
