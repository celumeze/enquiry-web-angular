import { NgModule } from '@angular/core';

import { KnowledgeBaseRoutingModule } from './knowledge-base-routing.module';
import { KnowledgeBaseComponent } from './knowledge-base.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [KnowledgeBaseComponent],
  imports: [
    SharedModule,
    KnowledgeBaseRoutingModule
  ]
})
export class KnowledgeBaseModule { }
