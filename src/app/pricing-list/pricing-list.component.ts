import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { loadStripe } from '@stripe/stripe-js';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-pricing-list',
  templateUrl: './pricing-list.component.html',
  styleUrls: ['./pricing-list.component.scss']
})
export class PricingListComponent implements OnInit {

  basicPricePlanId = "price_1ItmzbLWSmhJ473i1bqGi83e";
  stripePromise = loadStripe(environment.stripe);

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
  }


  async signUpToBasic(): Promise<void> {
    this.checkout(this.basicPricePlanId);
  }


  async checkout(pricePlanId: string) {
    const checkoutSession = {
      priceId: pricePlanId,
      successUrl: 'http://localhost:4200/',
      cancelUrl: 'http://localhost:4200/',
    };

    const stripe = await this.stripePromise;
    this.httpClient
    .post(`${environment.apiUrl}/payments`, checkoutSession)
    .subscribe((data: any) => {      
      stripe.redirectToCheckout({
        sessionId: data.sessionId,
      });
    });
  }
}
