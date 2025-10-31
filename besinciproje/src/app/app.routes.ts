import { Routes } from '@angular/router';
import { MenuComponent } from './core/menu/menu.component';
import { PersonelMasterComponent } from './page/personel-master/personel-master.component';

export const routes: Routes = [
    { path: '', redirectTo: 'menu', pathMatch: 'full' },
    { path: 'menu', component: MenuComponent },
    { path: 'personel', component: PersonelMasterComponent },
];
