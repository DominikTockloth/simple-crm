import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideNativeDateAdapter } from '@angular/material/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { getAuth, provideAuth } from '@angular/fire/auth';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideAnimationsAsync(),
    provideNativeDateAdapter(),
    importProvidersFrom(provideFirebaseApp(() =>
      initializeApp({
        "projectId": "simple-crm-4231e",
        "appId": "1:1079167881255:web:8c10abd2a18169c37b7e02",
        "storageBucket": "simple-crm-4231e.appspot.com",
        "apiKey": "AIzaSyB3OgrZ4idfcvHECwv5mQTybyKflFIUcGE",
        "authDomain": "simple-crm-4231e.firebaseapp.com",
        "messagingSenderId": "1079167881255"
      }))),
      importProvidersFrom(provideFirestore(() => getFirestore())),
      importProvidersFrom(provideDatabase(() => getDatabase())),
      importProvidersFrom(provideAuth(() => getAuth()))]
}
/*
 importProvidersFrom(provideFirestore(() => getFirestore())), importProvidersFrom(provideDatabase(() => getDatabase()))],
       importProvidersFrom(provideAuth(() => getAuth()))
       */