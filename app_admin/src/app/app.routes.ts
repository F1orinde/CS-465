import { Routes } from '@angular/router';
import { TripListing } from './trip-listing/trip-listing';

export const routes: Routes = [
  { path: '', component: TripListing },
  {
    path: 'add-trip',
    loadComponent: () =>
      import('./add-trip/add-trip').then(m => m.AddTrip)
  },
  {
    path: 'edit-trip',
    loadComponent: () =>
      import('./edit-trip/edit-trip').then(m => m.EditTrip)
  }
];