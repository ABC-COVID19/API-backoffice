import { NgModule } from '@angular/core';

import { IcamBackOfficeSharedModule } from 'app/shared/shared.module';
import { HomeComponent } from './home.component';

@NgModule({
  imports: [IcamBackOfficeSharedModule],
  declarations: [HomeComponent]
})
export class IcamBackOfficeHomeModule {}
