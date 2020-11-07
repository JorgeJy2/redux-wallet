import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { AppState } from './app.reducer';
import { AuthService } from './services/auth.service';
import { filter } from 'rxjs/operators';
import { unSetItems } from './entry-exit/entry-exit.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'wallet';
  uiSubscription: Subscription;

  constructor(private auth: AuthService, private spinner: NgxSpinnerService,
              private store: Store<AppState>) {
    this.auth.initAuthListener();
  }
  ngOnInit(): void {
    this.uiSubscription = this.store.select('ui').subscribe(({ isLoading }) => {
      isLoading ? this.spinner.show() : this.spinner.hide();
    });

    this.store.select('auth').pipe(
      filter(({user}) =>  user === null)
    ).subscribe(user => {
      console.log('user ',user);
      this.store.dispatch(unSetItems());
    });
  }

  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
  }

}
