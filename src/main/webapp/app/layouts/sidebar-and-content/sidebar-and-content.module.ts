import { NgModule } from '@angular/core';
import { IcamBackOfficeSharedModule } from '../../shared/shared.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SidebarAndContentComponent } from './sidebar-and-content.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [RouterModule, IcamBackOfficeSharedModule],
  declarations: [SidebarComponent, SidebarAndContentComponent],
  providers: []
})
export class SidebarAndContentModule {}
