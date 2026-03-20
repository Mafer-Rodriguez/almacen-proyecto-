import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SolicitudesService } from '../../services/solicitudes.service';
import { Solicitud } from '../../models/solicitud';

@Component({
  selector: 'app-solicitudes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './solicitudes.component.html',
  styleUrl: './solicitudes.component.css'
})
export class SolicitudesComponent implements OnInit {

  solicitudes: Solicitud[] = [];

  constructor(
    private solicitudesService: SolicitudesService,
    private router: Router
  ) {}

  ngOnInit() {
    this.cargarSolicitudes();
  }

  cargarSolicitudes() {
    this.solicitudesService.getSolicitudes().subscribe({
      next: (res) => this.solicitudes = res.datos,
      error: (err) => console.error(err)
    });
  }

  aprobarSolicitud(id: number) {
    this.solicitudesService.actualizarEstado(id, 'aprobada').subscribe({
      next: () => this.cargarSolicitudes(),
      error: (err) => console.error(err)
    });
  }

  rechazarSolicitud(id: number) {
    this.solicitudesService.actualizarEstado(id, 'rechazada').subscribe({
      next: () => this.cargarSolicitudes(),
      error: (err) => console.error(err)
    });
  }

  getColorEstado(estado: string): string {
    if (estado === 'aprobada') return '#0f9d58';
    if (estado === 'rechazada') return '#ea4335';
    return '#f4b400';
  }

  regresar() {
    this.router.navigate(['/dashboard']);
  }
}