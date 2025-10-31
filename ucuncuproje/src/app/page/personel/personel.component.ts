import { Component, inject, OnInit } from '@angular/core';
import { PersonelService } from '../../shared/service/personel.service';
import { ToastrService } from 'ngx-toastr';
import { Personel } from '../../shared/model/personel-response.model';

@Component({
  selector: 'app-personel',
  standalone: true,
  imports: [],
  templateUrl: './personel.component.html',
  styleUrl: './personel.component.scss'
})
export class PersonelComponent implements OnInit {
  personeller: Personel[] = [];

  personelService = inject(PersonelService);
  toastr = inject(ToastrService);

  ngOnInit(): void {
    this.personelService.getPersonelList().subscribe({
      next: (liste) => {
        this.personeller = liste;
      },
      error: (err) => {
        this.toastr.error("Personeller Yüklenemedi");
      },
    });
  }
}
