import { Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { MainComponent } from './components/main/main.component';

export const ADMIN_ROUTS: Routes = [
  {
    path: '', component:AdminComponent,
    children: [
      { path: '', component: MainComponent },
      { path: 'rs',
        loadChildren: () => import('../entidades/reserva/reserva.routes').then(r => r.RESERVA_ROUTS)
      }
    ]
  },
  {
    path: 'login',
    loadComponent: () => import('./components/login/login.component').then(c => c.LoginComponent)
  },
];
