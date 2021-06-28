import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-knowledge-base',
  templateUrl: './knowledge-base.component.html',
  styleUrls: ['./knowledge-base.component.scss']
})
export class KnowledgeBaseComponent implements OnInit {
  isPayingOrTrialAuthenticatedUser: boolean = false;
  pageTitle: string;
  constructor(private authService: MsalService,
             private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.isPayingOrTrialAuthenticatedUser = this.isLogin() && environment.isPayingOrTrialCustomer;
    this.pageTitle = this.route.snapshot.data['title'];
  }

  isLogin() {
   return this.authService.instance.getAllAccounts().length > 0; 
  }

}
