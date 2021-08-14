import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { getQnAPairCount, State } from '../state';

@Component({
  selector: 'app-knowledge-base-main',
  templateUrl: './knowledge-base-main.component.html',
  styleUrls: ['./knowledge-base-main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KnowledgeBaseMainComponent implements OnInit {
  isPayingOrTrialAuthenticatedUser: boolean = false;
  pageTitle = 'Knowledge Base';
  @Input() qnaPairCount: string;

  constructor(private authService: MsalService,
    private route: ActivatedRoute, private store: Store<State>) { }

  ngOnInit(): void {
    this.isPayingOrTrialAuthenticatedUser = this.isLogin() && environment.isPayingOrTrialCustomer;
    this.pageTitle = this.route.snapshot.data['title'];
    console.log(this.qnaPairCount);
  }

  isLogin() {
    return this.authService.instance.getAllAccounts().length > 0; 
   }

}
