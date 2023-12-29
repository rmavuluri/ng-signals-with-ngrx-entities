import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'entities', pathMatch: 'full' },
  {
    path: 'entities',
    loadComponent: () => import('./entities/todos.component'),
  },
];
