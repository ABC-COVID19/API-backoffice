import { NgModule } from '@angular/core';
import { ArticleListComponent } from './articleList.component';
import { ARTICLELIST_ROUTE } from './articleList.route';
import { IcamBackOfficeSharedModule } from 'app/shared/shared.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [IcamBackOfficeSharedModule, RouterModule.forChild([ARTICLELIST_ROUTE])],
  exports: [],
  declarations: [ArticleListComponent],
  providers: []
})
export class ArticleListModule {}
