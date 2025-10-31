import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'buyukHarf',
  standalone: true
})
export class BuyukHarfPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    return value.toLocaleUpperCase('tr');
  }

  test() {
    this.transform('deneme', 1, 2, 3, 'test');
  }
}
