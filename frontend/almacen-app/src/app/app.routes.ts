import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProductosComponent } from './components/productos/productos.component';
import { CatalogoComponent } from './components/catalogo/catalogo.component';
import { MovimientosComponent } from './components/movimientos/movimientos.component';
import { SolicitudesComponent } from './components/solicitudes/solicitudes.component';
import { authGuard } from './guards/auth.guard';
import { roleGuard } from './guards/role.guard';
import { UsuariosComponent } from './components/usuarios/usuarios.component';

export const routes: Routes = [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard, roleGuard],// protege la ruta, solo usuarios logueados pueden entrar.
    data: { roles: ['empleado'] }// protege la ruta, solo usuarios logueados pueden entrar. 
  },
  {
    path: 'productos',
    component: ProductosComponent,
    canActivate: [authGuard, roleGuard],// protege la ruta por login y por rol, solo usuarios logueados con el rol de empleado pueden entrar.
    data: { roles: ['empleado'] }// le dice a roleGuard que roles pueden acceder a esta ruta, en este caso solo el rol de empleado.
  },
  {
    path: 'movimientos',
    component: MovimientosComponent,
    canActivate: [authGuard, roleGuard],
    data: { roles: ['empleado'] }
  },
  {
    path: 'solicitudes',
    component: SolicitudesComponent,
    canActivate: [authGuard, roleGuard],
    data: { roles: ['empleado'] }
  },
  {
    path: 'catalogo',
    component: CatalogoComponent,
    canActivate: [authGuard, roleGuard],
    data: { roles: ['maestro', 'alumno'] }
  },
  {
    path: 'usuarios',
    loadComponent: () => import('./components/usuarios/usuarios.component').then(m => m.UsuariosComponent),
    canActivate: [authGuard, roleGuard],
    data: { roles: ['empleado'] }
  },
  { path: '**', redirectTo: 'login' }//si alguien escribe una URL que no existe, lo redirige al login.
];
