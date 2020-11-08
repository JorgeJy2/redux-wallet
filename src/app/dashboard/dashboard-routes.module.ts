import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { dashboardRoutes } from './dashboard.routes';

const routesChilds: Routes = [
  {
    path: '', 
    component: DashboardComponent,
    children: dashboardRoutes
  },

];


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routesChilds)
  ],
  exports: [
    RouterModule
  ]
})
export class DashboardRoutesModule { }
