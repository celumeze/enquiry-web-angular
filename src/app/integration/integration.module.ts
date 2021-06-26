import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IntegrationRoutingModule } from './integration-routing.module';
import { IntegrationComponent } from './integration.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [IntegrationComponent],
  imports: [
    SharedModule,
    IntegrationRoutingModule
  ]
})
export class IntegrationModule { }
