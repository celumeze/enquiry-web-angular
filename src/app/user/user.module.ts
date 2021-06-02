import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MsalBroadcastService, MsalGuard, MsalGuardConfiguration, MsalInterceptor, MsalInterceptorConfiguration, MsalModule, MsalRedirectComponent, MsalService, MSAL_GUARD_CONFIG, MSAL_INSTANCE, MSAL_INTERCEPTOR_CONFIG } from '@azure/msal-angular';
import { BrowserCacheLocation, InteractionType, IPublicClientApplication, PublicClientApplication } from '@azure/msal-browser';
import { LogLevel } from '@azure/msal-common';
import { SharedModule } from '../shared/shared.module';
import { AppConstants } from '../shared/utility/app-constants';
import { apiConfig, b2cPolcies } from '../shared/utility/b2c-config';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const isIE = window.navigator.userAgent.indexOf("MSIE ") > -1 || window.navigator.userAgent.indexOf("Trident/") > -1;

export function loggerCallback(logLevel: LogLevel, message: string) {
  console.log(message);
}

export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth: {
      clientId: "3402051b-96d7-4404-a7a3-70ba114606c3",
      authority: b2cPolcies.authorities.signUpSignIn.authority,
      redirectUri: 'http://localhost:4200/',
      postLogoutRedirectUri: '/',
      knownAuthorities: [b2cPolcies.authorityDomain]
    },
    cache: {
      cacheLocation: BrowserCacheLocation.LocalStorage,
      storeAuthStateInCookie: isIE, // set to true for IE 11
    },
    system: {
      loggerOptions: {
        loggerCallback,
        logLevel: LogLevel.Info,
        piiLoggingEnabled: false
      }
    }
  });
}

export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
  const protectedResourceMap = new Map<string, Array<string>>();
  protectedResourceMap.set(apiConfig.uri, apiConfig.scopes);

  return {
    interactionType: InteractionType.Redirect,
    protectedResourceMap,
  }
}

export function MSALGuardConfigFactory(): MsalGuardConfiguration {
  return {
    interactionType: InteractionType.Redirect,
    authRequest: {
      scopes: [...apiConfig.scopes],
    },
  };
}

@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    SharedModule,
    MsalModule
    // MsalModule.forRoot({
    //   auth:{
    //     clientId:"3402051b-96d7-4404-a7a3-70ba114606c3", Application Id of Application registered in B2C
    //     authority:"https://traviscomms.b2clogin.com/traviscomms.onmicrosoft.com/B2C_1_SignUpIn", signup-signin userflow
    //     validateAuthority:false,
    //     redirectUri:"http://localhost:4200/"
    //   },
    //   cache:{
    //     cacheLocation:"sessionStorage",
    //     storeAuthStateInCookie:false
    //   }
    // },{
    //   consentScopes:[
    //     "user.read","openid","profile"
    //   ]
    // })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
    },
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory
    },
    {
      provide: MSAL_GUARD_CONFIG,
      useFactory: MSALGuardConfigFactory
    },
    {
      provide: MSAL_INTERCEPTOR_CONFIG,
      useFactory: MSALInterceptorConfigFactory
    },
    MsalService,
    MsalGuard,
    MsalBroadcastService
  ],
  bootstrap: [
    LoginComponent,
    MsalRedirectComponent],
  exports: [
    RegisterComponent,
    LoginComponent
  ]
})
export class UserModule { 
  constructor(msalService: MsalService) {
    msalService.loginRedirect({ redirectUri: 'http://loclahost:4200/', scopes: [] });
  }
}
