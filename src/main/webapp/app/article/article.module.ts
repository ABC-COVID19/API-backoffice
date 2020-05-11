import { NgModule } from '@angular/core';
import { ArticleComponent } from './article.component';
import { IcamBackOfficeSharedModule } from 'app/shared/shared.module';

@NgModule({
  imports: [IcamBackOfficeSharedModule],
  exports: [],
  declarations: [ArticleComponent],
  providers: []
})
export class ArticleModule {}
