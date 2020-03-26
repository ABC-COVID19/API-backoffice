import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IArticleType } from 'app/shared/model/ICAMApi/article-type.model';

@Component({
  selector: 'jhi-article-type-detail',
  templateUrl: './article-type-detail.component.html'
})
export class ArticleTypeDetailComponent implements OnInit {
  articleType: IArticleType | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ articleType }) => (this.articleType = articleType));
  }

  previousState(): void {
    window.history.back();
  }
}
