import { ApplicationConfig, LOCALE_ID, provideZoneChangeDetection, TRANSLATIONS } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import localeTr from '@angular/common/locales/tr';
import { registerLocaleData } from '@angular/common';

registerLocaleData(localeTr);

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    {
      provide: LOCALE_ID,
      useValue: 'tr'
    },
  ]
};
