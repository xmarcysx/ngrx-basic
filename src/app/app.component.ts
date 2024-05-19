import {Component, OnInit} from '@angular/core';
import {NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router} from '@angular/router';
import {select, Store} from "@ngrx/store";
import {AuthState} from "./auth/reducers";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {isLoggedIn, isLoggedOut} from "./auth/auth.selectors";
import {login, logout} from "./auth/auth.actions";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    loading = true;

    isLoggedIn$: Observable<boolean>;
    isLoggedOut$: Observable<boolean>;

    constructor(private router: Router,
                private store: Store<AuthState>) {

    }

    ngOnInit() {

      this.router.events.subscribe(event  => {
        switch (true) {
          case event instanceof NavigationStart: {
            this.loading = true;
            break;
          }

          case event instanceof NavigationEnd:
          case event instanceof NavigationCancel:
          case event instanceof NavigationError: {
            this.loading = false;
            break;
          }
          default: {
            break;
          }
        }
      });

      const userProfile = localStorage.getItem('user');

      if (userProfile) {
        this.store.dispatch(login({user: JSON.parse(userProfile)}));
      }


      this.isLoggedIn$ = this.store.pipe(
        select(isLoggedIn)
      );

      this.isLoggedOut$ = this.store.pipe(
        select (isLoggedOut)
      );
    }

    logout() {
      this.store.dispatch(logout());
    }

}
