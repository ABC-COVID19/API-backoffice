import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { IcamBackOfficeSharedModule } from 'app/shared/shared.module';
import { ArticleTypeComponent } from './article-type.component';
import { ArticleTypeDetailComponent } from './article-type-detail.component';
import { ArticleTypeUpdateComponent } from './article-type-update.component';
import { ArticleTypeDeleteDialogComponent } from './article-type-delete-dialog.component';
import { articleTypeRoute } from './article-type.route';

@NgModule({
  imports: [IcamBackOfficeSharedModule, RouterModule.forChild(articleTypeRoute)],
  declarations: [ArticleTypeComponent, ArticleTypeDetailComponent, ArticleTypeUpdateComponent, ArticleTypeDeleteDialogComponent],
  entryComponents: [ArticleTypeDeleteDialogComponent]
})
export class IcamApiArticleTypeModule {}
