import { Component, OnInit, OnDestroy, TemplateRef } from '@angular/core';
import { TicketsService } from 'src/app/servicios/tickets.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Ticket } from 'src/app/modelos/tickets';
import { EstadotkService } from 'src/app/servicios/estadotk.service';
@Component({
  selector: 'app-ticket-resolucion',
  templateUrl: './ticket-resolucion.component.html',
  styleUrls: ['./ticket-resolucion.component.css']
})
export class TicketResolucionComponent implements OnInit, OnDestroy {

  constructor(
    private tickServ: TicketsService,
    private modalService: BsModalService,
    private estadotk: EstadotkService
  ) { }

  tickets = [];
  regTicket = {} as Ticket;
  estado = [];
  modalRef: BsModalRef;
  private unsubscribe = new Subject();

  ngOnInit() {
    this.tickServ.getTickets()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(res => { this.tickets = res; });
    this.estadotk.getEstados()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(res => { this.estado = res; });
  }
  openModal(template: TemplateRef<any>, data: any) {
    this.regTicket = data;
    this.modalRef = this.modalService.show(template);
  }
  agregarEvaluacion(evaluacion: Ticket) {
    this.tickServ.updateTicket(evaluacion);
    // cambio de estado a evaluado se puede dejar abierto pero es un estado mas... mas preciso!
    this.tickServ.updateEstadoTicket(evaluacion, 'Evaluado');
    this.modalRef.hide();
  }
  agregarSolucion(solucion: Ticket) {
    this.tickServ.updateTicket(solucion);
    this.modalRef.hide();
        // Cuando se soluciono otro modal 
  }
  actualizaCerrado(tkCerrado: Ticket) {
    this.tickServ.updateTicket(tkCerrado);
    this.modalRef.hide();
  }
  ngOnDestroy(){
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
