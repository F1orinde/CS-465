import { Component, Input } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';

import { Trip } from '../models/trip';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-trip-card',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './trip-card.html',
  styleUrl: './trip-card.css'
})
export class TripCard {
  @Input() trip: any;

  constructor(private router: Router, private authService: AuthenticationService) {}

  public isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  public editTrip(trip: Trip): void {
    // If not logged in, send them to login first
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['login']);
      return;
    }

    // Navigate using route param (no localStorage needed)
    this.router.navigate(['edit-trip', trip.code]);
  }
}