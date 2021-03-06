import { NgModule } from '@angular/core';
import { IcamBackOfficeSharedLibsModule } from './shared-libs.module';
import { AlertComponent } from './alert/alert.component';
import { AlertErrorComponent } from './alert/alert-error.component';
import { LoginModalComponent } from './login/login.component';
import { RoundCardComponent } from './round-card/round-card.component';
import { IcamBtnDirective } from './icam-btn/icam-btn.directive';
import { ControlFormErrorDirective } from './control-form-error/control-form-error.directive';
import { IcamSearchComponent } from './icam-search/icarm-search.component';
import { RevisionCardComponent } from './revision-card/revision-card.component';
import { IcamBadgeComponent } from './icam-badge/icam-badge.component';
import { ArticleCardComponent } from './article-card/article-card.component';
import { HasAnyAuthorityDirective } from './auth/has-any-authority.directive';

@NgModule({
  imports: [IcamBackOfficeSharedLibsModule],
  declarations: [
    AlertComponent,
    AlertErrorComponent,
    LoginModalComponent,
    HasAnyAuthorityDirective,
    RoundCardComponent,
    IcamSearchComponent,
    RevisionCardComponent,
    IcamBadgeComponent,
    IcamBtnDirective,
    ControlFormErrorDirective,
    ArticleCardComponent
  ],
  entryComponents: [LoginModalComponent],
  exports: [
    IcamBackOfficeSharedLibsModule,
    AlertComponent,
    AlertErrorComponent,
    LoginModalComponent,
    HasAnyAuthorityDirective,
    RoundCardComponent,
    IcamBtnDirective,
    ControlFormErrorDirective,
    IcamSearchComponent,
    RevisionCardComponent,
    IcamBadgeComponent,
    ArticleCardComponent
  ]
})
export class IcamBackOfficeSharedModule {}
