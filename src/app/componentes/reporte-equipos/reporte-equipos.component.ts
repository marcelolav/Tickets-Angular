import { Component, OnInit, OnDestroy } from '@angular/core';
import { EquiposService } from 'src/app/servicios/equipos.service';
import { ExcelService } from '../../servicios/excel.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { AuditoriaService } from 'src/app/servicios/auditoria.service';
import { ExportAsService, ExportAsConfig, SupportedExtensions  } from 'ngx-export-as';
@Component({
  selector: 'app-reporte-equipos',
  templateUrl: './reporte-equipos.component.html',
  styleUrls: ['./reporte-equipos.component.css']
})
export class ReporteEquiposComponent implements OnInit, OnDestroy {

  datosEquipo = [];
  equipoFiltro: any = { nombreEquipo: '' };
  orden = 'nombreEquipo';
  reverse = false;
  exportAsConfig: ExportAsConfig = {
    type: 'pdf', // the type you want to download
    elementId: 'tablaEquipos', // El id de la tabla que se quiere enviar a pdf
    options: {
      jsPDF: {
        orientation: 'landscape'
      }
    }
  };
  constructor(
    private eqserv: EquiposService,
    private auserv: AuditoriaService,
    private exserv: ExcelService,
    private exportAsService: ExportAsService) { }

  private unsubscribe = new Subject();
  ngOnInit() {
    this.eqserv.getEquipos()
                        .pipe(takeUntil(this.unsubscribe))
                        .subscribe(res => {this.datosEquipo = res; });

    // this.auserv.addAuditoria(this.usserv.getStorage('sitio'), this.usserv.getStorage('usuarioEmail'), 'Reporte de Equipos');
  }
  configuroOrden(value: string) {
    if (this.orden === value) {
      this.reverse = !this.reverse;
    }
    this.orden = value;
  }
  ngOnDestroy(){
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
  exportXLS(): void {
    this.exserv.exportAsExcelFile(this.datosEquipo, 'equipos');
 }
 exportPDF(type: SupportedExtensions, opt?: string) {
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
