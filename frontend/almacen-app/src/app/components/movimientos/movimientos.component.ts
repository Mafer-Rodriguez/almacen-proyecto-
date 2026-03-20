import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { Movimiento, DetalleMovimiento } from '../../models/movimiento';
import { Producto } from '../../models/producto';
import { ProductosService } from '../../services/productos.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-movimientos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './movimientos.component.html',
  styleUrl: './movimientos.component.css'
})
export class MovimientosComponent implements OnInit {

  movimientos: any[] = [];
  productos: Producto[] = [];
  mostrarFormulario = false;

  nuevoMovimiento: Movimiento = {
    id_usuario: 0,
    tipo: 'entrada',
    observacion: '',
    detalles: []
  };

  nuevoDetalle: DetalleMovimiento = {
    id_producto: 0,
    cantidad: 1
  };

  constructor(
    private authService: AuthService,
    private productosService: ProductosService,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    this.cargarMovimientos();
    this.cargarProductos();
  }

  cargarMovimientos() {
    this.http.get(`${environment.apiUrl}/movimientos`).subscribe({
      next: (res: any) => this.movimientos = res.datos,
      error: (err) => console.error(err)
    });
  }

  cargarProductos() {
    this.productosService.getProductos().subscribe({
      next: (res) => this.productos = res.datos,
      error: (err) => console.error(err)
    });
  }

  abrirFormulario() {
    const usuario = this.authService.getUsuarioActual();
    this.nuevoMovimiento = {
      id_usuario: usuario?.id_usuario ?? 0,
      tipo: 'entrada',
      observacion: '',
      detalles: []
    };
    this.nuevoDetalle = { id_producto: 0, cantidad: 1 };
    this.mostrarFormulario = true;
  }

  agregarDetalle() {
    if (this.nuevoDetalle.id_producto === 0 || this.nuevoDetalle.cantidad < 1) return;
    const producto = this.productos.find(p => p.id_productos === this.nuevoDetalle.id_producto);
    this.nuevoMovimiento.detalles!.push({
      ...this.nuevoDetalle,
      nombre_producto: producto?.nombre
    });
    this.nuevoDetalle = { id_producto: 0, cantidad: 1 };
  }

  eliminarDetalle(index: number) {
    this.nuevoMovimiento.detalles!.splice(index, 1);
  }

  guardarMovimiento() {
    if (this.nuevoMovimiento.detalles!.length === 0) {
      alert('Agrega al menos un producto al movimiento');
      return;
    }
    this.http.post(`${environment.apiUrl}/movimientos`, this.nuevoMovimiento).subscribe({
      next: () => {
        alert('¡Movimiento registrado correctamente!');
        this.cargarMovimientos();
        this.mostrarFormulario = false;
      },
      error: (err) => console.error(err)
    });
  }

  regresar() {
    this.router.navigate(['/dashboard']);
  }
}