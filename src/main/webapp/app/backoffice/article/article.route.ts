import { Routes } from '@angular/router';
import { ArticleListComponent } from './article-list/article-list.component';
import { AddEditArticleComponent } from './add-edit-article/add-edit-article.component';
import { ReviewArticleComponent } from './review-article/review-article.component';
import { AddEditArticleResolver } from './add-edit-article/add-edit-article.resolve';
import { ReviewArticleResolver } from './review-article/review-article.resolve';

export const articleRoute: Routes = [
  {
    path: '',
    component: ArticleListComponent
  },
  {
    path: 'add',
    component: AddEditArticleComponent
  },
  {
    path: ':id/edit',
    component: AddEditArticleComponent,
    resolve: {
      article: AddEditArticleResolver
    }
  },
  {
    path: ':id/review',
    component: ReviewArticleComponent,
    resolve: {
      revisionData: ReviewArticleResolver
    }
  }
];
