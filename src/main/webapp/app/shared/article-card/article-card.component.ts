import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'article-card',
  templateUrl: 'article-card.component.html',
  styleUrls: ['./article-card.scss']
})
export class ArticleCardComponent {
  @Input() articles: Array<any> = new Array<any>();
  @Output() cardClick = new EventEmitter<void>();
  @Output() onEdit = new EventEmitter<number>();
  @Output() onReview = new EventEmitter<number>();
  @Output() onDelete = new EventEmitter<number>();
}
