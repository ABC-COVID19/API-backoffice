import { NgModule } from '@angular/core';
import { TopNavbarComponent } from './topnavbar/topnavbar.component';
import { TopNavbarAndContentComponent } from './topnavbar-and-content.component';
import { IcamBackOfficeSharedModule } from '../../shared/shared.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [RouterModule, IcamBackOfficeSharedModule],
  declarations: [TopNavbarComponent, TopNavbarAndContentComponent],
  providers: []
})
export class TopNavbarAndContentModule {}
