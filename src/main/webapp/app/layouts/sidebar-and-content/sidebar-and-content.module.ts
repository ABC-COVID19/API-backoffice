import { NgModule } from '@angular/core';

import { SidebarComponent } from './sidebar/sidebar.component';
import { SidebarAndContentComponent } from './sidebar-and-content.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [RouterModule],
  declarations: [SidebarComponent, SidebarAndContentComponent],
  providers: []
})
export class SidebarAndContentModule {}
