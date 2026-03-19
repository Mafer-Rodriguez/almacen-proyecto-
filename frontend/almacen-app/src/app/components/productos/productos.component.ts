import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductosService } from '../../services/productos.service';
import { Producto } from '../../models/producto';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent implements OnInit {

  productos: Producto[] = [];
  mostrarFormulario = false;
  modoEdicion = false;
  productoSeleccionado: Producto = this.productoVacio();

  constructor(
    private productosService: ProductosService,
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

  productoVacio(): Producto {
    return { nombre: '', descripcion: '', cantidad: 0, id_area: 1 };
  }

  abrirFormulario() {
    this.modoEdicion = false;
    this.productoSeleccionado = this.productoVacio();
    this.mostrarFormulario = true;
  }

  editarProducto(producto: Producto) {
    this.modoEdicion = true;
    this.productoSeleccionado = { ...producto };
    this.mostrarFormulario = true;
  }

  guardarProducto() {
    if (this.modoEdicion) {
      this.productosService.actualizarProducto(
        this.productoSeleccionado.id_productos!,
        this.productoSeleccionado
      ).subscribe({
        next: () => {
          this.cargarProductos();
          this.mostrarFormulario = false;
        },
        error: (err) => console.error(err)
      });
    } else {
      this.productosService.crearProducto(this.productoSeleccionado).subscribe({
        next: () => {
          this.cargarProductos();
          this.mostrarFormulario = false;
        },
        error: (err) => console.error(err)
      });
    }
  }

  eliminarProducto(id: number) {
    if (confirm('¿Estás segura de eliminar este producto?')) {
      this.productosService.eliminarProducto(id).subscribe({
        next: () => this.cargarProductos(),
        error: (err) => console.error(err)
      });
    }
  }

  regresar() {
    this.router.navigate(['/dashboard']);
  }
}