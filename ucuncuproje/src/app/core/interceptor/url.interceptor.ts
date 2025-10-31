import { HttpInterceptorFn } from '@angular/common/http';
import { ENV } from '../../app.config';
import { inject } from '@angular/core';

export const urlInterceptor: HttpInterceptorFn = (req, next) => {
  const env: any = inject(ENV);

  if (!req.url.startsWith('/assets/') && req.url != '/favicon.ico') {
    // projedeki public/assets dizinine erişilmiyor. 
    // sunucu adresini ekle
    req = req.clone({
      url: env.apiUrl + req.url
    });
  }
  return next(req);
};
