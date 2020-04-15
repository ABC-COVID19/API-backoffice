import { Routes } from '@angular/router';
import { TopSearchComponent } from './top-search.component';
import { ArticleComponent } from 'app/article/article.component';

export const TOP_SEARCH_ROUTE: Routes = [
  {
    path: '',
    component: TopSearchComponent,
    children: [
      {
        path: ''
      },
      {
        path: ':id/view',
        component: ArticleComponent
      }
    ]
  }
];
