import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Auditoria } from '../modelos/auditoria';
import { formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuditoriaService {

  auditoriaCollection: AngularFirestoreCollection<Auditoria>;
  auditoriaDocument: AngularFirestoreDocument<Auditoria>;
  auditoriaObservable: Observable<Auditoria[]>;
  registroAuditoria = {} as Auditoria ;

  constructor(public afs: AngularFirestore) {
    this.auditoriaCollection = this.afs.collection('Auditoria');
    this.auditoriaObservable = this.auditoriaCollection.snapshotChanges().pipe(map(actions => actions.map(a => {
      const data = a.payload.doc.data() as Auditoria;
      const id = a.payload.doc.id;
      return {id, ...data};
    })));
   }

   getAuditoria() {
     return this.auditoriaObservable;
   }
  addAuditoria(site, user, oper) {
    const fechaAct = new Date();
    this.registroAuditoria = {
        fecha: formatDate(fechaAct, 'dd-MM-yyyy hh:mm:ss a', 'en-US', '-0300'),
        sitio: site,
        usuario: user,
        operacion: oper
    };
    this.auditoriaCollection.add(this.registroAuditoria);
   }
   // No hay update ni borrado de auditorias pero se puede implementar.
}
