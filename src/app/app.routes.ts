import { Routes } from '@angular/router';
import { PublicLayout } from './layouts/public-layout/public-layout';
import { AuthLayout } from './layouts/auth-layout/auth-layout';
import { Login } from './layouts/auth-layout/login/login';
import { authGuard } from './services/guards/auth-guard';

export const routes: Routes = [

    {
        path: '',
        loadComponent: () => import('./layouts/auth-layout/login/login').then(m => m.Login)
    },
    {
        path: '',
        component: AuthLayout,
        children: [
            {
                path: 'login', loadComponent: () => import('./layouts/auth-layout/login/login').then(m => m.Login),
            }
        ]
    },
    {
        path: 'menu',
        component: PublicLayout,
        canActivate: [authGuard],
        children: [
            {
                path: 'dashboard', loadComponent: () => import('./layouts/public-layout/dashboard/dashboard').then(m => m.Dashboard)
            },
            {
                path: 'administracion-reservas', loadComponent: () => import('./layouts/public-layout/administracion-reservas/administracion-reservas').then(m => m.AdministracionReservas)
            }
        ]
    },
    {
        path: "**", redirectTo: "login"
    }
];
