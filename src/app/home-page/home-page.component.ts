import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { AuthenticationResult, EventMessage, EventType } from '@azure/msal-browser';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit{
  loginDisplay = false;

  constructor(private authService: MsalService, 
              private msalBroadcastService: MsalBroadcastService,
              private router: Router) { }

  ngOnInit(): void {
    this.msalBroadcastService.msalSubject$
      .pipe(
        filter((msg: EventMessage) => msg.eventType === EventType.LOGIN_SUCCESS),
      )
      .subscribe({
        next: (result: EventMessage) => {
          console.log(result);
          const payload = result.payload as AuthenticationResult;
          this.authService.instance.setActiveAccount(payload.account);
        },
        error: (error) => console.log(error)
      });

    this.setLoginDisplay();
  }

  setLoginDisplay() {
    this.loginDisplay = this.authService.instance.getAllAccounts().length > 0;    
  }

}
