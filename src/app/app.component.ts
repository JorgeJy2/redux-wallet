import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { AppState } from './app.reducer';
import { AuthService } from './services/auth.service';

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
  }

  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
  }

}
