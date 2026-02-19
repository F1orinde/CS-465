import { Routes } from '@angular/router';
import { TripListComponent } from './components/trip-list/trip-list';
import { TripAddComponent } from './components/trip-add/trip-add';
import { TripEditComponent } from './components/trip-edit/trip-edit';

export const routes: Routes = [
  { path: '', component: TripListComponent },
  { path: 'add', component: TripAddComponent },
  { path: 'edit/:code', component: TripEditComponent }
];
