import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { KnowledgeBaseRoutingModule } from './knowledge-base-routing.module';
import { SharedModule } from '../shared/shared.module';
import { KnowledgeBaseShellComponent } from './knowledge-base-shell/knowledge-base-shell.component';
import { knowledgeBaseReducer } from './state/knowledgebase.reducer';
import { KnowledgeBaseMainComponent } from './knowledge-base-main/knowledge-base-main.component';


@NgModule({
  declarations: [KnowledgeBaseShellComponent, KnowledgeBaseMainComponent],
  imports: [
    SharedModule,
    KnowledgeBaseRoutingModule,
    StoreModule.forFeature('knowledgebase', knowledgeBaseReducer ) ,
  ]
})
export class KnowledgeBaseModule { }
