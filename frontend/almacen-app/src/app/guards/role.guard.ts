import { inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { filter, map, take } from 'rxjs/operators';

export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const rolesPermitidos = route.data['roles'] as string[];

  return authService.usuarioActual$.pipe(
    filter(usuario => usuario !== null),
    take(1),
    map(usuario => {
      if (!usuario) {
        router.navigate(['/login']);
        return false;
      }

      if (rolesPermitidos.includes(usuario!.nombre_rol!)) {
        return true;
      } else {
        if (usuario!.nombre_rol === 'empleado') {
          router.navigate(['/dashboard']);
        } else {
          router.navigate(['/catalogo']);
        }
        return false;
      }
    })
  );
};