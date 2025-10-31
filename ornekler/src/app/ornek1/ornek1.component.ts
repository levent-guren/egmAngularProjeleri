import { Component } from '@angular/core';

@Component({
  selector: 'app-ornek1',
  standalone: true,
  imports: [],
  templateUrl: './ornek1.component.html',
  styleUrl: './ornek1.component.scss'
})
export class Ornek1Component {
  buttonClicked() {
    console.log("1");
    this.deneme((a: number) => {
      console.log('Donen deger:', a);
    });
    console.log('buttonClicked');
  }

  deneme(callback: any) {
    console.log("deneme");
    setTimeout(() => {
      console.log('test');
      callback(5);
    }, 1000);
    console.log("deneme2");
  }
  d() {

  }
  a() {
    this.b('ali', 3, () => { console.log(1); });
    this.b('ali', 3, () => { console.log(2); });
  }
  b(s: string, c: number, d: any) {
    d();
  }
}
