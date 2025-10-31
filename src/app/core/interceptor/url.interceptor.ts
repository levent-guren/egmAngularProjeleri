import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { API_ENV } from '../../app.config';
import { catchError, EMPTY } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

export const urlInterceptor: HttpInterceptorFn = (req, next) => {
  const url = req.url;
  const env: any = inject(API_ENV);
  const toastr = inject(ToastrService);

  const local = url.startsWith('/favicon.ico') || url.startsWith('/assets/');
  if (!local) {
    req = req.clone({
      url: env.apiUrl + req.url
    });
  }
  return next(req).pipe(
    catchError((err, caught) => {
      toastr.error("Hata oluştu");
      return EMPTY;
    })
  );
};
