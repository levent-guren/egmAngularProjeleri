import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpHeaders, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../../shared/service/auth.service';
import { API_ENV } from '../../app.config';
import { BehaviorSubject, catchError, filter, finalize, Observable, switchMap, take, throwError } from 'rxjs';

let refreshInProgress = false;
const refreshSubject = new BehaviorSubject<string | null>(null);

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  const env: any = inject(API_ENV);
  const serverUrl = req.url.startsWith(env.apiUrl);
  const loginUrl = req.url.startsWith(env.apiUrl + '/auth/login');
  const isAuthEndpoint = req.url.startsWith(env.apiUrl + '/auth/');

  if (serverUrl && !loginUrl && auth.isLoggedIn() && !isAuthEndpoint) {
    req = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${auth.token()}`)
    });
  }
  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      if ((err.status === 401 || err.status === 403) && !isAuthEndpoint) {
        return handle401(req, next, auth);
      }
      return throwError(() => err);
    })
  );

};

function handle401(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
  auth: AuthService
): Observable<HttpEvent<unknown>> {
  if (!refreshInProgress) {
    refreshInProgress = true;
    refreshSubject.next(null);
    return auth.refresh().pipe(
      switchMap(({ token }: any) => {
        refreshInProgress = false;
        refreshSubject.next(token);
        //console.log('Token refreshed', token);
        const retryReq = token
          ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` }, withCredentials: true })
          : req.clone({ withCredentials: true });
        return next(retryReq);
      }),
      catchError(err => {
        refreshInProgress = false;
        auth.logout().subscribe({ error: () => { } });
        return throwError(() => err);
      }),
      finalize(() => { refreshInProgress = false; })
    );
  } else {
    return refreshSubject.pipe(
      filter(t => t !== null),
      take(1),
      switchMap(t => {
        const retryReq = t
          ? req.clone({ setHeaders: { Authorization: `Bearer ${t}` }, withCredentials: true })
          : req.clone({ withCredentials: true });
        return next(retryReq);
      })
    );
  }
}
