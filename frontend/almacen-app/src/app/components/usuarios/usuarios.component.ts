import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsuariosService } from '../../services/usuarios.service';
import { Usuario } from '../../models/usuario';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  roles = [
    { id_rol: 1, nombre: 'empleado' },
    { id_rol: 2, nombre: 'maestro' },
    { id_rol: 3, nombre: 'alumno' }
  ];

  constructor(
    private usuariosService: UsuariosService,
    private router: Router
  ) {}

  ngOnInit() {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.usuariosService.getUsuarios().subscribe({
      next: (res) => this.usuarios = res.datos,
      error: (err) => console.error(err)
    });
  }

  cambiarRol(usuario: Usuario, id_rol: number) {
    this.usuariosService.actualizarRol(usuario.id_usuarios!, id_rol).subscribe({
      next: () => {
        alert('Rol actualizado correctamente');
        this.cargarUsuarios();
      },
      error: (err) => console.error(err)
    });
  }

  regresar() {
    this.router.navigate(['/dashboard']);
  }
}