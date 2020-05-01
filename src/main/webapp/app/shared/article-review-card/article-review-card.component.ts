import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'article-review-card',
  templateUrl: 'article-review-card.component.html',
  styleUrls: ['./article-review-card.scss']
})
export class ArticleReviewCardComponent implements OnInit {
  @Input() articles: Array<any> = new Array<any>();

  /*   @Input() cardTitle = '';
  @Input() reviewState = '';
  @Input() articleDate = Date.now();
  @Input() author = '';
  @Input() categories: ICategoryTree[] = []; */
  @Output() cardClick = new EventEmitter<void>();

  constructor() {}

  /* ngOnChanges( changes : SimpleChanges) : void{
    if(changes['articles']){
      this.articles = this.articles.slice();
    }
  } */

  ngOnInit(): void {}
}
