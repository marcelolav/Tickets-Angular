import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Sitios } from '../modelos/sitios';


@Injectable({
  providedIn: 'root'
})
export class SitiosService {

  sitiosCollection: AngularFirestoreCollection<Sitios>;
  sitios: Observable<Sitios[]>;
  sitiosDoc: AngularFirestoreDocument<Sitios>;
  constructor(public afs: AngularFirestore) {
    this.sitiosCollection = this.afs.collection('Sitios');
    this.sitios = this.sitiosCollection.snapshotChanges().pipe(map(
      actions => actions.map(a => {
        const data = a.payload.doc.data() as Sitios;
        const id = a.payload.doc.id;
        return {id, ...data};
      })
    ));
  }
  getSitios(){
    return this.sitios;
  }
  addSitio(sitio: Sitios) {
    this.sitiosCollection.add(sitio);
  }
  deleteSitio(sitio: Sitios) {
    this.sitiosDoc = this.afs.doc(`Sitios/${sitio.id}`);
    this.sitiosDoc.delete();
  }
  updateSitio(sitio: Sitios) {
    this.sitiosDoc = this.afs.doc(`Sitios/${sitio.id}`);
    this.sitiosDoc.update(sitio);
  }
}
