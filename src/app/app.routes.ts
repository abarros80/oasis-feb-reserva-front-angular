import { Routes } from '@angular/router';

export const routes: Routes = [

  {
    path: 'guest',
    loadChildren: () => import('./guest/guest.routes').then(r=> r.GUEST_ROUTS)
  },

  { path: 'oa-admin',
    loadChildren: () => import('./admin/admin.routes').then(r => r.ADMIN_ROUTS)
  },

  {
    path: '',
    redirectTo: '/oa-admin',
    pathMatch: 'full'
  },

  {
    path: '**',
    loadComponent: () => import('./my-shared/components-shared/pagina-nao-encontrado/pagina-nao-encontrado.component').then(c => c.PaginaNaoEncontradoComponent)
  }
];
