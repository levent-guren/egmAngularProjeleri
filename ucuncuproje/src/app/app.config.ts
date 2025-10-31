import { ApplicationConfig, InjectionToken, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { urlInterceptor } from './core/interceptor/url.interceptor';
import { environment } from '../environments/environment';
import { authInterceptor } from './core/interceptor/auth.interceptor';

export const ENV = new InjectionToken('env');

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([urlInterceptor, authInterceptor])),
    provideAnimations(),
    provideToastr(),
    {
      provide: ENV,
      useValue: environment
    }
  ]
};
