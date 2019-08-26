import { Component, OnInit } from '@angular/core';
import { SitiosService } from 'src/app/servicios/sitios.service';
import { ExcelService } from '../../servicios/excel.service';
import { ExportAsService, ExportAsConfig, SupportedExtensions  } from 'ngx-export-as';
@Component({
  selector: 'app-reporte-sitios',
  templateUrl: './reporte-sitios.component.html',
  styleUrls: ['./reporte-sitios.component.css']
})
export class ReporteSitiosComponent implements OnInit {

  exportAsConfig: ExportAsConfig = {
    type: 'pdf', // the type you want to download
    elementId: 'tablaSitios', // El id de la tabla que se quiere enviar a pdf
    options: {
      jsPDF: {
        orientation: 'landscape'
      }
    }
  };
  constructor(
    private sitserv: SitiosService,
    private excelService: ExcelService,
    private exportAsService: ExportAsService) { }

  datositio = [];
  sitioFiltro: any = { nombre: '' };

  ngOnInit() {
    this.sitserv.getSitios().subscribe(res => this.datositio = res);
    console.log(this.datositio);
  }
  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.datositio, 'sitios');
  }
  exportAs(type: SupportedExtensions, opt?: string) {
    this.exportAsConfig.type = type;
    if (opt) {
      this.exportAsConfig.options.jsPDF.orientation = opt;
    }
    this.exportAsService.save(this.exportAsConfig, 'reporte-sitios').subscribe(() => {
      // save started
    });
    // this.exportAsService.get(this.config).subscribe(content => {
    //   console.log(content);
    // });
  }

}
