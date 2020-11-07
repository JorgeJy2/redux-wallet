import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {

  user: User;
  userSubscribe: Subscription;

  constructor(private auth: AuthService, private router: Router, private store: Store<AppState>) {
    this.userSubscribe = this.store.select('auth')
      .pipe(
        filter(({ user }) => {
          return user != null;
        })
      )
      .subscribe(({ user }) => {
        this.user = user;
      });
  }
  ngOnDestroy(): void {
    this.userSubscribe.unsubscribe();
  }

  ngOnInit(): void {
  }
  onLogout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

}
