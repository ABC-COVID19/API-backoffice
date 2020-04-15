import { NgModule } from '@angular/core';
import { TopSearchComponent } from './top-search.component';
import { TOP_SEARCH_ROUTE } from './top-search.route';
import { RouterModule } from '@angular/router';
import { ArticleModule } from 'app/article/article.module';

@NgModule({
  imports: [ArticleModule, RouterModule.forChild(TOP_SEARCH_ROUTE)],
  exports: [],
  declarations: [TopSearchComponent],
  providers: []
})
export class TopSearchModule {}
