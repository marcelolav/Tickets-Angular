import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import { Router } from '@angular/router';
import { SitiosService } from 'src/app/servicios/sitios.service';
import { AuditoriaService } from 'src/app/servicios/auditoria.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  modalRef: BsModalRef;
  constructor(private usserv: UsuariosService,
              private router: Router,
              private sitserv: SitiosService,
              private auserv: AuditoriaService,
              private modalService: BsModalService) { }
  // Variables para ver nivel de usuario y si esta logueado con mail/password
  public usuarioEmail = '';
  public password = '';
  public rolUsuario = '';
  public sitio = '';
  public estaLogueado = '';
  public isLogged = false;
  public sitiosDisponibles = [];

  ngOnInit() {
    this.sitserv.getSitios().subscribe(respuesta => this.sitiosDisponibles = respuesta);
    if (localStorage.getItem('isLogged') !== undefined && this.usserv.getStorage('isLogged') === '1') {
      this.rolUsuario = this.usserv.getStorage('rol');
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  onLogin(email, password, sitio) {
    if (email !== '' && password !== '' && sitio !== '') {
      this.usserv.loginUsuarioFirebase(email, password)
        .then((res) => {
          if (this.sitio !== null) {
            this.usserv.graboStorage('sitio', this.sitio);
            this.usserv.getCurrentUser(email);
            this.router.navigate(['/inicio']);
            this.isLogged = true;
            // this.auserv.addAuditoria(this.sitio, email, 'Ingreso al sistema de Tickets');
            this.modalRef.hide();
          } else {
            alert('Error: Debe completar los datos para ingresar al sistema!');
          }
          this.router.navigate(['/inicio']);
        })
        .catch(err => console.log('Error: ', err.message));
    }
  }

  onLogout() {
    this.isLogged = false;
    this.usserv.borroStorage();
    this.usserv.logoutUsuarioFirebase();
    this.router.navigate(['/login']);
  }

  devolverRol() {
    return this.usserv.devuelveRol();
  }


}
