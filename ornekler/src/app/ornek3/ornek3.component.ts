import { Component, effect, inject, signal } from '@angular/core';
import { OrnekService } from '../service/ornek.service';

@Component({
  selector: 'app-ornek3',
  standalone: true,
  imports: [],
  templateUrl: './ornek3.component.html',
  styleUrl: './ornek3.component.scss'
})
export class Ornek3Component {
  service = inject(OrnekService);

  sayi = signal(0);
  constructor() {
    effect(() => {
      console.log('sayi nin değeri değişti: ' + this.sayi());
    });
    effect(() => {
      console.log('sayi nin değeri değişti (2): ');
    });
  }

  buttonClicked() {
    //this.sayi.set(this.sayi() + 1);
    // this.sayi.set(5);
    this.sayi.update((eski) => { return eski + 1; });
    this.service.sayac.update((eski) => { return eski + 1; });
  }
}
