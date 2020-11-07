import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { Subscription } from 'rxjs';
import { TYPE_ENTRY_EXIT } from 'src/app/models/entry-exit.model';

import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';
@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit, OnDestroy {

  private itemsSubscription: Subscription;
  totalEntryCount: number = 0;
  totalEntryAmount: number = 0;

  totalExitCount: number = 0;
  totalExitAmount: number = 0;

  // Doughnut
  public doughnutChartLabels: Label[] = ['Entry', 'Exit'];
  public doughnutChartData: MultiDataSet = [];


  constructor(private store: Store<AppState>) {
    this.itemsSubscription = this.store.select('entrysExits')
      .subscribe(({ items }) => {

        this.totalEntryCount = 0;
        this.totalEntryAmount = 0;
        this.totalExitCount = 0;
        this.totalExitAmount = 0;
        items.forEach(
          item => {

            if (item.type === TYPE_ENTRY_EXIT.entry) {
              this.totalEntryCount++;
              this.totalEntryAmount += item.amount;
            } else {
              this.totalExitCount++;
              this.totalExitAmount += item.amount;
            }
          }
        );

        this.doughnutChartData = [[this.totalEntryAmount, this.totalExitAmount]];
      });


  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.itemsSubscription.unsubscribe();
  }


  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

}
