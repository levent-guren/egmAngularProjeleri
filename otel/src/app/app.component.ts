import { Component, HostListener, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './shared/service/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'otel';
  auth = inject(AuthService);

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    this.auth.setLogoutTimeout();
  }
}
