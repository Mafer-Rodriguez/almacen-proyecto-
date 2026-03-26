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

  //  Cargar productos
  cargarProductos() {
    this.productosService.getProductos().subscribe({
      next: (res: any) => {
        this.productos = res.datos;
      },
      error: (err) => console.error(err)
    });
  }

  //  Producto vacío
  productoVacio(): Producto {
    return { nombre: '', descripcion: '', cantidad: 0, id_area: 1 };
  }

  //  Abrir formulario
  abrirFormulario() {
    this.modoEdicion = false;
    this.productoSeleccionado = this.productoVacio();
    this.mostrarFormulario = true;
  }

  //  Editar producto
  editarProducto(producto: Producto) {
    this.modoEdicion = true;
    this.productoSeleccionado = { ...producto };
    this.mostrarFormulario = true;
  }

  //  Guardar (crear o actualizar)
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

  //  ELIMINAR (SOFT DELETE)
  eliminarProducto(id: number) {
    if (confirm('¿Estás segura de desactivar este producto?')) {
      this.productosService.eliminarProducto(id).subscribe({
        next: (res: any) => {

          //  Mostrar mensaje del backend
          alert(res.mensaje);

          //  Actualizar UI sin recargar
          this.productos = this.productos.map(p =>
            p.id_productos === id
              ? { ...p, estado: 0 }
              : p
          );

        },
        error: (err) => {
          alert('Error al eliminar producto');
          console.error(err);
        }
      });
    }
  }

  //  Regresar
  regresar() {
    this.router.navigate(['/dashboard']);
  }
}