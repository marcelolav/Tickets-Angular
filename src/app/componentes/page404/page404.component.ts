import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import { AuditoriaService } from 'src/app/servicios/auditoria.service';

@Component({
  selector: 'app-page404',
  templateUrl: './page404.component.html',
  styleUrls: ['./page404.component.css']
})
export class Page404Component implements OnInit {

  constructor(private usserv: UsuariosService, private auserv: AuditoriaService) { }

  ngOnInit() {
    // this.auserv.addAuditoria(this.usserv.getStorage('sitio'), this.usserv.getStorage('usuarioEmail'), 'Ingreso a direccion prohibida!');
  }

}
