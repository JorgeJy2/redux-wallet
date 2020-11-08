import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private auth: AuthService, private router: Router) {

  }
  canLoad(): Observable<boolean> {
    return this.auth.isAuth().pipe(
      tap((state: boolean) => {
        if (!state) {
          this.router.navigate(['/login']);
        }
      }),
      take(1)
    );
  }

  canActivate(): Observable<boolean> {
    return this.auth.isAuth().pipe(
      tap((state: boolean) => {
        if (!state) {
          this.router.navigate(['/login']);
        }
      })
    );
  }
}
