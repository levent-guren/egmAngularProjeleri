import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrnekService {
  sayac = signal(0);

}
