import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MsalBroadcastService, MsalGuardConfiguration, MsalService, MSAL_GUARD_CONFIG } from '@azure/msal-angular';
import { AuthenticationResult, EventMessage, EventType, InteractionStatus, InteractionType, PopupRequest, RedirectRequest } from '@azure/msal-browser';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { b2cPolicies } from './shared/utility/b2c-config';
import { Payload } from './user/models/payload';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  //title = 'CommsOnTheFly';
  isIframe = false;
  loginDisplay = false;
  //private readonly _destroying$ = new Subject<void>();

  constructor(
    @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
    private authService: MsalService,
    private msalBroadcastService: MsalBroadcastService
  ) {}

  ngOnInit(): void {
    this.isIframe = window !== window.parent && !window.opener;
    //this.setLoginDisplay();
    
    // this.msalBroadcastService.inProgress$
    // .pipe(
    //   filter((status: InteractionStatus) => status === InteractionStatus.None),
    //   takeUntil(this._destroying$)
    // )
    // .subscribe(() => {
    //   this.setLoginDisplay();
    //   this.checkAndSetActiveAccount();
    // });

    // this.msalBroadcastService.msalSubject$
    //   .pipe(
    //     filter((msg: EventMessage) => msg.eventType === EventType.LOGIN_SUCCESS || msg.eventType === EventType.ACQUIRE_TOKEN_SUCCESS),
    //     takeUntil(this._destroying$)
    //   )
    //   .subscribe((result: EventMessage) => {

        //let payload: Payload = <AuthenticationResult>result.payload;

        /**
         * For the purpose of setting an active account for UI update, we want to consider only the auth response resulting
         * from SUSI flow. "tfp" claim in the id token tells us the policy (NOTE: legacy policies may use "acr" instead of "tfp").
         * To learn more about B2C tokens, visit https://docs.microsoft.com/en-us/azure/active-directory-b2c/tokens-overview
         */
        // if (payload.idTokenClaims['tfp'] === b2cPolicies.names.editProfile) {
        //   window.alert('Profile has been updated successfully. \nPlease sign-in again.');
        //   return this.logout();
        // }

      //   return result;
      // });
  }

  // setLoginDisplay() {
  //   this.loginDisplay = this.authService.instance.getAllAccounts().length > 0;
  // }

  //checkAndSetActiveAccount(){
    /**
     * If no active account set but there are accounts signed in, sets first account to active account
     * To use active account set here, subscribe to inProgress$ first in your component
     * Note: Basic usage demonstrated. Your app may require more complicated account selection logic
     */
  //   let activeAccount = this.authService.instance.getActiveAccount();

  //   if (!activeAccount && this.authService.instance.getAllAccounts().length > 0) {
  //     let accounts = this.authService.instance.getAllAccounts();
  //     this.authService.instance.setActiveAccount(accounts[0]);
  //   }
  // }

  // login(userFlowRequest?: RedirectRequest | PopupRequest) {
  //   if (this.msalGuardConfig.interactionType === InteractionType.Popup) {
  //     if (this.msalGuardConfig.authRequest) {
  //       this.authService.loginPopup({...this.msalGuardConfig.authRequest, ...userFlowRequest} as PopupRequest)
  //         .subscribe((response: AuthenticationResult) => {
  //           this.authService.instance.setActiveAccount(response.account);
  //         });
  //     } else {
  //       this.authService.loginPopup(userFlowRequest)
  //         .subscribe((response: AuthenticationResult) => {
  //           this.authService.instance.setActiveAccount(response.account);
  //         });
  //     }
  //   } else {
  //     if (this.msalGuardConfig.authRequest){
  //       this.authService.loginRedirect({...this.msalGuardConfig.authRequest, ...userFlowRequest} as RedirectRequest);
  //     } else {
  //       this.authService.loginRedirect(userFlowRequest);
  //     }
  //   }
  // }

  // logout() {
  //   if (this.msalGuardConfig.interactionType === InteractionType.Popup) {
  //     this.authService.logoutPopup({
  //       mainWindowRedirectUri: "/"
  //     });
  //   } else {
  //     this.authService.logoutRedirect();
  //   }
  // }

  // editProfile() {
  //   let editProfileFlowRequest = {
  //     scopes: ["openid"],
  //     authority: b2cPolicies.authorities.editProfile.authority,
  //   };

  //   this.login(editProfileFlowRequest);
  // }

  // ngOnDestroy(): void {
  //   this._destroying$.next(undefined);
  //   this._destroying$.complete();
  // }
}
