import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { IcamBackOfficeSharedModule } from 'app/shared/shared.module';
import { PublicationSourceComponent } from './publication-source.component';
import { PublicationSourceDetailComponent } from './publication-source-detail.component';
import { PublicationSourceUpdateComponent } from './publication-source-update.component';
import { PublicationSourceDeleteDialogComponent } from './publication-source-delete-dialog.component';
import { publicationSourceRoute } from './publication-source.route';

@NgModule({
  imports: [IcamBackOfficeSharedModule, RouterModule.forChild(publicationSourceRoute)],
  declarations: [
    PublicationSourceComponent,
    PublicationSourceDetailComponent,
    PublicationSourceUpdateComponent,
    PublicationSourceDeleteDialogComponent
  ],
  entryComponents: [PublicationSourceDeleteDialogComponent]
})
export class IcamApiPublicationSourceModule {}
