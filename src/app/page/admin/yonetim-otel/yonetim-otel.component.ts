import { Component, inject, OnInit } from '@angular/core';
import { Otel } from '../../../shared/model/otel';
import { OtelService } from '../../../shared/service/otel.service';
import { MatDialog } from '@angular/material/dialog';
import { OtelEkleGuncelleComponent } from '../../../shared/dialog/otel-ekle-guncelle/otel-ekle-guncelle.component';
import { ToastrService } from 'ngx-toastr';
import { ConfirmComponent } from '../../../shared/dialog/confirm/confirm.component';

@Component({
  selector: 'app-yonetim-otel',
  standalone: true,
  imports: [],
  templateUrl: './yonetim-otel.component.html',
  styleUrl: './yonetim-otel.component.scss'
})
export class YonetimOtelComponent implements OnInit {
  oteller: Otel[] = [];
  otelService = inject(OtelService);
  toastr = inject(ToastrService);
  seciliOtel: Otel | null = null;

  readonly dialog = inject(MatDialog);

  ngOnInit(): void {
    this.otelListesiniGuncelle();
  }

  otelListesiniGuncelle() {
    this.otelService.getTumOteller().subscribe({
      next: (result) => {
        this.oteller = result;
      },
      error: (err) => {
        console.log('Yonetim error:', err);
      }
    });
  }

  otelEkleGuncelle() {
    const dialogRef = this.dialog.open(OtelEkleGuncelleComponent);
    if (this.seciliOtel != null) {
      // otel güncelle
      dialogRef.componentInstance.guncelle = true;
      dialogRef.componentInstance.form.setValue({ adi: this.seciliOtel.adi });
    }

    dialogRef.afterClosed().subscribe({
      next: (result) => {
        if (result == true) {
          // ekle butonuna basıldı.
          const otelAdi = dialogRef.componentInstance.form.get('adi')!.value;
          if (this.seciliOtel != null) {
            this.otelService.otelGuncelle(this.seciliOtel.id, otelAdi).subscribe({
              next: () => {
                this.toastr.info('Otel güncellenmiştir');
                this.otelListesiniGuncelle();
              }
            });
          } else {
            this.otelService.otelEkle(otelAdi).subscribe({
              next: () => {
                this.toastr.info('Otel eklenmiştir');
                this.otelListesiniGuncelle();
              }
            });
          }
        }
      }
    });
  }
  otelSec(otel: Otel) {
    if (otel.id == this.seciliOtel?.id) {
      this.seciliOtel = null;
    } else {
      this.seciliOtel = otel;
    }
  }
  oteliSil() {
    const dialogRef = this.dialog.open(ConfirmComponent);
    dialogRef.componentInstance.mesaj = `${this.seciliOtel!.adi} isimli otel silinecektir. Emin misiniz?`;
    dialogRef.afterClosed().subscribe({
      next: (result) => {
        if (result) {
          // evet'e basıldı
          this.otelService.otelSil(this.seciliOtel!.id).subscribe({
            next: () => {
              this.seciliOtel = null;
              this.toastr.info('Otel silinmiştir');
              this.otelListesiniGuncelle();
            }
          });
        }
      }
    });
  }
}
