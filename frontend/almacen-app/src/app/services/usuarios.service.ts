import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private apiUrl = `${environment.apiUrl}/usuarios`;

  constructor(private http: HttpClient) {}

  getUsuarios(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  actualizarRol(id: number, id_rol: number): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}`, { id_rol });
  }

  getUsuarioPorEmail(email: string): Observable<any> {
  return this.http.get(`${this.apiUrl}/email/${email}`);
}
}