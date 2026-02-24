import { Component, OnInit } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';

import { TripDataService } from '../../services/trip-data.service';
import { Trip } from '../../models/trip';

@Component({
  selector: 'app-trip-list',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './trip-list.component.html',
  styleUrl: './trip-list.component.css'
})
export class TripListComponent implements OnInit {

  trips: Trip[] = [];
  errorMessage: string = '';

  constructor(private tripService: TripDataService) {}

  ngOnInit(): void {

    console.log('TripListComponent initialized');

    this.tripService.getTrips().subscribe({
      next: (data: Trip[]) => {
        console.log('API DATA:', data);
        this.trips = data || [];
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Unable to load trips.';
        this.trips = [];
      }
    });

  }

}