import { HttpHeaders, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../../shared/service/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  const authUrl = req.url.startsWith('/auth/login') ||
    req.url.startsWith('/auth/logout') ||
    req.url.startsWith('/auth/refresh') ||
    req.url.startsWith('/login');
  // url yukarıdakilerden biri ise token'ı request'e ekleme
  if (authService.token != '' && !authUrl) {
    // token var ise
    let headers = req.headers;
    headers = headers.set('authentication', 'Bearer '+authService.token);
    req = req.clone({
      headers
    });
  }
  return next(req);
};
