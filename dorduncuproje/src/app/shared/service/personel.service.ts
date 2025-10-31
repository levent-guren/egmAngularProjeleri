import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { Personel } from '../model/personel.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonelService {
  http = inject(HttpClient);

  personeller = signal<Personel[]>([]);
  personelSayisi = computed(() => {
    return this.personeller().length;
  });

  test() {
    // signal tipi için
    // değer ataması:
    this.personeller.set([]);
    // okuma:
    const personelDizisi = this.personeller();
    console.log(personelDizisi);

    // personel sayısı yazılır.
    console.log(this.personelSayisi());

    // içinde kullanılan signal tipindeki değişkenlerin değerleri değiştiğinde otomatik çağırılır.
    // effect sadece initializer kodların içinde yazılabiliyor. constructor ve ngOnInit gibi...

    effect(() => {
      console.log("Personeller değişti: Yeni personeller: " + this.personeller());
    });
    // personeller signal tipindeki değişkenin değeri değiştiğinde 
    // // yukarıdaki effect otomatik olarak çağırılır
    this.personeller.set([new Personel(1, 'adi', 'user', 'email')]);

  }
  getPersoneller(): Observable<Personel[]> {
    const sonuc = new Observable<Personel[]>(observer => {
      if (this.personeller().length > 0) {
        // personel bilgileri okunmuş.
        return observer.next(this.personeller());
      }
      setTimeout(() => {
        this.http.get<Personel[]>('https://jsonplaceholder.typicode.com/users').subscribe({
          next: (s) => {
            this.personeller.set(s);
            return observer.next(this.personeller());
          }
        });
      }, 3000);

    });
    return sonuc;
  }
  getPersonel(id: number): Observable<Personel | null> {
    const sonuc = new Observable<Personel | null>(observer => {
      this.getPersoneller().subscribe({
        next: (personeller) => {
          const p = personeller.filter(p => p.id == id);
          return observer.next(p.length > 0 ? p[0] : null);
        }
      });
    });
    return sonuc;
  }
}
