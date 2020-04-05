import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { IcamBackOfficeSharedModule } from '../shared/shared.module';
import { UPDATES_ROUTE } from './icam-updates.route';
import { IcamUpdatesComponent } from './icam-udpates.component';
import { IcamUpdatesFormComponent } from './icam-updates-form/icam-updates-form.component';

@NgModule({
  imports: [ReactiveFormsModule, IcamBackOfficeSharedModule, RouterModule.forChild([UPDATES_ROUTE])],
  exports: [],
  declarations: [IcamUpdatesComponent, IcamUpdatesFormComponent],
  providers: []
})
export class IcamUpdatesModule {}
