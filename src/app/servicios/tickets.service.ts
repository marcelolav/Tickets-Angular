import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Ticket } from '../modelos/tickets';

@Injectable({
  providedIn: 'root'
})
export class TicketsService {
  ticketCollection: AngularFirestoreCollection<Ticket>;
  tickets: Observable<Ticket[]>;
  // ticketsFilter: Observable<Ticket[]>;
  ticketDoc: AngularFirestoreDocument<Ticket>;

  constructor(public afs: AngularFirestore) { 
    this.ticketCollection = this.afs.collection('Tickets');
    this.tickets = this.ticketCollection.snapshotChanges().pipe(map(
      actions => actions.map(a => {
        const data = a.payload.doc.data() as Ticket;
        const id = a.payload.doc.id;
        return { id, ...data };
      })
    ));
  }
  // Devuelve el array completo de tickets
  getTickets() {
    return this.tickets;  // ticket esta definido en el constructor de la clase
  }
  // Devuelve un solo ticket ?????

  // Agrega un nuevo ticket al sistema
  addTicket(ticket: Ticket) {
    this.ticketCollection.add(ticket);
  }
  // Esta funcion borra definitivamente el dato!  NO USADA SOLO EJEMPLO
  deleteTicket(ticket: Ticket) {
    this.ticketDoc = this.afs.doc(`Tickets/${ticket.id}`);
    this.ticketDoc.delete();
  }
  // Actualizar datos del ticket / Sirve pa ir actualizando los datos a medida de paso del tiempo
  updateTicket(ticket: Ticket) {
    this.ticketDoc = this.afs.doc(`Tickets/${ticket.id}`);
    this.ticketDoc.update(ticket);
  }
  // Actualiza solo el estado de un ticket
  updateEstadoTicket(ticket: Ticket, estado: string) {
    this.ticketDoc = this.afs.doc(`Tickets/${ticket.id}`);
    this.ticketDoc.update({estadoTicket: estado});
  }
  // Consulta por estado particular devuelve solo los registros que se encuentren en el where
  // Sirve para listar la info
  devolverEstado(estado: string) {
    return true;
    
    // this.tickets = this.tickets.w
    // this.ticketCollection.where('estado_ticket', '==', estado)).valueChanges();
  }

}
