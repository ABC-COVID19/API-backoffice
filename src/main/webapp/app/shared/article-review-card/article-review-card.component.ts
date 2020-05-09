import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Article } from 'app/shared/model/ICAMApi/article.model';
import { ArticleService } from 'app/entities/ICAMApi/article/article.service';

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
  @Output() onEdit = new EventEmitter<number>();

  constructor(private articleService: ArticleService, private router: Router) {}

  /* ngOnChanges( changes : SimpleChanges) : void{
    if(changes['articles']){
      this.articles = this.articles.slice();
    }
  } */

  ngOnInit(): void {}

  articleReviewRedirect(articleId: string): void {
    this.router.navigate(['/backoffice/reviewArticle'], { queryParams: { articleId } });
  }
  articleDelete(articleId: string): void {
    if (confirm('Tem a certeza que quer apagar o artigo #' + articleId)) {
      this.articleService.delete(+articleId).subscribe(
        () => {
          //  Apagado com sucesso
          window.location.reload();
        },
        () => {
          //  error
        }
      );
    }
  }
}
