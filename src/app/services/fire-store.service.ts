import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FireStoreService {

  constructor(private firestore: AngularFirestore) { }

  createSchameUser(user: User): Promise<void>{
      return this.firestore.doc(`${user.uid}/user`).set(user);
  }

  getInfoUser(uId: string): Observable<any> {
    return this.firestore.doc(`${uId}/user`).valueChanges();
  }
}
