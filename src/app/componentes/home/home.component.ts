import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsuariosService } from '../../servicios/usuarios.service';
// Componente página de inicio,
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private usserv: UsuariosService) { }

  public isLogged = false;
  public usuarioEmail = this.usserv.getStorage('usuarioEmail');
  public rolUsuario = this.usserv.getStorage('rol');
  public sitio = this.usserv.getStorage('sitio');

  ngOnInit() {
    this.esUsuarioLogueado();
  }

  esUsuarioLogueado() {
    const estalogueado = this.usserv.getStorage('isLogged');
    if (estalogueado === '1') {
      this.isLogged = true;
      this.usuarioEmail = this.usserv.getStorage('usuarioEmail');
      this.rolUsuario = this.usserv.getStorage('rol');
      this.sitio = this.usserv.getStorage('sitio');
    } else {
      this.isLogged = false;
    }
    return this.isLogged;
  }

}
