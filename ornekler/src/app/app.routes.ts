import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { Ornek1Component } from './ornek1/ornek1.component';
import { Ornek2Component } from './ornek2/ornek2.component';
import { Ornek3Component } from './ornek3/ornek3.component';

export const routes: Routes = [
    { path: '', component: MenuComponent },
    { path: 'ornek1', component: Ornek1Component },
    { path: 'ornek2', component: Ornek2Component },
    { path: 'ornek3', component: Ornek3Component },
];
