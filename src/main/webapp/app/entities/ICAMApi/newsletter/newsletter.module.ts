import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { IcamBackOfficeSharedModule } from 'app/shared/shared.module';
import { NewsletterComponent } from './newsletter.component';
import { NewsletterDetailComponent } from './newsletter-detail.component';
import { NewsletterUpdateComponent } from './newsletter-update.component';
import { NewsletterDeleteDialogComponent } from './newsletter-delete-dialog.component';
import { newsletterRoute } from './newsletter.route';

@NgModule({
  imports: [IcamBackOfficeSharedModule, RouterModule.forChild(newsletterRoute)],
  declarations: [NewsletterComponent, NewsletterDetailComponent, NewsletterUpdateComponent, NewsletterDeleteDialogComponent],
  entryComponents: [NewsletterDeleteDialogComponent]
})
export class IcamApiNewsletterModule {}
