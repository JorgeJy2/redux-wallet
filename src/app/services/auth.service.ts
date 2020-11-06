import { Injectable } from '@angular/core';
import { RegisterUser } from '../models/registerUser.model';
import { AngularFireAuth } from '@angular/fire/auth';
import { Login } from '../models/login.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model';
import { FireStoreService } from './fire-store.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: AngularFireAuth, private fireStoreService: FireStoreService) { }

  initAuthListener() {
    this.auth.authState.subscribe((fUser) => {
      console.log(fUser);
      console.log(fUser?.uid);
      console.log(fUser?.email);

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
}
