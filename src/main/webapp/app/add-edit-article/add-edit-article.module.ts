import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AddEditArticleComponent } from './add-edit-article.component';
import { ADD_EDIT_ARTICLE_ROUTE } from './add-edit-article.route';
import { RouterModule } from '@angular/router';
import { IcamBackOfficeSharedModule } from 'app/shared/shared.module';

@NgModule({
  imports: [ReactiveFormsModule, RouterModule.forChild([ADD_EDIT_ARTICLE_ROUTE]), IcamBackOfficeSharedModule],
  exports: [],
  declarations: [AddEditArticleComponent],
  providers: []
})
export class AddEditArticleModule {}
