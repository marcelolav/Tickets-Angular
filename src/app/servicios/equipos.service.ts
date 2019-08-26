import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Equipos } from '../modelos/equipos';
import { database } from 'firebase';
@Injectable({
  providedIn: 'root'
})
export class EquiposService {

  equiposCollection: AngularFirestoreCollection<Equipos>;
  equipos: Observable<Equipos[]>;
  equiposDoc: AngularFirestoreDocument<Equipos>;

  constructor(public afs: AngularFirestore) {
    this.equiposCollection = this.afs.collection('Equipos');
    this.equipos = this.equiposCollection.snapshotChanges().pipe(map(
      actions => actions.map(a => {
        const data = a.payload.doc.data() as Equipos;
        const id = a.payload.doc.id;
        return {id, ...data};
      })
    ));
  }
  getEquipos() {
    return this.equipos;
  }
  addEquipo(equipo: Equipos) {
    this.equiposCollection.add(equipo);
  }
  deleteEquipo(equipo: Equipos) {
    this.equiposDoc = this.afs.doc(`Equipos/${equipo.id}`);
    this.equiposDoc.delete();
  }
  updateEquipo(equipo: Equipos) {
    this.equiposDoc = this.afs.doc(`Equipos/${equipo.id}`);
    this.equiposDoc.update(equipo);
  }
  
}
