import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MsalBroadcastService, MsalGuardConfiguration, MsalService, MSAL_GUARD_CONFIG } from '@azure/msal-angular';
import { AuthenticationResult, EventMessage, EventType, InteractionStatus, InteractionType, PopupRequest, RedirectRequest } from '@azure/msal-browser';
import { Subject, Subscription } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { AppConstants } from 'src/app/shared/utility/app-constants';
import { b2cPolcies } from 'src/app/shared/utility/b2c-config';
import { Payload } from '../models/payload';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginDisplay = false;
  isIframe = false;
  private readonly _destroying$ = new Subject<void>();
  //  displayName = '';
  //  isLoggedIn = false;
  //  passwordResetAuthority = AppConstants.resetAuthority;
  //  subscriptions: Subscription[] = [];

  constructor(@Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
              private authService: MsalService,
              private msalBroadcastService: MsalBroadcastService) { }

  ngOnInit(): void {
    this.isIframe = window !== window.parent && !window.opener;
    this.setLoginDisplay();
    
    this.msalBroadcastService.inProgress$
    .pipe(
      filter((status: InteractionStatus) => status === InteractionStatus.None),
      takeUntil(this._destroying$)
    )
    .subscribe(() => {
      this.setLoginDisplay();
      this.checkAndSetActiveAccount();
    });

    this.msalBroadcastService.msalSubject$
      .pipe(
        filter((msg: EventMessage) => msg.eventType === EventType.LOGIN_SUCCESS || msg.eventType === EventType.ACQUIRE_TOKEN_SUCCESS),
        takeUntil(this._destroying$)
      )
      .subscribe((result: EventMessage) => {

        let payload: Payload = <AuthenticationResult>result.payload;

        /**
         * For the purpose of setting an active account for UI update, we want to consider only the auth response resulting
         * from SUSI flow. "tfp" claim in the id token tells us the policy (NOTE: legacy policies may use "acr" instead of "tfp").
         * To learn more about B2C tokens, visit https://docs.microsoft.com/en-us/azure/active-directory-b2c/tokens-overview
         */
        if (payload.idTokenClaims['tfp'] === b2cPolcies.names.editProfile) {
          window.alert('Profile has been updated successfully. \nPlease sign-in again.');
          return this.logout();
        }

        return result;
      });
    // let loginSuccessSubscription: Subscription;
    // let loginFailureSubscription: Subscription;

    // loginSuccessSubscription = this.broadcastService.subscribe(
    //   "msal:loginSuccess",
    //   (success) => {
    //     // We need to reject id tokens that were not issued with the default sign-in policy.
    //     // "acr" claim in the token tells us what policy is used (NOTE: for new policies (v2.0), use "tfp" instead of "acr")
    //     // To learn more about b2c tokens, visit https://docs.microsoft.com/en-us/azure/active-directory-b2c/tokens-overview
    //     if (success.idToken.claims["acr"] === AppConstants.signupsigninpolicyid) {
    //       window.alert(
    //         "Password has been reset successfully. \nPlease sign-in with your new password"
    //       );
    //       return this.authService.logout();
    //     }
    //     console.log(
    //       "login succeeded. id token acquired at: " + new Date().toString()
    //     );
    //     console.log(success);
    //     this.checkAccount();
    //   }
    // );

    // loginFailureSubscription = this.broadcastService.subscribe(
    //   "msal:loginFailure",
    //   (error) => {
    //     console.log("login failed");
    //     console.log(error);

    //     // Check for forgot password error
    //     // Learn more about AAD error codes at https://docs.microsoft.com/en-us/azure/active-directory/develop/reference-aadsts-error-codes
    //     if (error.errorMessage.indexOf(AppConstants.loginFailureErrorCode) > -1) {
    //       {
    //         this.authService.loginPopup({
    //           authority: this.passwordResetAuthority,
    //         });
    //       }
    //     }
    //     this.checkAccount();
    //   }
    // );

    // this.subscriptions.push(loginSuccessSubscription);
    // this.subscriptions.push(loginFailureSubscription);
    // this.checkAccount();
  }

  setLoginDisplay() {
    this.loginDisplay = this.authService.instance.getAllAccounts().length > 0;
    console.log(this.authService.instance.getAllAccounts());
  }

  checkAndSetActiveAccount(){
    /**
     * If no active account set but there are accounts signed in, sets first account to active account
     * To use active account set here, subscribe to inProgress$ first in your component
     * Note: Basic usage demonstrated. Your app may require more complicated account selection logic
     */
    let activeAccount = this.authService.instance.getActiveAccount();

    if (!activeAccount && this.authService.instance.getAllAccounts().length > 0) {
      let accounts = this.authService.instance.getAllAccounts();
      this.authService.instance.setActiveAccount(accounts[0]);
    }
  }

  login(userFlowRequest?: RedirectRequest | PopupRequest) {
    if (this.msalGuardConfig.interactionType === InteractionType.Popup) {
      if (this.msalGuardConfig.authRequest) {
        this.authService.loginPopup({...this.msalGuardConfig.authRequest, ...userFlowRequest} as PopupRequest)
          .subscribe((response: AuthenticationResult) => {
            this.authService.instance.setActiveAccount(response.account);
          });
      } else {
        this.authService.loginPopup(userFlowRequest)
          .subscribe((response: AuthenticationResult) => {
            this.authService.instance.setActiveAccount(response.account);
          });
      }
    } else {
      if (this.msalGuardConfig.authRequest){
        this.authService.loginRedirect({...this.msalGuardConfig.authRequest, ...userFlowRequest} as RedirectRequest);
      } else {
        this.authService.loginRedirect(userFlowRequest);
      }
    }
  }

  logout() {
    if (this.msalGuardConfig.interactionType === InteractionType.Popup) {
      this.authService.logoutPopup({
        mainWindowRedirectUri: "/"
      });
    } else {
      this.authService.logoutRedirect();
    }
  }

  editProfile() {
    let editProfileFlowRequest = {
      scopes: ["openid"],
      authority: b2cPolcies.authorities.editProfile.authority,
    };

    this.login(editProfileFlowRequest);
  }

  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }

  // onLogin() {
  //   if (this.isLoggedIn) {
  //     this.authService.logout();
  //   } else {
  //     this.authService
  //       .loginPopup()
  //       .then((result) => {
  //         console.log("Login success", result);
  //       })
  //       .catch((err) => {
  //         console.log("Login failed : ", err);
  //       });
  //   }
  // }

  // checkAccount() {
  //   this.isLoggedIn = !!this.authService.getAccount();
  //   if(this.isLoggedIn) {
  //     this.displayName = this.authService.getAccount().name;
  //   } else {
  //     this.displayName = '';
  //   }
  // }

}
