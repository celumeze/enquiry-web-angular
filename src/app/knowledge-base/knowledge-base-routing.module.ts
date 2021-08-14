import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KnowledgeBaseMainComponent } from './knowledge-base-main/knowledge-base-main.component';
import { KnowledgeBaseShellComponent } from './knowledge-base-shell/knowledge-base-shell.component';

const routes: Routes = [
  {
    path: '', component: KnowledgeBaseShellComponent,
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
