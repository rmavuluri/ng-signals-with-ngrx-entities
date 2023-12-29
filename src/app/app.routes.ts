import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'entities', pathMatch: 'full' },
  {
    path: 'entities',
    loadComponent: () => import('./entities/todos.component'),
  },
  {
    path: 'signalstore',
    loadComponent: () => import('./signal-store/counter.component'),
  },
  {
    path: 'signalstore-feature',
    loadComponent: () => import('./signal-store-feature/counter.component'),
  },
  {
    path: 'rxjs-integration',
    loadComponent: () => import('./rxjs-integration/users.component'),
  },
];
