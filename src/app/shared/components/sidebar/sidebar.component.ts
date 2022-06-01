import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CurrentUserService } from '@core/services/current-user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  public isOpen: boolean = false;
  @Input() showMinimizedMenu: boolean = false;

  @Output() showMinimized = new EventEmitter();
  constructor(private _currentUser: CurrentUserService) {}

  ngOnInit(): void {}

  public toggleSidebar(): void {
    this.isOpen = !this.isOpen;
    if (this.showMinimizedMenu) {
      this.showMinimized.emit(true);
    }
  }
  public minimizeMenu(): void {
    this.showMinimizedMenu = !this.showMinimizedMenu;
    this.showMinimized.emit(this.showMinimizedMenu);
  }

  public logout(): void {
    this._currentUser.logOut();
  }
}
