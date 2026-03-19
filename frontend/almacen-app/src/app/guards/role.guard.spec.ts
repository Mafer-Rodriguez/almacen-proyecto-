import { inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs/operators';

export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const rolesPermitidos = route.data['roles'] as string[];// aqui es donde obtiene los roles permitidos que definenimos en las rutas, por ejemplo empleado, maestro o alumno.

  return authService.usuarioActual$.pipe(//es un observable que emite el usuario actual, es decir, el usuario que está logueado en ese momento.
    map(usuario => {
      if (!usuario) {
        router.navigate(['/login']);
        return false;
      }

      if (rolesPermitidos.includes(usuario.nombre_rol!)) {//como lo dice le nombre, verificamos si el rol del usuario actual está incluido en los roles permitidos para esa ruta, si es así, devuelve true y permite el acceso a la ruta, si no, redirige al dashboard y devuelve false.
        return true;
      } else {
        router.navigate(['/dashboard']);
        return false;
      }
    })
  );
};