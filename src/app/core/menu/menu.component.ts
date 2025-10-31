import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { AuthService } from '../../shared/service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, JsonPipe],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
  private router = inject(Router);
  public authService = inject(AuthService);
  private toastr = inject(ToastrService);

  isYonetimOpen = false; // manual open/close state (also auto-opens when child active)


  sectionActive(prefix: string): boolean { return this.router.url.startsWith(prefix); }
  toggleYonetim() { this.isYonetimOpen = !this.isYonetimOpen; }
  logout() {
    this.authService.logout().subscribe({
      next: () => {
        this.toastr.info('Çıkış yapıldı');
        this.router.navigate(['/']);
      }
    });

  }
}
