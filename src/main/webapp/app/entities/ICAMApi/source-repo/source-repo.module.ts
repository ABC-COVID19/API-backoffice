import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { IcamBackOfficeSharedModule } from 'app/shared/shared.module';
import { SourceRepoComponent } from './source-repo.component';
import { SourceRepoDetailComponent } from './source-repo-detail.component';
import { SourceRepoUpdateComponent } from './source-repo-update.component';
import { SourceRepoDeleteDialogComponent } from './source-repo-delete-dialog.component';
import { sourceRepoRoute } from './source-repo.route';

@NgModule({
  imports: [IcamBackOfficeSharedModule, RouterModule.forChild(sourceRepoRoute)],
  declarations: [SourceRepoComponent, SourceRepoDetailComponent, SourceRepoUpdateComponent, SourceRepoDeleteDialogComponent],
  entryComponents: [SourceRepoDeleteDialogComponent]
})
export class IcamApiSourceRepoModule {}
