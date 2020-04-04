import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IcamBackOfficeSharedModule } from '../shared/shared.module';
import { SearchComponent } from './search.component';
import { SEARCH_ROUTE } from './search.route';

@NgModule({
  imports: [IcamBackOfficeSharedModule, RouterModule.forChild([SEARCH_ROUTE])],
  exports: [],
  declarations: [SearchComponent],
  providers: []
})
export class SearchModule {}
