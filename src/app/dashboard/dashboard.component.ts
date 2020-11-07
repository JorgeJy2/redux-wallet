import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import { AppState } from '../app.reducer';
import { Subscription } from 'rxjs';
import { EntryExitService } from '../services/entry-exit.service';
import { EntryExit } from '../models/entry-exit.model';
import * as actionEntryExit from '../entry-exit/entry-exit.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  userSubscription: Subscription;
  movementsSubscription: Subscription;

  constructor(private store: Store<AppState>, private entryExitService: EntryExitService) { }

  ngOnInit(): void {
    this.userSubscription = this.store.select('auth')
      .pipe(
        filter(auth => auth.user !== null)
      )
      .subscribe(({ user }) => {
        this.movementsSubscription =  this.entryExitService.getEntryExist(user.uid).subscribe((items: EntryExit[]) => {
          console.log(items);
          this.store.dispatch(actionEntryExit.setItems({items}));
        });
        console.log(user);
      });
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
    this.movementsSubscription.unsubscribe();
  }

}
