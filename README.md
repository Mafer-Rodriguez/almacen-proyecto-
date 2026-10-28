#  Sistema de Gestión de Almacén Académico

Aplicación web full stack para administrar el inventario de un almacén universitario: control de productos, registro de entradas y salidas, y un flujo de solicitudes de material para alumnos y maestros.

 **Demo en vivo:** [almacen-app-a8e30.web.app](https://almacen-app-a8e30.web.app)

![Angular](https://img.shields.io/badge/Angular-18-DD0031?logo=angular&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-Express_5-339933?logo=node.js&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-8-4479A1?logo=mysql&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-Auth_%26_Hosting-FFCA28?logo=firebase&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?logo=tailwindcss&logoColor=white)

---

##  Tabla de contenido

- [Descripción](#-descripción)
- [Funcionalidades](#-funcionalidades)
- [Capturas de pantalla](#-capturas-de-pantalla)
- [Tecnologías](#-tecnologías)
- [Arquitectura](#-arquitectura)
- [Estructura del proyecto](#-estructura-del-proyecto)
- [Base de datos](#-base-de-datos)
- [Instalación local](#-instalación-local)
- [API REST](#-api-rest)
- [Despliegue](#-despliegue)
- [Mejoras futuras](#-mejoras-futuras)
- [Autora](#-autora)

---

##  Descripción

En muchos almacenes escolares el préstamo y control de material se lleva en papel o en hojas de cálculo, lo que dificulta saber qué hay disponible y quién pidió qué. Este sistema centraliza esa información en una aplicación web:

- El **personal del almacén** administra el inventario, registra movimientos y aprueba o rechaza solicitudes.
- Los **alumnos y maestros** consultan el catálogo de productos y solicitan material desde cualquier dispositivo.

El acceso es con la cuenta de Google y cada usuario ve únicamente las pantallas que corresponden a su rol.

---

##  Funcionalidades

###  Autenticación y roles
- Inicio de sesión con Google mediante **Firebase Authentication**.
- Registro automático del usuario en MySQL en su primer inicio de sesión (rol inicial: alumno).
- Control de acceso por rol con **guards de Angular**:

| Rol | Acceso |
|---|---|
| **Empleado** | Panel principal, productos, movimientos, solicitudes y usuarios |
| **Maestro** | Catálogo y solicitudes de material |
| **Alumno** | Catálogo y solicitudes de material |

### Productos
- Alta, edición y consulta de productos organizados por **área**.
- **Borrado lógico (soft delete):** los productos se desactivan en lugar de eliminarse, para conservar el historial.

###  Movimientos
- Registro de **entradas y salidas** de almacén.
- Cada movimiento puede incluir **varios productos** con su cantidad (tabla de detalle).

### 📨 Solicitudes
- Alumnos y maestros solicitan productos desde el catálogo indicando cantidad y observaciones.
- El personal del almacén **aprueba o rechaza** cada solicitud; el estado se muestra con colores (pendiente, aprobada, rechazada).

### Usuarios
- Listado de usuarios registrados y **cambio de rol** desde la interfaz.

---

## Capturas de pantalla

> Agrega tus imágenes en una carpeta `docs/img/` y reemplaza las rutas.

| Inicio de sesión | Panel principal |
|---|---|
| ![Login](docs/img/login.png) | ![Dashboard](docs/img/dashboard.png) |

| Productos | Catálogo |
|---|---|
| ![Productos](docs/img/productos.png) | ![Catálogo](docs/img/catalogo.png) |

---

## 🛠️ Tecnologías

**Frontend**
- Angular 18 (componentes standalone)
- TypeScript
- Tailwind CSS
- AngularFire (Firebase Authentication y Firestore)

**Backend**
- Node.js
- Express 5
- mysql2
- dotenv y cors

**Base de datos e infraestructura**
- MySQL (diseño en MySQL Workbench)
- Railway (API y base de datos)
- Firebase Hosting (frontend)

---

##  Arquitectura

```
┌──────────────────────┐      HTTPS / JSON      ┌──────────────────────┐       SQL       ┌─────────────┐
│  Frontend (Angular)  │ ─────────────────────▶ │  API REST (Express)  │ ──────────────▶ │    MySQL    │
│   Firebase Hosting   │ ◀───────────────────── │       Railway        │ ◀────────────── │   Railway   │
└──────────┬───────────┘                        └──────────────────────┘                 └─────────────┘
           │
           │ Inicio de sesión con Google
           ▼
┌──────────────────────┐
│    Firebase Auth     │
└──────────────────────┘
```

El backend sigue una estructura por capas: **rutas → controladores → base de datos**.

---

##  Estructura del proyecto

```
almacen-proyecto-/
├── backend/
│   ├── index.js                 # Punto de entrada, CORS y registro de rutas
│   └── src/
│       ├── config/database.js   # Conexión a MySQL
│       ├── routes/              # Definición de endpoints
│       └── controllers/         # Lógica y consultas SQL
├── database/
│   ├── schema.sql               # Script de creación de la base de datos
│   └── diagrama.mwb             # Diagrama entidad-relación (MySQL Workbench)
└── frontend/
    └── almacen-app/
        └── src/app/
            ├── components/      # login, dashboard, productos, catalogo,
            │                    # movimientos, solicitudes, usuarios
            ├── services/        # Comunicación con la API y autenticación
            ├── guards/          # authGuard y roleGuard
            └── models/          # Interfaces de TypeScript
```

---

##  Base de datos

La base de datos `almacen_db` tiene 7 tablas relacionadas:

| Tabla | Descripción |
|---|---|
| `roles` | Roles del sistema (empleado, maestro, alumno) |
| `usuarios` | Usuarios vinculados a su cuenta de Firebase |
| `areas` | Áreas o categorías del almacén |
| `productos` | Inventario, con cantidad y área |
| `movimientos` | Entradas y salidas registradas por un usuario |
| `detalle_movimientos` | Productos y cantidades de cada movimiento |
| `solicitudes` | Peticiones de material y su estado |

El diagrama completo está en `database/diagrama.mwb`.

---

##  Instalación local

### Requisitos
- [Node.js](https://nodejs.org/) 18 o superior
- [Angular CLI](https://angular.dev/tools/cli) 18 (`npm install -g @angular/cli`)
- MySQL 8
- Un proyecto de [Firebase](https://console.firebase.google.com/) con inicio de sesión de Google habilitado

### 1. Clonar el repositorio

```bash
git clone https://github.com/Mafer-Rodriguez/almacen-proyecto-.git
cd almacen-proyecto-
```

### 2. Crear la base de datos

```bash
mysql -u root -p < database/schema.sql
```

Agrega la columna que usa el borrado lógico de productos y los roles iniciales:

```sql
USE almacen_db;

ALTER TABLE productos ADD COLUMN estado TINYINT NOT NULL DEFAULT 1;

INSERT INTO roles (id_rol, nombre) VALUES
  (1, 'empleado'),
  (2, 'maestro'),
  (3, 'alumno');

INSERT INTO areas (nombre) VALUES ('General');
```

### 3. Configurar y ejecutar el backend

```bash
cd backend
npm install
```

Crea un archivo `.env` dentro de `backend/`:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=tu_contraseña
DB_NAME=almacen_db
```

```bash
npm run dev
```

La API queda disponible en `http://localhost:3000`.

### 4. Configurar y ejecutar el frontend

```bash
cd frontend/almacen-app
npm install
```

Crea el archivo `src/environments/environment.ts` con los datos de tu proyecto de Firebase (Configuración del proyecto → Tus apps → Configuración del SDK):

```ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api',
  firebase: {
    apiKey: 'TU_API_KEY',
    authDomain: 'TU_PROYECTO.firebaseapp.com',
    projectId: 'TU_PROYECTO',
    storageBucket: 'TU_PROYECTO.firebasestorage.app',
    messagingSenderId: 'TU_SENDER_ID',
    appId: 'TU_APP_ID'
  }
};
```

```bash
ng serve
```

Abre `http://localhost:4200`.

> **Primer empleado:** todos los usuarios nuevos se registran como alumno. Para tener acceso de administrador, cambia tu rol en la base de datos:
> ```sql
> UPDATE usuarios SET id_rol = 1 WHERE email = 'tu_correo@ejemplo.com';
> ```

---

## 🔌 API REST

URL base: `/api`

### Productos
| Método | Endpoint | Descripción |
|---|---|---|
| `GET` | `/productos` | Lista los productos con el nombre de su área |
| `POST` | `/productos` | Crea un producto |
| `PUT` | `/productos/:id` | Actualiza un producto completo |
| `PATCH` | `/productos/:id` | Actualiza campos específicos |
| `DELETE` | `/productos/:id` | Desactiva el producto (soft delete) |

### Movimientos
| Método | Endpoint | Descripción |
|---|---|---|
| `GET` | `/movimientos` | Lista los movimientos con el usuario que los registró |
| `POST` | `/movimientos` | Registra un movimiento con sus detalles |

Ejemplo de cuerpo para `POST /movimientos`:

```json
{
  "id_usuario": 1,
  "tipo": "entrada",
  "observacion": "Compra de material",
  "detalles": [
    { "id_producto": 3, "cantidad": 10 },
    { "id_producto": 5, "cantidad": 4 }
  ]
}
```

### Solicitudes
| Método | Endpoint | Descripción |
|---|---|---|
| `GET` | `/solicitudes` | Lista las solicitudes con usuario y producto |
| `POST` | `/solicitudes` | Crea una solicitud |
| `PATCH` | `/solicitudes/:id` | Cambia el estado (`pendiente`, `aprobada`, `rechazada`) |

### Usuarios
| Método | Endpoint | Descripción |
|---|---|---|
| `GET` | `/usuarios` | Lista los usuarios con su rol |
| `GET` | `/usuarios/email/:email` | Busca un usuario por correo |
| `POST` | `/usuarios` | Registra un usuario |
| `PATCH` | `/usuarios/:id` | Cambia el rol de un usuario |

---

## ☁️ Despliegue

- **Backend y base de datos:** [Railway](https://railway.app/). Las variables del archivo `.env` se configuran en el panel del servicio.
- **Frontend:** [Firebase Hosting](https://firebase.google.com/docs/hosting).

```bash
cd frontend/almacen-app
ng build
firebase deploy
```

Recuerda que el dominio del frontend debe estar en la lista de orígenes permitidos de CORS en `backend/index.js`.

---


##  Autora

**María Fernanda Rodríguez**
- Correo: utm22030609@utma.edu.mx
