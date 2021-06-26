import { NgModule } from '@angular/core';

import { SubUserRoutingModule } from './sub-user-routing.module';
import { SubUserComponent } from './sub-user.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [SubUserComponent],
  imports: [
    SharedModule,
    SubUserRoutingModule
  ]
})
export class SubUserModule { }
