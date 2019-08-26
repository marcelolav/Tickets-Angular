import { Component, OnInit, OnDestroy, TemplateRef } from '@angular/core';
import { EstadotkService } from 'src/app/servicios/estadotk.service';
import { EstadoTicket } from 'src/app/modelos/estadoTicket';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
// bsmodales
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AuditoriaService } from 'src/app/servicios/auditoria.service';

@Component({
  selector: 'app-abmestados',
  templateUrl: './abmestados.component.html',
  styleUrls: ['./abmestados.component.css']
})
export class AbmestadosComponent implements OnInit, OnDestroy {

  regEstado = {} as EstadoTicket;
  modalRef: BsModalRef;
  estado = [];

  constructor(
    private estserv: EstadotkService,
    private modalService: BsModalService,
    private auserv: AuditoriaService
  ) { }

  private unsubscribe = new Subject();

  ngOnInit() {
    this.getEstados();
  }

  getEstados() {
    this.estserv.getEstados()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(res => { this.estado = res; });
  }

  blanquearRegistro() {
    return this.regEstado = {} as EstadoTicket;
  }

  onSubmitEstado() {
    if (this.regEstado.estado.length > 0) {
      this.estserv.addEstado(this.regEstado);
      this.blanquearRegistro();
    } else {
      alert('Error:  Complete la información de estado para agregar!');
    }
  }

  openModal(template: TemplateRef<any>, data: any) {
    this.regEstado = {
      id: data.id,
      estado: data.estado
    }
    this.modalRef = this.modalService.show(template);
  }

  modificarEstado(datos: EstadoTicket) {
    this.estserv.updateEstado(datos);
    this.blanquearRegistro();
    this.modalRef.hide();
  }

  borrarEstadoDefinitivo(datos: EstadoTicket) {
    this.estserv.deleteEstado(datos);
    this.modalRef.hide();
  }

  decline() {
    this.modalRef.hide();
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

}
