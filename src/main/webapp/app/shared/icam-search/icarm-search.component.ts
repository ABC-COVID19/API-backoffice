import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'icam-search',
  templateUrl: 'icam-search.component.html',
  styleUrls: ['./icam-search.scss']
})
export class IcamSearchComponent {
  @Input() placeholder = 'Pesquise por nome, área de investigação, patologia ou outro';
  @Output() search = new EventEmitter<string>();

  searchStr = '';

  constructor() {}

  emitSearch(): void {
    this.search.emit(this.searchStr);
  }
}
