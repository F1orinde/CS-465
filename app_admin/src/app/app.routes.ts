import { Routes } from '@angular/router';
import { TripListing } from './trip-listing/trip-listing';
import { authGuard } from './auth.guard';

export const routes: Routes = [
  { path: '', component: TripListing },

  {
    path: 'login',
    loadComponent: () => import('./login/login').then(m => m.Login)
  },

  {
    path: 'add-trip',
    canActivate: [authGuard],
    loadComponent: () => import('./add-trip/add-trip').then(m => m.AddTrip)
  },

  {
    path: 'edit-trip/:tripCode',
    canActivate: [authGuard],
    loadComponent: () => import('./edit-trip/edit-trip').then(m => m.EditTrip)
  }
];