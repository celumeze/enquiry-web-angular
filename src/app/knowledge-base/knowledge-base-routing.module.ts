import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KnowledgeBaseComponent } from './knowledge-base.component';

const routes: Routes = [
  {
    path: '', component: KnowledgeBaseComponent,
    data: {
      title: 'Knowledge Base'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KnowledgeBaseRoutingModule { }
