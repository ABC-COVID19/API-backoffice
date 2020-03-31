import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { IcamBackOfficeSharedModule } from 'app/shared/shared.module';
import { IcamBackOfficeCoreModule } from 'app/core/core.module';
import { IcamBackOfficeAppRoutingModule } from './app-routing.module';
import { IcamBackOfficeHomeModule } from './home/home.module';
import { IcamBackOfficeEntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { MainComponent } from './layouts/main/main.component';
import { SidebarAndContentModule } from './layouts/sidebar-and-content/sidebar-and-content.module';
import { FooterComponent } from './layouts/footer/footer.component';
import { ErrorComponent } from './layouts/error/error.component';

@NgModule({
  imports: [
    BrowserModule,
    IcamBackOfficeSharedModule,
    IcamBackOfficeCoreModule,
    SidebarAndContentModule,
    IcamBackOfficeHomeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    IcamBackOfficeEntityModule,
    IcamBackOfficeAppRoutingModule
  ],
  declarations: [MainComponent, ErrorComponent, FooterComponent],
  bootstrap: [MainComponent]
})
export class IcamBackOfficeAppModule {}
