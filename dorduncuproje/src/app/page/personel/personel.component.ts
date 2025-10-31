import { Component, inject, OnInit } from '@angular/core';
import { Personel } from '../../shared/model/personel.model';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PersonelService } from '../../shared/service/personel.service';

@Component({
  selector: 'app-personel',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './personel.component.html',
  styleUrl: './personel.component.scss'
})
export class PersonelComponent implements OnInit {
  personel: Personel | null = null;
  route = inject(ActivatedRoute);
  personelService = inject(PersonelService);
  router = inject(Router);

  ngOnInit(): void {
    // component kendini çağırdığında ngOnInit tekrar çalışmıyor 
    // ve yeni parametreyi okuyamıyor.

    // const idStr = this.route.snapshot.paramMap.get('id');
    // const id = Number(idStr);
    // this.personelService.getPersonel(id).subscribe({
    //   next: (sonuc) => {
    //     this.personel = sonuc;
    //   }
    // });
    this.route.paramMap.subscribe({
      next: (paramMap) => {
        const idStr = paramMap.get('id');
        const id = Number(idStr);
        this.personelService.getPersonel(id).subscribe({
          next: (sonuc) => {
            this.personel = sonuc;
          }
        });
      }
    });
  }
  oncekiPersonel() {
    if (this.personel) {
      // personel varsa
      const id = this.personel.id;
      if (id > 1) {
        // ilk personel değil
        this.router.navigate(['/personeller', id - 1]);
      }
    }
  }
  sonrakiPersonel() {
    if (this.personel) {
      // personel varsa
      const id = this.personel.id;
      if (id < 10) {
        // son personel değil
        this.router.navigate(['/personeller', id + 1]);
      }
    }

  }
}
