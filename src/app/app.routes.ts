import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NameDetailsComponent } from './components/name-details/name-details.component';
export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'details',
    component: NameDetailsComponent,
  },
];
