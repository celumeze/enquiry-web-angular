import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-subscription-checker',
  templateUrl: './subscription-checker.component.html',
  styleUrls: ['./subscription-checker.component.scss']
})
export class SubscriptionCheckerComponent implements OnInit {
  constructor(private authService: MsalService) { }

  ngOnInit(): void {
  }


}
