import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Solicitud } from '../models/solicitud';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SolicitudesService {

  private apiUrl = `${environment.apiUrl}/solicitudes`;

  constructor(private http: HttpClient) {}

  getSolicitudes(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  crearSolicitud(solicitud: Solicitud): Observable<any> {
    return this.http.post(this.apiUrl, solicitud);
  }

  actualizarEstado(id: number, estado: string): Observable<any> {// se usa PATCH porque solo queremos actualizar el estado de la solicitud, no toda la solicitud, es una actualización parcial.
    return this.http.patch(`${this.apiUrl}/${id}`, { estado });// de esta forma, solo enviamos el nuevo estado en el cuerpo de la petición, y la API se encarga de actualizar solo ese campo en la solicitud correspondiente.
  }

  eliminarSolicitud(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}