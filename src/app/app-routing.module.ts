import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';



const appRoutes: Routes = [
  {
    path: '',
    component: HomePageComponent
  },
  {
    // Needed for hash routing
    path: 'error',
    component: HomePageComponent
  },
  {
    // Needed for hash routing
    path: 'state',
    component: HomePageComponent
  },
  {
    // Needed for hash routing
    path: 'code',
    component: HomePageComponent
  },
];
const isIframe = window !== window.parent && !window.opener;
@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {
      useHash: true,
      // Don't perform initial navigation in iframes
      initialNavigation: !isIframe ? 'enabled' : 'disabled'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
