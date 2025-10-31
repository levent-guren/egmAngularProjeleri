import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgClass } from "@angular/common";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, NgClass],
  template: `Merhaba {{ getAdi() }} 
  <button [ngClass]="buttonSinifi" (click)="test()">Test
  </button><br/> 
  <input type='text' [(ngModel)]='adi'  
  [disabled]='kapali' /> 
  `,
  styles: [`
    .kirmizi {
      background-color: red;
      color: white;
    }
    .egik {
      font-style: italic;
    }
  `]
})
export class AppComponent {
  a = 5;
  b = this.a;
  adi: string = 'Levent';
  kapali: boolean = false;
  buttonSinifi = {
    kirmizi: this.kapali,
    egik: true
  };
  getAdi() {
    return this.adi + "!";
  }
  test() {
    this.adi = "Ahmet";
    this.kapali = !this.kapali;
    this.buttonSinifi.kirmizi = this.kapali;
  }
}
