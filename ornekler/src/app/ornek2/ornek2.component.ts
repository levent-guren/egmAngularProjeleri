import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-ornek2',
  standalone: true,
  imports: [],
  templateUrl: './ornek2.component.html',
  styleUrl: './ornek2.component.scss'
})
export class Ornek2Component {
  buttonClicked() {
    this.deneme().subscribe({
      next: (a) => {
        console.log('next cagirildi. parametre:', a);
      },
      error: (e) => {
        console.log('hata oluştu:', e);
      },
      complete: () => {
        console.log('complete');
      }
    });
  }
  deneme() {
    return new Observable(observer => {
      setTimeout(() => {
        observer.next('merhaba');
        observer.next('merhaba2');
        observer.next('merhaba3');
        observer.complete();
      }, 1000);
    });
  }
}
