import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-table-header',
  templateUrl: './table-header.component.html',
  styleUrls: ['./table-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableHeaderComponent implements OnInit {
  @Input() btn_name: string = '';
  @Input() table_name: string = '';
  @Output() btnAction = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  public btnPressed(): void {
    this.btnAction.emit();
  }
}
