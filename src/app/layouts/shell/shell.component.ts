import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState} from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { getSidebarLayout, State } from '../state';
import { LayoutPageActions } from '../state/actions';

const SMALL_WIDTH_BREAKPOIN = 720;
@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit {
  showFiller = false;
  public isScreenSmall: boolean;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
    toggleSidebar$: Observable<boolean>;

  constructor(private breakpointObserver: BreakpointObserver,
             private router: Router, private store: Store<State>) { }

  ngOnInit(): void {
    this.breakpointObserver.observe([`(max-width: ${SMALL_WIDTH_BREAKPOIN}px)`])
    .subscribe((state: BreakpointState) => {
       this.isScreenSmall = state.matches;
    });
    this.router.navigate(['/accounts/dashboard']);

    this.toggleSidebar$ = this.store.select(getSidebarLayout);
  }

  toggleSidebar(): void {
    this.store.dispatch(LayoutPageActions.toggleSideBar())
  }

}
