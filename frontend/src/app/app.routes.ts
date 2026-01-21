import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout';

export const routes: Routes = [{
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import("./features/dashboard/dashboard")
          .then(m => m.Dashboard)
      },
      // altre rotte...
    ]
  }];
