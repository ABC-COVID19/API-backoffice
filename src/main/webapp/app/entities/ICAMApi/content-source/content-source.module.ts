import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { IcamBackOfficeSharedModule } from 'app/shared/shared.module';
import { ContentSourceComponent } from './content-source.component';
import { ContentSourceDetailComponent } from './content-source-detail.component';
import { ContentSourceUpdateComponent } from './content-source-update.component';
import { ContentSourceDeleteDialogComponent } from './content-source-delete-dialog.component';
import { contentSourceRoute } from './content-source.route';

@NgModule({
  imports: [IcamBackOfficeSharedModule, RouterModule.forChild(contentSourceRoute)],
  declarations: [ContentSourceComponent, ContentSourceDetailComponent, ContentSourceUpdateComponent, ContentSourceDeleteDialogComponent],
  entryComponents: [ContentSourceDeleteDialogComponent]
})
export class IcamApiContentSourceModule {}
