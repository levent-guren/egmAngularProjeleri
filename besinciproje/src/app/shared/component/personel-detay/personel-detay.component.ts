import { Component, inject, Input } from '@angular/core';
import { PersonelSearch } from '../../model/personel-search.model';
import { JsonPipe } from '@angular/common';
import { PersonelService } from '../../service/personel.service';
import { Personel } from '../../model/personel.model';

@Component({
  selector: 'app-personel-detay',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './personel-detay.component.html',
  styleUrl: './personel-detay.component.scss'
})
export class PersonelDetayComponent {
  _kriter: PersonelSearch | undefined;
  personelService = inject(PersonelService);
  personelListesi: Personel[] = [];

  @Input()
  get kriter() {
    return this._kriter;
  }
  set kriter(yeniKriter) {
    this._kriter = yeniKriter;
    this.ara();
  }
  ara() {
    if (this._kriter) {
      this.personelService.getPersoneller(this._kriter).subscribe({
        next: (res) => {
          this.personelListesi = res;
        },
        error: (err) => {
          console.error(err);
        },
      });
    }
  }

}
