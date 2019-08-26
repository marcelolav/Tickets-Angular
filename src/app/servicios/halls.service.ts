import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map, retryWhen, filter } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Halls } from '../modelos/halls';

@Injectable({
  providedIn: 'root'
})
export class HallsService {

  hallsCollection: AngularFirestoreCollection<Halls>;
  halls: Observable<Halls[]>;
  hallsDoc: AngularFirestoreDocument<Halls>;

  regHall: {};

  constructor(public afs: AngularFirestore) { 
    this.hallsCollection = this.afs.collection('Halls');
    this.halls = this.hallsCollection.snapshotChanges().pipe(
      map(
        actions => actions.map(a => {
          const data = a.payload.doc.data() as Halls;
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      ));
  }

  getHalls() {
    return this.halls;
  }
  addHall(hall: Halls) {
    this.hallsCollection.add(hall);
  }
  deleteHall(hall: Halls) {
    this.hallsDoc = this.afs.doc(`Halls/${hall.id}`);
    this.hallsDoc.delete();
  }
  updateHall(hall: Halls) {
    this.hallsDoc = this.afs.doc(`Halls/${hall.id}`);
    this.hallsDoc.update(hall);
  }
}
