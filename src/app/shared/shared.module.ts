import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { MaterialModule } from './material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SubscriptionCheckerComponent } from './components/subscription-checker/subscription-checker.component';
import { PricingListComponent } from './components/pricing-list/pricing-list.component';



@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    SubscriptionCheckerComponent,
    PricingListComponent
  ],
  imports: [
    CommonModule,
    MaterialModule  
  ],
  exports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    HttpClientModule,
    FooterComponent,
    HeaderComponent,
    PricingListComponent,
    SubscriptionCheckerComponent
  ]
})
export class SharedModule { }
