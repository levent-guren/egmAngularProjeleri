import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'kisaltma',
  standalone: true
})
export class KisaltmaPipe implements PipeTransform {

  transform(value: string, max: number): string {

    if (max < 4 || value.length <= max) {
      return value;
    }
    let s = value.substring(0, max - 3);
    s += '...';
    return s;
  }

}
