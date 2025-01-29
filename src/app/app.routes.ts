import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'manage-profiles',
    loadComponent: () => import('./manage-profile/manage-profile.page').then((m) => m.ManageProfilesPage),
  },
  {
    path: 'task-list/:id',
    loadComponent: () => import('./task-list/task-list.page').then((m) => m.TaskListPage),
  },
  {
      path: 'task-list',
      loadComponent: () => import('./task-list/task-list.page').then((m) => m.TaskListPage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
