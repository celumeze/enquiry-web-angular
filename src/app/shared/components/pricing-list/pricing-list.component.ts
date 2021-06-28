import { Component, Inject, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { loadStripe } from '@stripe/stripe-js';
import { environment } from 'src/environments/environment';
import { MsalGuardConfiguration, MsalService, MSAL_GUARD_CONFIG } from '@azure/msal-angular';
import { AuthenticationResult, InteractionType, PopupRequest, RedirectRequest } from '@azure/msal-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pricing-list',
  templateUrl: './pricing-list.component.html',
  styleUrls: ['./pricing-list.component.scss']
})
export class PricingListComponent implements OnInit {

  basicPricePlanId = "price_1ItmzbLWSmhJ473i1bqGi83e";
  stripePromise = loadStripe(environment.stripe);
  loginDisplay = false;
  constructor(private httpClient: HttpClient,
            private authService: MsalService,
            @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
            private router: Router) { }

  ngOnInit(): void {
    this.setLoginDisplay();
  }


  async signUpToBasic(): Promise<void> {
    this.checkout(this.basicPricePlanId);
  }


  async checkout(pricePlanId: string) {    
    const checkoutSession = {
      priceId: pricePlanId,
      successUrl: window.location.href,
      cancelUrl: window.location.href,
      customerEmail: this.getActiveAccount()
    };
    if (this.loginDisplay) {
      const stripe = await this.stripePromise;
      this.httpClient
      .post(`${environment.apiUrl}/payments`, checkoutSession)
      .subscribe((data: any) => {      
        stripe.redirectToCheckout({
          sessionId: data.sessionId,
        });
      });
    }
    else {
        this.login();
    }
    
  }

  setLoginDisplay() {
    this.loginDisplay = this.authService.instance.getAllAccounts().length > 0; 
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
        // this.authService.loginRedirect({...this.msalGuardConfig.authRequest, ...userFlowRequest} as RedirectRequest);
        this.router.navigate(['/accounts']);
      } else {
        this.authService.loginRedirect(userFlowRequest);
      }
    }
  }

  getActiveAccount(): string {
    /**
     * If no active account set but there are accounts signed in, sets first account to active account
     * To use active account set here, subscribe to inProgress$ first in your component
     * Note: Basic usage demonstrated. Your app may require more complicated account selection logic
     */
    let activeAccount = this.authService.instance.getActiveAccount();

    if (!activeAccount && this.authService.instance.getAllAccounts().length > 0) {
      let accounts = this.authService.instance.getAllAccounts();
      return accounts[0].username;
    }
    return activeAccount.username;
  }
}
