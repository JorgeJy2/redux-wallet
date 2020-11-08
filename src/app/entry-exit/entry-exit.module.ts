import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardComponent } from '../dashboard/dashboard.component';
import { OrderEntryPipe } from '../pipes/order-entry.pipe';
import { DetailsComponent } from './details/details.component';
import { EntryExitComponent } from './entry-exit.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { DashboardRoutesModule } from '../dashboard/dashboard-routes.module';
import { StoreModule } from '@ngrx/store';
import { entryExitReducer } from './entry-exit.reducer';

@NgModule({
  declarations: [
    DashboardComponent,
    EntryExitComponent,
    StatisticsComponent,
    DetailsComponent,
    OrderEntryPipe
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ChartsModule,
    SharedModule,
    RouterModule,
    DashboardRoutesModule,
    StoreModule.forFeature( 'entrysExits', entryExitReducer)
  ]
})
export class EntryExitModule { }
