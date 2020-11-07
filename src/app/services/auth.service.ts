import { Injectable } from '@angular/core';
import { RegisterUser } from '../models/registerUser.model';
import { AngularFireAuth } from '@angular/fire/auth';
import { Login } from '../models/login.model';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model';
import { FireStoreService } from './fire-store.service';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { setUser, unSetUser } from '../auth/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userSubscription: Subscription;
  private userLoad: User;

  constructor(private auth: AngularFireAuth, private fireStoreService: FireStoreService, private authStore: Store<AppState>) { }

  initAuthListener(): void {
    this.auth.authState.subscribe((fUser) => {
      console.log(fUser);
      if (fUser) {

        this.userSubscription = this.fireStoreService.getInfoUser(fUser.uid)
          .subscribe((userData: User) => {
            this.userLoad = userData;
            this.authStore.dispatch(setUser({ user: userData }));
          });
      } else {
        this.userSubscription.unsubscribe();
        this.authStore.dispatch(unSetUser());
        this.userLoad = null;
      }
    });
  }

  registerUser(userRegister: RegisterUser): Promise<any> {
    console.log('Register service ', userRegister);
    return this.auth.createUserWithEmailAndPassword(userRegister.email, userRegister.password)
      .then(({ user }) => {
        const newUser: User = {
          email: userRegister.email,
          name: userRegister.name,
          uid: user.uid
        };
        return this.fireStoreService.createSchameUser(newUser);
      });
  }

  login(login: Login): Promise<any> {
    console.log(login);
    return this.auth.signInWithEmailAndPassword(login.email, login.password);
  }

  logout(): void {
    this.auth.signOut();
  }

  isAuth(): Observable<boolean> {
    return this.auth.authState.pipe(
      map(fUser => fUser != null)
    );
  }

  get user(): User {
    return this.userLoad;
  }

}
