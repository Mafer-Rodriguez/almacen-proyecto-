import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private apiUrl = `${environment.apiUrl}/productos`;//la URL base de la API para productos, la obtenemos del archivo de entorno para poder cambiarla fácilmente entre desarrollo y producción.

  constructor(private http: HttpClient) {}//es el servicio de Angular para hacer peticiones HTTP, lo inyectamos en el constructor (API) para poder usarlo en los métodos del servicio.

  getProductos(): Observable<any> {//es como una promesa pero mas poderosa. Cuando llamamos a este método, devuelve un observable que emite la respuesta de la API cuando esté disponible, en este caso, la lista de productos.
    return this.http.get(this.apiUrl);
  }

  getProducto(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  crearProducto(producto: Producto): Observable<any> {
    return this.http.post(this.apiUrl, producto);
  }

  actualizarProducto(id: number, producto: Producto): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, producto);
  }

  actualizarCantidad(id: number, cantidad: number): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}`, { cantidad });
  }

  eliminarProducto(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}