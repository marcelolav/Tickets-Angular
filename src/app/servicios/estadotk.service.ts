import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { EstadoTicket } from '../modelos/estadoTicket';
@Injectable({
  providedIn: 'root'
})
export class EstadotkService {

  estadosCollection: AngularFirestoreCollection<EstadoTicket>;
  estados: Observable<EstadoTicket[]>
  estadosDoc: AngularFirestoreDocument<EstadoTicket>;

  constructor(public afs: AngularFirestore) { 
    this.estadosCollection = this.afs.collection('Estados');
    this.estados = this.estadosCollection.snapshotChanges()
      .pipe(map(
        actions => actions.map(a => {
          const data = a.payload.doc.data() as EstadoTicket;
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      ));
  }

  getEstados() {
    return this.estados;
  }
  addEstado(estado: EstadoTicket) {
    this.estadosCollection.add(estado);
  }
  deleteEstado(estado: EstadoTicket) {
    this.estadosDoc = this.afs.doc(`Estados/${estado.id}`);
    this.estadosDoc.delete();
  }
  updateEstado(estado: EstadoTicket) {
    this.estadosDoc = this.afs.doc(`Estados/${estado.id}`);
    this.estadosDoc.update(estado);
  }
}
