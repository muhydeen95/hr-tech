import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-help-center',
  templateUrl: './help-center.component.html',
  styleUrls: ['./help-center.component.scss']
})
export class HelpCenterComponent implements OnInit {
  public showHelpCenter: boolean = false
  public openBag: boolean = false;
  @Input() position: string = '';
  public unique_name!: string;

  constructor() { }

  ngOnInit() {
  }

  public toggleHelpCenter() {
    this.showHelpCenter = !this.showHelpCenter
  }

  public toggleBag(): void {
    this.openBag = !this.openBag;
  }



}
