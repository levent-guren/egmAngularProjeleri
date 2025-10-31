import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Otel } from '../model/otel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OtelService {

  http = inject(HttpClient);

  getTumOteller(): Observable<Otel[]> {
    return this.http.post<Otel[]>('/otel/list', {});
  }

  otelEkle(adi: string) {
    return this.http.post<any>('/otel/guncelle', { id: '', adi });
  }
  otelGuncelle(id: string, adi: string) {
    return this.http.post<any>('/otel/guncelle', { id, adi });
  }
  otelSil(id: string) {
    return this.http.post<any>('/otel/sil', { id });
  }
}
