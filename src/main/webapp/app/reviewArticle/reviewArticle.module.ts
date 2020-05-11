import { NgModule } from '@angular/core';
import { ReviewArticleComponent } from './reviewArticle.component';
import { REVIEWARTICLE_ROUTE } from './reviewArticle.route';
import { IcamBackOfficeSharedModule } from 'app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';

@NgModule({
  imports: [
    IcamBackOfficeSharedModule,
    RouterModule.forChild([REVIEWARTICLE_ROUTE]),
    NgMultiSelectDropDownModule.forRoot(),
    FormsModule,
    CommonModule,
    AngularMultiSelectModule
  ],
  exports: [],
  declarations: [ReviewArticleComponent],
  providers: []
})
export class ReviewArticleModule {}
