import { Route } from '@angular/router';
import { DashboardPage } from './pages/dashboard-page/dashboard-page'; 
import { SettingsPage } from './pages/settings-page/settings-page';
import { TaskListComponent } from './components/task-list/task-list';
import { TaskFormComponent } from './components/task-form/task-form';

export const APP_ROUTES: Route[] = [
   { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardPage },
  { path: 'tasks', component: TaskListComponent },
  { path: 'settings', component: SettingsPage },
   {
    path: 'tasks/new',
    component: TaskFormComponent
  },
  {
    path: 'tasks/:id/edit',
    component: TaskFormComponent
  }
];
