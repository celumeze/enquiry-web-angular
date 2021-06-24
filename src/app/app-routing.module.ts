import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ShellComponent } from './layouts/shell/shell.component';



const appRoutes: Routes = [
  {
    path: 'accounts',
    component: ShellComponent,
    canActivate: [MsalGuard],
    children: [
      { path: 'accounts', redirectTo: '/dashboard/dashboard', pathMatch: 'full' },
			{
				path: 'dashboard',
				loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
			},
    ]
  },
  {
    // Needed for hash routing
    path: 'error',
    component: HomePageComponent
  },
  {   
    // Needed for hash routing
    path: 'state',
    component: ShellComponent,
    canActivate: [MsalGuard],
  },
  {
    // Needed for hash routing
    path: 'code',
    component: ShellComponent,
    canActivate: [MsalGuard]
  },

  {
    path: '',
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
