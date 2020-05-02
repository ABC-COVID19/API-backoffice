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
import { TopNavbarAndContentModule } from './layouts/topnavbar-and-content/topnavbar-and-content.module';
import { FooterComponent } from './layouts/footer/footer.component';
import { ErrorComponent } from './layouts/error/error.component';

import { ArticleListModule } from './articleList/articleList.module';
import { ReviewArticleModule } from './reviewArticle/reviewArticle.module';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

@NgModule({
  imports: [
    BrowserModule,
    ArticleListModule,
    IcamBackOfficeSharedModule,
    IcamBackOfficeCoreModule,
    SidebarAndContentModule,
    TopNavbarAndContentModule,
    IcamBackOfficeHomeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    IcamBackOfficeEntityModule,
    IcamBackOfficeAppRoutingModule,
    ReviewArticleModule
  ],
  declarations: [MainComponent, ErrorComponent, FooterComponent],
  bootstrap: [MainComponent],
  exports: []
})
export class IcamBackOfficeAppModule {}
