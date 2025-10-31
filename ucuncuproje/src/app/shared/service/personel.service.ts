import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Personel } from '../model/personel-response.model';

@Injectable({
  providedIn: 'root'
})
export class PersonelService {
  http = inject(HttpClient);

  getPersonelList() {
    return this.http.get<Personel[]>("/");
  }
}
