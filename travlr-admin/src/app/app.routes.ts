import { Routes } from '@angular/router';

import { TripListComponent } from './components/trip-list/trip-list.component';
import { TripAddComponent } from './components/trip-add/trip-add.component';
import { TripEditComponent } from './components/trip-edit/trip-edit.component';

export const routes: Routes = [

  // default route
  { path: '', redirectTo: 'trips', pathMatch: 'full' },

  // LIST PAGE
  { path: 'trips', component: TripListComponent },

  // ADD
  { path: 'add', component: TripAddComponent },

  // EDIT
  { path: 'edit/:code', component: TripEditComponent },

  // fallback safety
  { path: '**', redirectTo: 'trips' }
];