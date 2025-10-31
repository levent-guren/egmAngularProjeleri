import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-otel-ekle-guncelle',
  standalone: true,
  imports: [MatDialogModule, ReactiveFormsModule],
  templateUrl: './otel-ekle-guncelle.component.html',
  styleUrl: './otel-ekle-guncelle.component.scss'
})
export class OtelEkleGuncelleComponent {
  guncelle = false;
  fb = inject(FormBuilder);
  form = this.fb.nonNullable.group({
    adi: ''
  });
}
