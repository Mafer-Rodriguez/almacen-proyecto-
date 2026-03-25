import { Injectable } from '@angular/core';
import { Auth, signInWithPopup, GoogleAuthProvider, signOut, authState } from '@angular/fire/auth';
import { Firestore, doc, setDoc, getDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Usuario } from '../models/usuario';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usuarioSubject = new BehaviorSubject<Usuario | null>(null);
  usuarioActual$ = this.usuarioSubject.asObservable();

  private apiUrl = 'https://almacen-proyecto-production.up.railway.app/api/usuarios';

  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private router: Router,
    private http: HttpClient
  ) {
    // Escuchar cambios de autenticación automáticamente
    authState(this.auth).subscribe(async (user) => {
      if (user) {
        // Opcional: seguir usando Firestore
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

  async loginConGoogle() {
    try {
      const provider = new GoogleAuthProvider();
      const resultado = await signInWithPopup(this.auth, provider);
      const user = resultado.user;

      // Paso A: Verificar en MySQL
      this.http.get(`${this.apiUrl}/email/${user.email}`).subscribe({
        next: (res: any) => {
          // Usuario ya existe en MySQL
          this.usuarioSubject.next(res.datos as Usuario);
          this.redirigirSegunRol(res.datos.nombre_rol);
        },
        error: (err) => {
          if (err.status === 404) {
            // Paso B: Insertar en MySQL si no existe
            const nuevoUsuario = {
              nombre: user.displayName,
              apellidos: '', // puedes pedirlo en un formulario aparte
              email: user.email,
              uid_firebase: user.uid,
              id_rol: 3 // por ejemplo, rol alumno
            };

            this.http.post(this.apiUrl, nuevoUsuario).subscribe({
              next: (res: any) => {
                console.log('Usuario creado en MySQL');
                this.usuarioSubject.next(nuevoUsuario as Usuario);
                this.redirigirSegunRol('alumno');
              },
              error: (error) => console.error('Error al crear usuario en MySQL', error)
            });
          } else {
            console.error('Error inesperado al verificar usuario', err);
          }
        }
      });

      // Opcional: seguir guardando en Firestore
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

  async cerrarSesion() {
    await signOut(this.auth);
    this.usuarioSubject.next(null);
    this.router.navigate(['/login']);
  }

  getUsuarioActual(): Usuario | null {
    return this.usuarioSubject.value;
  }
}
