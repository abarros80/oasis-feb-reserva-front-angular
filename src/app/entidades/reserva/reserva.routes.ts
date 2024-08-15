import { Routes } from '@angular/router';
import { ReservaComponent } from './reserva.component';

export const RESERVA_ROUTS: Routes = [
  { path: '', component: ReservaComponent,
      children: [

        {
          path: 'listar',
          loadComponent: () => import('./components/crud/listar/listar.component').then(c => c.ListarComponent)
        },
        {
          path: 'criar',
          loadComponent: () => import('./components/crud/criar-alterar/criar-alterar.component').then(c => c.CriarAlterarComponent)
        },

        {
          path: ':id/ver',
          loadComponent: () => import('./components/crud/detalhe/detalhe.component').then(c => c.DetalheComponent)
        },

        {
          path: ':id/editar',
          loadComponent: () => import('./components/crud/criar-alterar/criar-alterar.component').then(c => c.CriarAlterarComponent)
        },

        {
          path: ':id/apagar',
          loadComponent: () => import('./components/crud/apagar/apagar.component').then(c => c.ApagarComponent)
        }

      ]
 }];
