import { NgModule } from '@angular/core';
import { IcamBackOfficeSharedModule } from '../shared/shared.module';
import { ABOUT_ROUTE } from './about.route';
import { AboutComponent } from './about.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [IcamBackOfficeSharedModule, RouterModule.forChild([ABOUT_ROUTE])],
  exports: [],
  declarations: [AboutComponent],
  providers: []
})
export class AboutModule {}
