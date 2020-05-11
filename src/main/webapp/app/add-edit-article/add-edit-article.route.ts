import { Route } from '@angular/router';
import { AddEditArticleComponent } from './add-edit-article.component';
import { AddEditArticleResolver } from './add-edit-article.resolve';

export const ADD_EDIT_ARTICLE_ROUTE: Route = {
  path: '',
  component: AddEditArticleComponent,
  resolve: {
    article: AddEditArticleResolver
  }
};
