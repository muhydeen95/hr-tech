import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.scss'],
})
export class TermsComponent implements OnInit {
  @ViewChild('close') close!: ElementRef;
  @Output() event: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() {}
  ngOnInit() {}

  public accept(): void {
    this.event.emit(true);
    this.close.nativeElement.click();
  }
}
