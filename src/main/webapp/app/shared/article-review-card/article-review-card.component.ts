import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleService } from 'app/entities/ICAMApi/article/article.service';

@Component({
  selector: 'article-review-card',
  templateUrl: 'article-review-card.component.html',
  styleUrls: ['./article-review-card.scss']
})
export class ArticleReviewCardComponent implements OnInit {
  @Input() articles: Array<any> = new Array<any>();
  @Output() cardClick = new EventEmitter<void>();
  @Output() onEdit = new EventEmitter<number>();

  constructor(private articleService: ArticleService, private router: Router) {}

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
