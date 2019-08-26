import { Component, OnInit, OnDestroy, TemplateRef } from '@angular/core';
import { TicketsService } from '../../servicios/tickets.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { EstadotkService } from '../../servicios/estadotk.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Ticket } from '../../modelos/tickets';
import { UsuariosService } from 'src/app/servicios/usuarios.service';


@Component({
  selector: 'app-ticket-cambioestado',
  templateUrl: './ticket-cambioestado.component.html',
  styleUrls: ['./ticket-cambioestado.component.css']
})
export class TicketCambioestadoComponent implements OnInit, OnDestroy {

  constructor(
    private tickServ: TicketsService,
    private modalService: BsModalService,
    private estadotk: EstadotkService,
    private usserv: UsuariosService
  ) { }
  tickets = [];
  rolUsuario = '';
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
  cambiarEstado(ticket: Ticket, estado: string) {
    this.tickServ.updateEstadoTicket(ticket, estado);
    this.modalRef.hide();
  }
  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
  devuelvoRol() {
    this.rolUsuario = this.usserv.getStorage('rol');
    return this.rolUsuario;
  }

}
