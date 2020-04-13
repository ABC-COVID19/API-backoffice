import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { ICategoryTree } from '../model/ICAMApi/category-tree.model';

@Component({
  selector: 'article-card',
  templateUrl: 'article-card.component.html',
  styleUrls: ['./article-card.scss']
})
export class ArticleCardComponent {
  @Input() title = '';
  @Input() summary = '';
  @Input() articleDate = Date.now();
  @Input() author = '';
  @Input() categories: ICategoryTree[] = [];
  @Output() cardClick = new EventEmitter<void>();

  constructor() {}

  @HostListener('click', ['$event'])
  onClick(): void {
    this.cardClick.emit();
  }
}
