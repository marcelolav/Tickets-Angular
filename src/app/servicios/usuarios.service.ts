import { Injectable } from '@angular/core';
// Observables
import { Observable } from 'rxjs';
import { map, filter, toArray } from 'rxjs/operators';
// Angular Firestore
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
// Modelo UserInterface
import { UserInterface } from '../modelos/usuarios';
import { Router } from '@angular/router';
// Modulo de encripcion
import * as crypto from 'crypto-js';
import { AuditoriaService } from './auditoria.service';
// Modulo de auditoria

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  usuariosCol: AngularFirestoreCollection<UserInterface>;
  usuariosDoc: AngularFirestoreDocument<UserInterface>;
  usuarios: Observable<UserInterface[]>;
  public respuesta: {};

  constructor(private router: Router, private afsAuth: AngularFireAuth, private afs: AngularFirestore, private audit: AuditoriaService) {
    this.usuariosCol = this.afs.collection<UserInterface>('Usuarios');
    this.usuarios = this.usuariosCol.snapshotChanges().pipe(
      map(actions => {
      return actions.map(action => {
        const data = action.payload.doc.data() as UserInterface;
        const id = action.payload.doc.id;
        return {id, ...data };
      });
    }));
  }
  // Se loguea al servicio de firbase autentication
  loginUsuarioFirebase(email: string, pass: string) {
    return new Promise((resolve, reject) => {
      this.afsAuth.auth.signInWithEmailAndPassword(email, pass)
        .then(userData => resolve(userData), err => reject(err));
    });
  }
  // Logout de firebase
  logoutUsuarioFirebase() {
    return this.afsAuth.auth.signOut().then(() => {
      this.router.navigate(['/inicio']);
    });
  }
  // Verifica si el user esta logueado a firebase y mapea los datos de autorizacion
  isAuth() {
    return this.afsAuth.authState.pipe(map(auth => auth));
  }
  // Retorna la lista completa de la coleccion 'Users'
  getUsuarios() {
    return this.usuarios;
  }
  // Obtiene todos los datos de un usuario especificado por email de la coleccion /usuarios/ de firebase (complemento de auth)
  getCurrentUser(emailUser) {
    this.isAuth().subscribe(auth => {
      if (auth) {
        // Verifica los datos de permisos en la coleccion usuarios
        this.getUsuarios()
          .subscribe(res => {
            let arrayUsuario = [];
            let rolUsuario = '';
            arrayUsuario = res;
            const buscar = arrayUsuario.find(x => x.email === auth.email);
            rolUsuario = buscar.rol;
            // Agrego el rol a la respuesta
            this.graboStorage('isLogged', '1');
            this.graboStorage('usuarioEmail', auth.email);
            this.graboStorage('rol', rolUsuario);
            return;
          });
      } else {
        this.borroStorage();
        return;
      }
    });
  }
  // Registrar usuario en firebase auth (autenticacion propia de firebase)
  registrarUsuarioFirebase(email: string, pass: string) {
    return new Promise((resolve, reject) => {
      this.afsAuth.auth.createUserWithEmailAndPassword(email, pass)
      .then(userData => {
        resolve(userData)
      }).catch(err => console.log(reject(err)))
    });
  }
  // agregar usuario a la collection usuarios con el rol
  agregarUsuarioCollection(email: string, rol: string) {
    this.usuariosCol.add({ email, rol });
  }

  // Grabo en el storage del navegador los datos encriptados
  graboStorage(campo: string, valor: string) {
     if (campo != null && valor != null) {
       localStorage.setItem(campo, crypto.AES.encrypt(valor, 'contrapassword'));
     } else {
       console.log('Valores de localstorage vacios!', campo, valor);
     }
  }
  getStorage(campo) {
    if (campo !== null) {
      const valorCrudo = localStorage.getItem(campo);
      if (valorCrudo !== null) {
        const bytes  = crypto.AES.decrypt(valorCrudo, 'contrapassword');
        const plaintext = bytes.toString(crypto.enc.Utf8);
        return plaintext;
      }
    } else {
      return null;
    }
  }
  borroStorage() {
    localStorage.clear();
    return;
  }
  devuelveRol() {
    return this.getStorage('rol');
  }
}
