import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { IcamBackOfficeSharedModule } from 'app/shared/shared.module';
import { CategoryTreeComponent } from './category-tree.component';
import { CategoryTreeDetailComponent } from './category-tree-detail.component';
import { CategoryTreeUpdateComponent } from './category-tree-update.component';
import { CategoryTreeDeleteDialogComponent } from './category-tree-delete-dialog.component';
import { categoryTreeRoute } from './category-tree.route';

@NgModule({
  imports: [IcamBackOfficeSharedModule, RouterModule.forChild(categoryTreeRoute)],
  declarations: [CategoryTreeComponent, CategoryTreeDetailComponent, CategoryTreeUpdateComponent, CategoryTreeDeleteDialogComponent],
  entryComponents: [CategoryTreeDeleteDialogComponent]
})
export class IcamApiCategoryTreeModule {}
