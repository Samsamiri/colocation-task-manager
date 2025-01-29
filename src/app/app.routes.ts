import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./Pages/home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'manage-profiles',
    loadComponent: () => import('./Pages/manage-profile/manage-profile.page').then((m) => m.ManageProfilesPage),
  },
  {
    path: 'task-list/:id',
    loadComponent: () => import('./Pages/task-list/task-list.page').then((m) => m.TaskListPage),
  },
  {
      path: 'task-list',
      loadComponent: () => import('./Pages/task-list/task-list.page').then((m) => m.TaskListPage),
  },
  {
    path: 'profile-detail/:id',
    loadComponent: () => import('./Pages/profile-detail/profile-detail.page').then((m) => m.ProfileDetailPage),
  },

  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
