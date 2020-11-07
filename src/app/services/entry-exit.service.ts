import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { EntryExit } from '../models/entry-exit.model';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EntryExitService {

  constructor(private fireStore: AngularFirestore, private auth: AuthService) { }

  async create(entryExit: EntryExit) {
    console.log(this.auth.user);
    const resultAdd = await this.fireStore.doc(`${this.auth.user.uid}/entry-exit`).collection('items').add(entryExit);
    console.log(resultAdd);
  }

  getEntryExist(uid: string): Observable<EntryExit[]> {
    //valueChanges
    return this.fireStore.collection(`${uid}/entry-exit/items`).snapshotChanges().pipe(
      map(snapshop =>
        snapshop.map(doc =>
          ({
            ...doc.payload.doc.data() as EntryExit,
            uid: doc.payload.doc.id
          })
        )
      )
    );
  }

  deletetEntryExist(uidItem: string): Promise<void>{
    return this.fireStore.doc(`${this.auth.user.uid}/entry-exit/items/${ uidItem}`).delete();
  }
}
