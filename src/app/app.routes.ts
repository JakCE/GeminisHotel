import { Routes } from '@angular/router';
import { MarketComponent } from './modules/market/market.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';

export const routes: Routes = [
    { path: '', redirectTo: 'market', pathMatch: 'full' },
    { path: 'home', component: DashboardComponent },
    { path: 'market', component: MarketComponent },
    { path: '**', redirectTo: 'home' },
];