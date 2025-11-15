import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { APP_ROUTES } from './app.routes';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

// ✔ Correct path (make sure folder name is correct)
import { environment } from '../environments/environmet';
export const appConfig: ApplicationConfig = {
  providers: [
    // Routing
    provideRouter(APP_ROUTES),

    // 🔥 Firebase App Initialization
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),

    // 🔥 Firestore Provider (mandatory)
    provideFirestore(() => getFirestore())
  ]
};
