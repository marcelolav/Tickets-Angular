import { Component, OnInit, OnDestroy, TemplateRef } from '@angular/core';
// Servicios
import { SitiosService } from 'src/app/servicios/sitios.service';
import { AuditoriaService } from 'src/app/servicios/auditoria.service';
// Modelos de datos
import { Sitios } from 'src/app/modelos/sitios';
// RXJS
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
// bsmodales
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-abmsitios',
  templateUrl: './abmsitios.component.html',
  styleUrls: ['./abmsitios.component.css']
})
export class AbmsitiosComponent implements OnInit, OnDestroy {

  regSitio = {} as Sitios ;
  modalRef: BsModalRef;
  sitios = [];

  constructor(
    private sitserv: SitiosService,
    private modalService: BsModalService,
    private auserv: AuditoriaService) { }

  private unsubscribe = new Subject();

  // Evento de inicio . Aca se llaman a todas las funciones que se requieran cuando abre el componente.
  ngOnInit() {
    this.getSitios();   // Obtengo lista de sitios
    // this.auserv.addAuditoria(this.usserv.getStorage('sitio'), this.usserv.getStorage('usuarioEmail'), 'Ingreso a A-B-M Sitios');
  }
  // Obtener la totalidad de sitios y almacenar en array sitios[]
  getSitios() {
    this.sitserv.getSitios()
              .pipe(takeUntil(this.unsubscribe))
              .subscribe(res => {this.sitios = res; });
  }
  // Cuando presiona el boton "GUARDAR" para confirmar la info del sitio y almacenar veo que no llegue vacio.
  // Si llega vacio mando el alert que no esta completo.
  onSubmitSitio() {
    if (this.regSitio.nombre.length > 0 && this.regSitio.responsable.length > 0) {
      this.sitserv.addSitio(this.regSitio);
      this.blanquear();
    } else {
      alert('Error: La información del sitio se encuentra incompleta. Por favor complete la información del sitio!')
    }
  }
  // Pongo en blanco el registro de sitios para grabar el siguiente
  blanquear(){
    return this.regSitio = {} as Sitios;
  }
  // Abrir ventana modal
  openModal(template: TemplateRef<any>, data: any) {
    this.regSitio = {
      id: data.id,
      nombre: data.nombre,
      responsable: data.responsable,
      ubicacion: data.ubicacion,
      telefono: data.telefono,
      detalles: data.detalles
    }
    this.modalRef = this.modalService.show(template);
  }

  modificarSitio(datos) {
    this.sitserv.updateSitio(datos);
    this.blanquear();
    this.modalRef.hide();
  }
  borrarSitioDefinitivo(datos) {
    this.sitserv.deleteSitio(datos);
    this.modalRef.hide();
  }
  // Evento para cuando se cierra o se pasa de pantalla (para no dejar activos los subscribes)
  ngOnDestroy(){
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
  decline() {
    this.modalRef.hide();
  }
}
