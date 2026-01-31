import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'tab4',
    loadComponent: () => import('./tab4/tab4.page').then( m => m.Tab4Page)
  },
  {
    path: 'consumption-detail/:id',
    loadComponent: () => import('./consumption-detail/consumption-detail.page').then(m => m.ConsumptionDetailPage)
  },
  {
    path: 'tip-detail/:id',
    loadComponent: () => import('./tip-detail/tip-detail.page').then(m => m.TipDetailPage)
  },
];
