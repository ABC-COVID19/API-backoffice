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
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ErrorComponent } from './layouts/error/error.component';

@NgModule({
  imports: [
    BrowserModule,
    IcamBackOfficeSharedModule,
    IcamBackOfficeCoreModule,
    IcamBackOfficeHomeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    IcamBackOfficeEntityModule,
    IcamBackOfficeAppRoutingModule
  ],
  declarations: [MainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, FooterComponent],
  bootstrap: [MainComponent]
})
export class IcamBackOfficeAppModule {}
