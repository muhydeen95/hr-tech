import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss'],
})
export class SearchbarComponent implements OnInit {
  @ViewChild('searchQuery') searchQueryElement!: ElementRef;
  @Input() btnName: string = '';
  @Input() btnIcon: string = '';
  @Input() currentSort: string = 'Department';
  @Input() filterList: Array<string> = [];
  @Input() sortList: Array<string> = [];
  @Output() btnAction = new EventEmitter();
  @Output() filterAction = new EventEmitter();
  @Output() searchAction = new EventEmitter();
  @Output() sortAction = new EventEmitter();
  @Output() searchQuery: EventEmitter<string> = new EventEmitter<string>();
  @Input() canFilter: boolean = false;
  @Input() canSort: boolean = false;
  constructor() {}

  ngOnInit(): void {}

  public btnPressed(): void {
    this.btnAction.emit();
  }

  public selectSort(e: any): void {
    this.currentSort = e.target.value;
    this.sortAction.emit(this.currentSort);
  }

  public filterPressed(e?: any): void {
    if (this.canFilter) {
      this.filterAction.emit();
    }
  }
  public searchPressed(): void {
    this.searchAction.emit(true);
  }

  public getSearchQuery(
    searchQuery: string,
    event: KeyboardEvent | any,
    clear?: boolean
  ): void {
    clear ? (this.searchQueryElement.nativeElement.value = '') : null;
    this.searchQuery.emit(searchQuery);
    var key = event.key || event.keyCode;
    if (key == 'Enter' || key == 8 || searchQuery == '') {
      this.searchAction.emit(true);
    }
  }
}
