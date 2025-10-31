import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { LoginResponse } from '../model/login-response.model';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  http = inject(HttpClient);
  token = '';

  login(username: string, passsword: string) {
    return this.http.get<LoginResponse>(`/login?username=${username}&password=${passsword}`)
      .pipe(
        map((result) => {
          this.token = result.token;
          localStorage.setItem("token", result.token);
          sessionStorage.setItem("token", result.token);
          const t = localStorage.getItem("token");
          return null;
        })
      );
  }

  isLoggedIn() {
    return this.token != '';
  }
}
