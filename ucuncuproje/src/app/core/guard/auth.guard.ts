import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../shared/service/auth.service';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const toastr = inject(ToastrService);

  if (authService.isLoggedIn()) {
    // login olunmuş. İzin ver.
    return true;
  }
  // login olunmamış. İzin verme.
  // Ana sayfaya(login) git.
  router.navigate(['/']);
  toastr.warning('Önce giriş yapınız');
  return false;
};
