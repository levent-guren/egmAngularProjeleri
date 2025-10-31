import { ApplicationConfig, InjectionToken, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { urlInterceptor } from './core/interceptor/url.interceptor';
import { authInterceptor } from './core/interceptor/auth.interceptor';
import { environment } from '../environments/environment';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const API_ENV = new InjectionToken('API_ENV');

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([urlInterceptor, authInterceptor])),
    provideAnimations(),
    provideToastr(),
    {
      provide: API_ENV,
      useValue: environment
    },
    provideAnimationsAsync(),
  ]
};
