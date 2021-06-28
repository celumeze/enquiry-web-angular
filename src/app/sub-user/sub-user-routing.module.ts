import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubUserComponent } from './sub-user.component';

const routes: Routes = [
  {
    path: '', component: SubUserComponent,
    data: {
      title: 'Users'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubUserRoutingModule { }
