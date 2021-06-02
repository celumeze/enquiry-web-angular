import { NgModule } from '@angular/core';
import { PricingListComponent } from './pricing-list/pricing-list.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page.component';
import { UserModule } from '../user/user.module';

const landingpageRoutes: Routes = [
  { path: '', component: HomePageComponent }
];

@NgModule({
  declarations: [
    HomePageComponent,
    PricingListComponent
  ],
  imports: [
    UserModule,
    SharedModule,
    RouterModule.forChild(landingpageRoutes)    
  ]
})
export class HomePageModule { }
