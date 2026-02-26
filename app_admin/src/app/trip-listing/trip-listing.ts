import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { TripCard } from '../trip-card/trip-card';
import { TripDataService } from '../services/trip-data.service';
import { Trip } from '../models/trip';

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
    private cdr: ChangeDetectorRef
  ) {}

  private getStuff(): void {
    this.tripDataService.getTrips().subscribe({
      next: (value: Trip[]) => {
        this.trips = value;

        if (value.length > 0) {
          this.message = 'There are ' + value.length + ' trips available.';
        } else {
          this.message = 'There were no trips retrieved from the database';
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

  public addTrip(): void {
    this.router.navigate(['add-trip']);
  }
}