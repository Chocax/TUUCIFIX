import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { RepairForm } from './components/repair-form/repair-form';

export const routes: Routes = [
  { path: '', component: Home, pathMatch: 'full' },
  { path: 'repair', component: RepairForm },
  { path: '**', redirectTo: '' }
];
