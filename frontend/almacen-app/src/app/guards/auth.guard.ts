import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';//permite inyectar servicios en funciones, en este caso el servicio de autenticación de Firebase.
import { Auth } from '@angular/fire/auth';//
import { map } from 'rxjs/operators';
import { authState } from '@angular/fire/auth';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(Auth);//inyectar un servicio de autenticación de Firebase para verificar si el usuario está logueado o no.
  const router = inject(Router);

  return authState(auth).pipe(//es un observable que emite el estado de autenticación del usuario, es decir, si el usuario está logueado o no.
    map(user => {// si el usuario está logueado, devuelve true y permite el acceso a la ruta, si no, redirige al login y devuelve false.
      if (user) {
        return true;
      } else {
        router.navigate(['/login']);
        return false;
      }
    })
  );
};
