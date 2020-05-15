import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { IcamBackOfficeSharedModule } from 'app/shared/shared.module';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { RouterModule } from '@angular/router';
import { RevisionListComponent } from './revision-list.component';
import { RevisionCardComponent } from './revision-card/revision-card.component';
import { StatusFilterComponent } from './status-filter/status-filter.component';

@NgModule({
  imports: [
    IcamBackOfficeSharedModule,
    CommonModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule.forRoot(),
    AngularMultiSelectModule,
    RouterModule.forChild([
      {
        path: '',
        component: RevisionListComponent
      }
    ])
  ],
  declarations: [RevisionListComponent, RevisionCardComponent, StatusFilterComponent]
})
export class RevisionModule {}
