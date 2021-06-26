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
      { path: 'accounts', redirectTo: '/dashboard', pathMatch: 'full' },
			{
				path: 'dashboard',
				loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
			},
      {
				path: 'knowledgebase',
				loadChildren: () => import('./knowledge-base/knowledge-base.module').then(m => m.KnowledgeBaseModule)
			},
      {
				path: 'settings',
				loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule)
			},
      {
				path: 'users',
				loadChildren: () => import('./sub-user/sub-user.module').then(m => m.SubUserModule)
			},
      {
				path: 'integrations',
				loadChildren: () => import('./integration/integration.module').then(m => m.IntegrationModule)
			},
      {
				path: 'subscription',
				loadChildren: () => import('./subscription/subscription.module').then(m => m.SubscriptionModule)
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
