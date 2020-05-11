import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'article-review-card',
  templateUrl: 'article-review-card.component.html',
  styleUrls: ['./article-review-card.scss']
})
export class ArticleReviewCardComponent {
  @Input() articles: Array<any> = new Array<any>();
  @Output() cardClick = new EventEmitter<void>();
  @Output() onEdit = new EventEmitter<number>();
  @Output() onReview = new EventEmitter<number>();
  @Output() onDelete = new EventEmitter<number>();
}
