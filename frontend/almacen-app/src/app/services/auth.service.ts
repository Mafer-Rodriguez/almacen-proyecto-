import { Injectable } from '@angular/core';
import { Auth, signInWithPopup, GoogleAuthProvider, signOut, authState } from '@angular/fire/auth';
import { Firestore, doc, setDoc, getDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Usuario } from '../models/usuario';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usuarioSubject = new BehaviorSubject<Usuario | null>(null);// guarda el usuario actual y notifica a cualquier parte de la app cundo cambia el usuario, por ejemplo cuando se loguea o se cierra sesión, el valor inicial es null porque no hay ningún usuario logueado al iniciar la app.
  usuarioActual$ = this.usuarioSubject.asObservable();

  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private router: Router
  ) {
    // Escuchar cambios de autenticación automáticamente
    authState(this.auth).subscribe(async (user) => {
      if (user) {
        const usuarioRef = doc(this.firestore, 'usuarios', user.uid);
        const usuarioSnap = await getDoc(usuarioRef);
        if (usuarioSnap.exists()) {
          this.usuarioSubject.next(usuarioSnap.data() as Usuario);
        }
      } else {
        this.usuarioSubject.next(null);
      }
    });
  }

  async loginConGoogle() {// inicia sesión con Google, si el usuario es nuevo, lo guarda en Firestore, luego actualiza el usuario actual y redirige según su rol.
  try {
    const provider = new GoogleAuthProvider();
    const resultado = await signInWithPopup(this.auth, provider);
    const user = resultado.user;

    const usuarioRef = doc(this.firestore, 'usuarios', user.uid);
    const usuarioSnap = await getDoc(usuarioRef);

    if (!usuarioSnap.exists()) {
      await setDoc(usuarioRef, {
        nombre: user.displayName,
        email: user.email,
        uid_firebase: user.uid,
        nombre_rol: 'alumno',
        created_at: new Date()
      });
    }

    const datos = usuarioSnap.exists() ? usuarioSnap.data() : {
      nombre: user.displayName,
      email: user.email,
      uid_firebase: user.uid,
      nombre_rol: 'alumno'
    };

    this.usuarioSubject.next(datos as Usuario);
    this.redirigirSegunRol(datos['nombre_rol']);//si es empleado va al dashboard, si es alumno o maestro va al catalogo.

  } catch (error) {
    console.error('Error al iniciar sesión:', error);
  }
}

  private redirigirSegunRol(rol: string) {
  if (rol === 'empleado') {
    this.router.navigate(['/dashboard']);
  } else {
    this.router.navigate(['/catalogo']);
  }
}

  async cerrarSesion() {// cierra sesión, actualiza el usuario actual a null y redirige al login.
  await signOut(this.auth);
  this.usuarioSubject.next(null);
  this.router.navigate(['/login']);
}

getUsuarioActual(): Usuario | null {
  return this.usuarioSubject.value;
}
}