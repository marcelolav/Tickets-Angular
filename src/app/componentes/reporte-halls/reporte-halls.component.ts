import { Component, OnInit, OnDestroy } from '@angular/core';
import { HallsService } from '../../servicios/halls.service';
import { AuditoriaService } from 'src/app/servicios/auditoria.service';
import { ExcelService } from 'src/app/servicios/excel.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ExportAsService, ExportAsConfig, SupportedExtensions  } from 'ngx-export-as';
@Component({
  selector: 'app-reporte-halls',
  templateUrl: './reporte-halls.component.html',
  styleUrls: ['./reporte-halls.component.css']
})
export class ReporteHallsComponent implements OnInit, OnDestroy {

  datosHall = [];
  hallFiltro: any = { nombre: '' };
  orden = 'nombre';
  reverse = false;
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
    private hallServ: HallsService,
    private auServ: AuditoriaService,
    private exServ: ExcelService,
    private exportAsService: ExportAsService
  ) { }

  private unsubscribe = new Subject();

  ngOnInit() {
    this.hallServ.getHalls()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(res => { this.datosHall = res; });
  }

  configuroOrden(value: string) {
    if (this.orden === value) {
      this.reverse = !this.reverse;
    }
    this.orden = value;
  }

  exportXLS(): void {
    this.exServ.exportAsExcelFile(this.datosHall, 'halls');
  }
  ngOnDestroy() {
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
