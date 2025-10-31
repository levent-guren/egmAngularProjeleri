import { Routes } from '@angular/router';
import { LoginComponent } from './core/login/login.component';
import { MenuComponent } from './core/menu/menu.component';
import { menuGuard } from './core/guard/menu.guard';
import { HataComponent } from './core/hata/hata.component';
import { YonetimOtelComponent } from './page/admin/yonetim-otel/yonetim-otel.component';
import { logoutGuard } from './core/guard/logout.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    {
        path: 'menu', component: MenuComponent, canActivate: [menuGuard],
        canActivateChild: [logoutGuard],
        children: [
            { path: 'yonetim/otel', component: YonetimOtelComponent },
        ]
    },
    { path: '**', component: HataComponent },
];
