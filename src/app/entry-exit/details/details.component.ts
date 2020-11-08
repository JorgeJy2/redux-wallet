import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';
import { EntryExit } from '../../models/entry-exit.model';
import { EntryExitService } from '../../services/entry-exit.service';
import { isLoading, stopLoading } from '../../shared/ui.actions';
import { AppStateWithEntryExit } from '../entry-exit.reducer';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, OnDestroy {

  movementsSubscription: Subscription;

  items: EntryExit[] = [];

  constructor(private store: Store<AppStateWithEntryExit>, private entryExitService: EntryExitService) { }

  ngOnInit(): void {
    this.movementsSubscription = this.store.select('entrysExits').subscribe(({ items }) => this.items = items);
  }
  ngOnDestroy(): void {
    this.movementsSubscription.unsubscribe();
  }

  onDeleteItem(uid: string) {
    console.log(uid);
    this.store.dispatch(isLoading());

    this.entryExitService.deletetEntryExist(uid)
      .catch(err => {
        console.error(err);
      })
      .finally(() => this.store.dispatch(stopLoading()));
    ;


  }

}
