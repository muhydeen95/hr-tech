import { Component, OnInit, Input } from '@angular/core';
import * as $ from 'jquery';
@Component({
  selector: 'app-reusable-side-drawer',
  templateUrl: './reusable-side-drawer.component.html',
  styleUrls: ['./reusable-side-drawer.component.scss'],
})
export class ReusableSideDrawerComponent implements OnInit {
  @Input() position: string = 'right'; // left or right
  @Input() elementId!: string;
  @Input() headerTitle: string = '';

  constructor() {}

  ngOnInit() {
    $(`#c_container`).fadeOut();
  }

  closeDrawer() {
    document.body.classList.remove('right-drawer');
  }
}
