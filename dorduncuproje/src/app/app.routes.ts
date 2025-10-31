import { Routes } from '@angular/router';
import { MenuComponent } from './core/component/menu/menu.component';
import { PersonelComponent } from './page/personel/personel.component';

export const routes: Routes = [
    { path: '', redirectTo: 'menu', pathMatch: 'full' },
    { path: 'menu', component: MenuComponent },
    { path: 'personeller/:id', component: PersonelComponent },
];
