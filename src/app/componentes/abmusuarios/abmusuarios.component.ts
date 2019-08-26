import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import { UserInterface } from 'src/app/modelos/usuarios';
import { AuditoriaService } from 'src/app/servicios/auditoria.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-abmusuarios',
  templateUrl: './abmusuarios.component.html',
  styleUrls: ['./abmusuarios.component.css']
})
export class AbmusuariosComponent implements OnInit, OnDestroy {

  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';
  regUser = {} as UserInterface;
  private unsubscribe = new Subject();
  formAltaUsuario: FormGroup;

  constructor(private router: Router,
              private usserv: UsuariosService,
              private auserv: AuditoriaService,
              public fb: FormBuilder) {
    this.formAltaUsuario = this.fb.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern(this.emailPattern)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      rol: ['', Validators.required]
    });
  }

  usuarios = [];

  ngOnInit() {
    this.getUsuarios();
    // this.auserv.addAuditoria(this.usserv.getStorage('sitio'), this.usserv.getStorage('usuarioEmail'), 'Ingreso a A-B-M Usuarios');
  }
  getUsuarios(){
    this.usserv.getUsuarios()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(res => {this.usuarios = res; });
  }
  onSubmit() {

    if (this.formAltaUsuario.errors) {
      console.log('hay errores en el form de alta');
    } else {

      const email = this.regUser.email;
      const passw = this.regUser.password;
      const rolus = this.regUser.rol;
      // Crear el usuario en la autenticacion de firebase
      if (email !== undefined && passw !== undefined && rolus !== undefined) {
        this.usserv.registrarUsuarioFirebase(email, passw);
        this.usserv.agregarUsuarioCollection(email, rolus);
      } else {
        console.log('Datos no definidos o en blanco!')
      }
      this.blanquear();
    }
  }
  blanquear() {
    return this.regUser = {} as UserInterface;
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

}
