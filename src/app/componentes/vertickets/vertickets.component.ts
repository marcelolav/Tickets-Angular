import { Component, OnInit, OnDestroy } from '@angular/core';
import { TicketsService } from 'src/app/servicios/tickets.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import { AuditoriaService } from 'src/app/servicios/auditoria.service';
import { ExcelService } from '../../servicios/excel.service';
import { ExportAsService, ExportAsConfig, SupportedExtensions } from 'ngx-export-as';
import { FilterPipe } from 'ngx-filter-pipe';
@Component({
  selector: 'app-vertickets',
  templateUrl: './vertickets.component.html',
  styleUrls: ['./vertickets.component.css']
})


export class VerticketsComponent implements OnInit, OnDestroy {

  datostickets = [];
  ticketFiltro: any = { estadoTicket: ''};
  exportAsConfig: ExportAsConfig = {
    type: 'pdf', // the type you want to download
    elementId: 'tablaTickets', // El id de la tabla que se quiere enviar a pdf
    options: {
      jsPDF: {
        orientation: 'landscape'
      }
    }
  };
  constructor(
    private ts: TicketsService,
    private usserv: UsuariosService,
    private auserv: AuditoriaService,
    private excelService: ExcelService,
    private exportAsService: ExportAsService) { }

  private unsubscribe = new Subject();


  ngOnInit() {
    this.getAllTickets();
    console.log(this.datostickets);
     // this.auserv.addAuditoria(this.usserv.getStorage('sitio'),
     //   this.usserv.getStorage('usuarioEmail'), 'Visualiza los tickets en el sistema');
  }

  getAllTickets() {
    this.ts.getTickets()
              .pipe(takeUntil(this.unsubscribe))
              .subscribe(res => {this.datostickets = res; });
  }

  ngOnDestroy(){
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.datostickets, 'tickets');
  }
  exportAs(type: SupportedExtensions, opt?: string) {
    this.exportAsConfig.type = type;
    if (opt) {
      this.exportAsConfig.options.jsPDF.orientation = opt;
    }
    this.exportAsService.save(this.exportAsConfig, 'tickets').subscribe(() => {
      // save started
    });
    // this.exportAsService.get(this.config).subscribe(content => {
    //   console.log(content);
    // });
  }
}
