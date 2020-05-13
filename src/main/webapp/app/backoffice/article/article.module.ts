import { NgModule } from '@angular/core';
import { articleRoute } from './article.route';
import { RouterModule } from '@angular/router';
import { IcamBackOfficeSharedModule } from 'app/shared/shared.module';
import { AddEditArticleComponent } from './add-edit-article/add-edit-article.component';
import { ArticleListComponent } from './article-list/article-list.component';
import { ReviewArticleComponent } from './review-article/review-article.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    IcamBackOfficeSharedModule,
    CommonModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule.forRoot(),
    AngularMultiSelectModule,
    RouterModule.forChild(articleRoute)
  ],
  declarations: [AddEditArticleComponent, ArticleListComponent, ReviewArticleComponent]
})
export class ArticleModule {}
