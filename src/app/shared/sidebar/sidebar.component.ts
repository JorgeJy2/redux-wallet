import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {

  user: User;
  userSubscribe: Observable;

  constructor(private auth: AuthService, private router: Router, private store: Store<AppState>) {
    this.userSubscribe = this.store.select('auth').subscribe(({ user }) => {
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
