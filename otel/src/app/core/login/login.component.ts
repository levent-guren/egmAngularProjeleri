import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Helper } from '../../shared/helper/helper';
import { AuthService } from '../../shared/service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { API_ENV } from '../../app.config';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  fb = inject(FormBuilder);
  helper = inject(Helper);
  authService = inject(AuthService);
  toastr = inject(ToastrService);
  router = inject(Router);
  env: any = inject(API_ENV);

  form = this.fb.nonNullable.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });

  ngOnInit(): void {
    if (this.env.development) {
      this.form.setValue({
        username: 'ali',
        password: '123'
      });
    }
  }

  hata(name: string) {
    return this.helper.hataControl(name, this.form);
  }

  login() {
    const adi = this.helper.getControl('username', this.form).value;
    const sifre = this.helper.getControl('password', this.form).value;
    this.authService.login(adi, sifre).subscribe({
      next: (resp) => {
        // login olundu. Menü sayfasına git.
        this.toastr.info('Giriş yapıldı.');
        this.router.navigate(['/menu']);
      },
      error: (err) => {
        // hata oluştu. Mesaj ver.
        this.toastr.error('Kullanıcı adı/şifre hatalıdır.');
      }
    });
  }
}
