import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonelRoutingModule } from './personel-routing.module';
import { PersonelComponent } from '../../../page/personel/personel.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PersonelService } from '../../service/personel.service';
import { provideHttpClient } from '@angular/common/http';


@NgModule({
  declarations: [
    PersonelComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PersonelRoutingModule
  ],
  providers: [
    PersonelService,
    provideHttpClient(),
  ]
})
export class PersonelModule { }
