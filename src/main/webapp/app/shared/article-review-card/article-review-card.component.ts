import { Component, Input, Output, EventEmitter, HostListener, AfterContentInit, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
//import { ICategoryTree } from '../model/ICAMApi/category-tree.model';

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

  constructor(private router: Router) {}

  /* ngOnChanges( changes : SimpleChanges) : void{
    if(changes['articles']){
      this.articles = this.articles.slice();
    }
  } */

  ngOnInit(): void {}

  articleReviewRedirect(articleId: string): void {
    this.router.navigate(['/backoffice/reviewArticle'], { queryParams: { articleId } });
  }
}
