import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { TripCard } from '../trip-card/trip-card';
import { TripDataService } from '../services/trip-data.service';
import { Trip } from '../models/trip';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-trip-listing',
  standalone: true,
  imports: [CommonModule, TripCard],
  templateUrl: './trip-listing.html',
  styleUrl: './trip-listing.css'
})
export class TripListing implements OnInit {
  trips: Trip[] = [];
  message: string = '';

  constructor(
    private tripDataService: TripDataService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private authService: AuthenticationService
  ) {}

  public isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  public goLogin(): void {
    this.router.navigate(['login']);
  }

  public goAddTrip(): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['login']);
      return;
    }
    this.router.navigate(['add-trip']);
  }

  // Keeps your existing HTML working (it calls addTrip())
  public addTrip(): void {
    this.goAddTrip();
  }

  private getStuff(): void {
    this.tripDataService.getTrips().subscribe({
      next: (value: Trip[]) => {
        this.trips = value;

        if (value.length > 0) {
          this.message = 'There are ' + value.length + ' trips available.';
        } else {
          this.message = 'There were no trips retrieved from the database.';
        }

        this.cdr.detectChanges();
      },
      error: (error: any) => {
        console.log('Error: ' + error);
        this.cdr.detectChanges();
      }
    });
  }

  ngOnInit(): void {
    this.getStuff();
  }
}