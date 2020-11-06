import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class FireStoreService {

  constructor(private firestore: AngularFirestore) { }

  createSchameUser(user: User): Promise<void>{
      return this.firestore.doc(`${user.uid}/user`).set(user);
  }
}
