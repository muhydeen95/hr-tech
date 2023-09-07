import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  @Output() btnAction = new EventEmitter();
  @Input() display: boolean = true;

  constructor() {}

  ngOnInit(): void {}

  public pressAction() {
    this.btnAction.emit();
  }

}
