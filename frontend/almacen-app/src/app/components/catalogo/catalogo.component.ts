import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductosService } from '../../services/productos.service';
import { SolicitudesService } from '../../services/solicitudes.service';
import { AuthService } from '../../services/auth.service';
import { UsuariosService } from '../../services/usuarios.service'; 
import { Producto } from '../../models/producto';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './catalogo.component.html',
  styleUrl: './catalogo.component.css'
})
export class CatalogoComponent implements OnInit {

  productos: Producto[] = [];
  mostrarFormulario = false;
  productoSeleccionado: Producto | null = null;
  cantidadSolicitud = 1;
  observacion = '';

  constructor(
    private productosService: ProductosService,
    private solicitudesService: SolicitudesService,
    private authService: AuthService,
    private usuariosService: UsuariosService, // ← nuevo
    private router: Router
  ) {}

  ngOnInit() {
    this.cargarProductos();
  }

  cargarProductos() {
    this.productosService.getProductos().subscribe({
      next: (res) => this.productos = res.datos,
      error: (err) => console.error(err)
    });
  }

  abrirSolicitud(producto: Producto) {
    this.productoSeleccionado = producto;
    this.cantidadSolicitud = 1;
    this.observacion = '';
    this.mostrarFormulario = true;
  }

  enviarSolicitud() {
    const usuario = this.authService.getUsuarioActual();
    if (!usuario || !this.productoSeleccionado) return;

    // Buscar id_usuario en MySQL por email
    this.usuariosService.getUsuarioPorEmail(usuario.email).subscribe({
      next: (res) => {
        const solicitud = {
          id_usuario: res.datos.id_usuarios,
          id_producto: this.productoSeleccionado!.id_productos!,
          cantidad: this.cantidadSolicitud,
          estado: 'pendiente' as const,
          observacion: this.observacion,
          fecha: new Date()
        };

        this.solicitudesService.crearSolicitud(solicitud).subscribe({
          next: () => {
            alert('¡Solicitud enviada correctamente!');
            this.mostrarFormulario = false;
          },
          error: (err) => console.error(err)
        });
      },
      error: (err) => console.error('Usuario no encontrado en MySQL:', err)
    });
  }

  regresar() {
    this.router.navigate(['/dashboard']);
  }
}