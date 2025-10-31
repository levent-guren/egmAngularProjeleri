import { Routes } from '@angular/router';
import { MenuComponent } from './core/menu/menu.component';
import { PersonelModule } from './shared/module/personel/personel.module';

export const routes: Routes = [
    { path: '', redirectTo: 'menu', pathMatch: 'full' },
    { path: 'menu', component: MenuComponent },
    {
        path: 'personel',
        loadChildren: () => import('./shared/module/personel/personel.module')
            .then(m => m.PersonelModule)
    },
];
