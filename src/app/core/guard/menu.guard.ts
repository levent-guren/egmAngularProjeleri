import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../shared/service/auth.service';
import { ToastrService } from 'ngx-toastr';

export const menuGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const toastr = inject(ToastrService);
  if (auth.isLoggedIn()) {
    //auth.setLogoutTimeout();
    return true;
  }
  toastr.error('Önce giriş yapınız');
  router.navigate(['/']);
  return false;
};
