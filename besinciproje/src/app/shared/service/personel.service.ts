import { inject, Injectable } from '@angular/core';
import { PersonelSearch } from '../model/personel-search.model';
import { HttpClient } from '@angular/common/http';
import { Personel } from '../model/personel.model';

@Injectable({
  providedIn: 'root'
})
export class PersonelService {
  http = inject(HttpClient);

  getPersoneller(kriter: PersonelSearch) {
    return this.http.post<Personel[]>('http://localhost:8080/query', {
      id: kriter.id == '' ? 0 : Number(kriter.id),
      adi: kriter.name == '' ? null : kriter.name,
      soyadi: kriter.surname == '' ? null : kriter.surname,
    });
  }
}
