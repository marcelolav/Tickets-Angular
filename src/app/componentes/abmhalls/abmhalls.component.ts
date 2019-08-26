import { Component, OnInit, OnDestroy, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { HallsService } from 'src/app/servicios/halls.service';
import { Halls } from 'src/app/modelos/halls';
import { AuditoriaService } from 'src/app/servicios/auditoria.service';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ExportAsService, ExportAsConfig, SupportedExtensions  } from 'ngx-export-as';
@Component({
  selector: 'app-abmhalls',
  templateUrl: './abmhalls.component.html',
  styleUrls: ['./abmhalls.component.css']
})
export class AbmhallsComponent implements OnInit, OnDestroy {

  regHall = {} as Halls;
  hall = [];
  modalRef: BsModalRef;

  exportAsConfig: ExportAsConfig = {
    type: 'pdf', // the type you want to download
    elementId: 'tablaHalls', // El id de la tabla que se quiere enviar a pdf
    options: {
      jsPDF: {
        orientation: 'landscape'
      }
    }
  };

  constructor(
    private modalService: BsModalService,
    private hallsserv: HallsService,
    private auserv: AuditoriaService,
    private usserv: UsuariosService,
    private exportAsService: ExportAsService
  ) { }
  private unsubscribe = new Subject();

  ngOnInit() {
    this.hallsserv.getHalls()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(res => { this.hall = res; });
    // this.auserv.addAuditoria(this.usserv.getStorage('sitio'), this.usserv.getStorage('usuarioEmail'), 'Ingreso a A-B-M Halls');
  }

  onSubmit() {
    this.hallsserv.addHall(this.regHall);
    this.regHall = {} as Halls;
  }

  openModal(template: TemplateRef<any>, data: any) {
    this.regHall = {
      id: data.id,
      nombre: data.nombre,
      observaciones: data.observaciones
    }
    this.modalRef = this.modalService.show(template);
  }

  modificarHall(datos: Halls) {
    this.hallsserv.updateHall(datos);
    this.modalRef.hide();
  }
  decline(): void {
    this.modalRef.hide();
  }
  borrarHallDefinitivo(datos: Halls) {
    this.hallsserv.deleteHall(datos);
    this.modalRef.hide();
  }
  ngOnDestroy(){
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  exportAs(type: SupportedExtensions, opt?: string) {
    this.exportAsConfig.type = type;
    if (opt) {
      this.exportAsConfig.options.jsPDF.orientation = opt;
    }
    this.exportAsService.save(this.exportAsConfig, 'myFile').subscribe(() => {
      // save started
    });
    // this.exportAsService.get(this.config).subscribe(content => {
    //   console.log(content);
    // });
  }
}
