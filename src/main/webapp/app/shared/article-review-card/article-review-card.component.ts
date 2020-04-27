import { Component, Input, Output, EventEmitter, HostListener, AfterContentInit, OnInit } from '@angular/core';
import * as moment from 'moment';
import { IArticle } from '../model/ICAMApi/article.model';
//import { ICategoryTree } from '../model/ICAMApi/category-tree.model';

@Component({
  selector: 'article-review-card',
  templateUrl: 'article-review-card.component.html',
  styleUrls: ['./article-review-card.scss']
})
export class ArticleReviewCardComponent implements OnInit {
  @Input() article: any;

  /*   @Input() cardTitle = '';
  @Input() reviewState = '';
  @Input() articleDate = Date.now();
  @Input() author = '';
  @Input() categories: ICategoryTree[] = []; */
  @Output() cardClick = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}
}
