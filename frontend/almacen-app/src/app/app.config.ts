import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { routes } from './app.routes';
import { environment } from '../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),//permite hacer peticiones HTTP a tu API de Node.js.
    provideFirebaseApp(() => initializeApp(environment.firebase)),//inicializa la aplicación de Firebase con la configuración proporcionada en el archivo environment.ts.
    provideAuth(() => getAuth()),//configura el servicio de autenticación de Firebase, permitiendo que tu aplicación maneje la autenticación de usuarios.
    provideFirestore(() => getFirestore()),//configura el servicio de Firestore, que es la base de datos en tiempo real de Firebase, permitiendo que tu aplicación interactúe con la base de datos para almacenar y recuperar datos.
  ]
};