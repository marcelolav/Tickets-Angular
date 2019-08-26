import { Component, OnInit, OnDestroy, TemplateRef  } from '@angular/core';
import { EquiposService } from '../../servicios/equipos.service';
import { Equipos } from '../../modelos/equipos';
import { takeUntil, toArray } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { AuditoriaService } from 'src/app/servicios/auditoria.service';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { HallsService } from '../../servicios/halls.service'
import { Halls } from 'src/app/modelos/halls';
@Component({
  selector: 'app-abmequipos',
  templateUrl: './abmequipos.component.html',
  styleUrls: ['./abmequipos.component.css']
})
export class AbmequiposComponent implements OnInit, OnDestroy {

  regEquipo = {} as Equipos;
  modalRef: BsModalRef;
  arregloHall = [];

  constructor(private modalService: BsModalService,
              private eqserv: EquiposService,
              private auserv: AuditoriaService,
              private usserv: UsuariosService,
              private hallserv: HallsService) { }

  private unsubscribe = new Subject();
  equipo = [];

  ngOnInit() {
    this.getEquipos();
    this.hallserv.getHalls().subscribe(res => { this.arregloHall = res; });
    // this.auserv.addAuditoria(this.usserv.getStorage('sitio'), this.usserv.getStorage('usuarioEmail'), 'Ingreso a A-B-M Equipos');
  }

  getEquipos() {
    this.eqserv.getEquipos()
                      .pipe(takeUntil(this.unsubscribe))
                      .subscribe(res => {this.equipo = res; });
  }
  onSubmit() {
    this.eqserv.addEquipo(this.regEquipo);
    this.regEquipo = {} as Equipos;
  }
  ngOnDestroy(){
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
  openModal(template: TemplateRef<any>, data: any) {
    this.regEquipo = {
      id: data.id,
      hall: data.hall,
      nombreEquipo: data.nombreEquipo
    }
    this.modalRef = this.modalService.show(template);
  }
  modificarEquipo(regEquipo) {
    this.eqserv.updateEquipo(regEquipo);
    this.modalRef.hide();
  }
  eliminarEquipo(datos) {
    this.eqserv.deleteEquipo(datos);
    this.modalRef.hide();
  }
  decline(): void {
    this.modalRef.hide();
  }
  equiposHall(hall: string) {
    const arrayEquipos = this.equipo;
    const equiposFiltrados = arrayEquipos.filter(datafiltro => datafiltro.hall === hall);
    return equiposFiltrados;
  }

  botonFiltroPrueba(hall: string) {
    const xx = this.equiposHall(hall);
  }
}
