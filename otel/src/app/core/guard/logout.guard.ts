import { inject } from '@angular/core';
import { CanActivateChildFn } from '@angular/router';
import { AuthService } from '../../shared/service/auth.service';
import { ToastrService } from 'ngx-toastr';

export const logoutGuard: CanActivateChildFn = (childRoute, state) => {
  const auth = inject(AuthService);
  const toastr = inject(ToastrService);

  //auth.setLogoutTimeout();
  if (childRoute.url[0].path == 'yonetim' && !auth.hasRole('admin')) {
    toastr.warning('Bu sayfaya girme yetkiniz yoktur');
    return false;
  }
  return true;
};
