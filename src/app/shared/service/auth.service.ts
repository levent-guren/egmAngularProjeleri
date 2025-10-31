import { HttpClient } from '@angular/common/http';
import { effect, inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  http = inject(HttpClient);
  toastr = inject(ToastrService);
  router = inject(Router);

  token = signal('');
  payload: any;
  timeout: any = null;

  constructor() {
    effect(() => {
      const t = this.token();
      if (t != '') {
        this.payload = this.parseJwt(t);
      } else {
        this.payload = null;
      }
    });
  }

  setLogoutTimeout() {
    if (this.timeout != null) {
      // önceden oluşturulmuş timeout fonksiyonu var. İptal et.
      clearTimeout(this.timeout);
    }
    this.timeout = setTimeout(() => {
      this.logout().subscribe({
        next: () => {
          this.toastr.error('Çıkış yapıldı');
          this.router.navigate(['/']);
        }
      });
    }, 15 * 60 * 1000); // 15 dakika boyunca ekran değişimi yapılmazsa
  }

  isLoggedIn() {
    return this.token() != '';
  }

  hasRole(role: string) {
    const roller: string[] = this.payload.roller;
    //console.log('roller:', roller);
    //console.log('includes:', roller.includes(role));
    return roller.includes(role);
  }

  login(adi: string, sifre: string) {
    return this.http.post('/auth/login', { adi, sifre }, { withCredentials: true }).pipe(
      map((r: any) => {
        this.token.set(r.token);
        // sunucudan gelen token component'e gitmesin.
        return {};
      })
    );
  }
  refresh() {
    return this.http.post('/auth/refresh', {}, { withCredentials: true }).pipe(
      tap((r: any) => {
        this.token.set(r.token);
      })
    );
  }
  logout() {
    return this.http.post('/auth/logout', {}, { withCredentials: true });
  }

  private parseJwt(token: string) {
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  }

}
