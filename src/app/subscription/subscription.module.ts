import { NgModule } from '@angular/core';

import { SubscriptionRoutingModule } from './subscription-routing.module';
import { SubscriptionComponent } from './subscription.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [SubscriptionComponent],
  imports: [
    SharedModule,
    SubscriptionRoutingModule
  ]
})
export class SubscriptionModule { }
