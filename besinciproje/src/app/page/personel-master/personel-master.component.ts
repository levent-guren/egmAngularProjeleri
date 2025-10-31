import { Component } from '@angular/core';
import { PersonelSearchComponent } from "../../shared/component/personel-search/personel-search.component";
import { PersonelDetayComponent } from "../../shared/component/personel-detay/personel-detay.component";
import { PersonelSearch } from '../../shared/model/personel-search.model';

@Component({
  selector: 'app-personel-master',
  standalone: true,
  imports: [PersonelSearchComponent, PersonelDetayComponent],
  templateUrl: './personel-master.component.html',
  styleUrl: './personel-master.component.scss'
})
export class PersonelMasterComponent {
  search: PersonelSearch | undefined;

  aramaYapiliyor(search: PersonelSearch) {
    this.search = { ...search };
  }

}
