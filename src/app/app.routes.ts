import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//import { LoginComponent }      from './components/login/login.component';

const appRoutes: Routes = [
    { path: 'login',loadChildren: './shared/shared.module#SharedModule' },
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes, {onSameUrlNavigation: 'reload'});