import { Component, OnInit, OnDestroy, TemplateRef } from '@angular/core';
import { Ticket } from '../../modelos/tickets';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import { EstadotkService } from '../../servicios/estadotk.service';
import { HallsService } from '../../servicios/halls.service';
import { EquiposService } from '../../servicios/equipos.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { formatDate } from '@angular/common';
import { TicketsService } from 'src/app/servicios/tickets.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-ticketnew',
  templateUrl: './ticketnew.component.html',
  styleUrls: ['./ticketnew.component.css']
})
export class TicketnewComponent implements OnInit, OnDestroy {

  constructor(
    private usserv: UsuariosService,
    private estserv: EstadotkService,
    private hallserv: HallsService,
    private equiserv: EquiposService,
    private modalService: BsModalService,
    private tickserv: TicketsService
  ) { }

  public fechaAhora: Date = new Date();

  public hallArray = [];
  public equipoArray = [];
  public equipoFiltrado = [];
  private unsubscribe = new Subject();
  // Registro de alta para ticket
  regAltaTicket: Ticket = {
    fechaIngreso: formatDate(this.fechaAhora, 'dd/MM/yyyy', 'en-US').toString(),
    horaIngreso: formatDate(this.fechaAhora, 'HH:mm', 'en-US'),
    emailUsuario: this.usserv.getStorage('usuarioEmail'),
    sitio: this.usserv.getStorage('sitio'),
    hall: '',
    nombreEquipo: '',
    usuarioEquipo: '',
    desperfecto: '',
    estadoTicket: 'Abierto'
  };
  bsModalRef: BsModalRef;

  ngOnInit() {
    this.hallserv.getHalls()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(res => { this.hallArray = res; });
    this.equiserv.getEquipos()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(res => { this.equipoArray = res; });
  }
  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  seleccionaHall(hall: string) {
    this.equipoFiltrado =  this.equipoArray.filter(dato => dato.hall === hall);
  }
  abrirTicket(registro: Ticket) {
    if (this.regAltaTicket.desperfecto.length > 0 &&
      this.regAltaTicket.hall.length > 0 &&
      this.regAltaTicket.nombreEquipo.length > 0 &&
      this.regAltaTicket.usuarioEquipo.length > 0 ) {

      this.tickserv.addTicket(registro);
    } else {
      // Aca iria el modal de ingreso de datos
      this.bsModalRef = this.modalService.show(ModalContentComponent);
      this.bsModalRef.content.closeBtnName = 'Close';
    }
    // limpio los datos para nuevo ingreso
    this.regAltaTicket = {
      fechaIngreso: formatDate(this.fechaAhora, 'dd/MM/yyyy', 'en-US').toString(),
      horaIngreso: formatDate(this.fechaAhora, 'HH:mm', 'en-US'),
      emailUsuario: this.usserv.getStorage('usuarioEmail'),
      sitio: this.usserv.getStorage('sitio'),
      hall: '',
      nombreEquipo: '',
      usuarioEquipo: '',
      desperfecto: '',
      estadoTicket: 'Abierto'
    };
  }
}

@Component({
  selector: 'app-modal-content',
  template: `
    <div class="modal-header">
      <h4 class="modal-title pull-left">Error: Faltan datos!</h4>
      <button type="button" class="close pull-right" aria-label="Close" (click)="bsModalRef.hide()">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <p> Debe completar todos los campos para realizar el alta del ticket </p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-default" (click)="bsModalRef.hide()">Cerrar</button>
    </div>
  `
})
export class ModalContentComponent implements OnInit {

  constructor(public bsModalRef: BsModalRef) {}
  ngOnInit() {
  }
}