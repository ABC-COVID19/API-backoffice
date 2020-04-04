import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'category-tag',
  templateUrl: 'category-tag.component.html',
  styleUrls: ['./category-tag.scss']
})
export class CategoryTagComponent {
  @Output() catClick = new EventEmitter<void>();
  constructor() {}
}
