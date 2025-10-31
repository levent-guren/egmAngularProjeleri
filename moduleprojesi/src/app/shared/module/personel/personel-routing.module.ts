import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonelComponent } from '../../../page/personel/personel.component';

const routes: Routes = [
  { path: '', redirectTo: 'liste', pathMatch: 'full' },
  { path: 'liste', component: PersonelComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonelRoutingModule { }
