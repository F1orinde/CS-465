import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripDataService } from '../../services/trip-data.service';
import { Trip } from '../../models/trip';

@Component({
  selector: 'app-trip-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trip-list.html',
  styleUrls: ['./trip-list.css']
})
export class TripListComponent implements OnInit {
  trips: Trip[] = [];
  errorMessage = '';

  // Used by the HTML: [src]="apiBase + trip.image"
  apiBase = 'http://localhost:3000/';

  constructor(private tripDataService: TripDataService) {}

  ngOnInit(): void {
    this.loadTrips();
  }

  loadTrips(): void {
    this.tripDataService.getTrips().subscribe({
      next: (data: Trip[]) => {
        this.trips = data ?? [];
        this.errorMessage = '';
      },
      error: (err) => {
        console.error('Error fetching trips:', err);
        this.trips = [];
        this.errorMessage = 'Failed to load trips.';
      }
    });
  }

  // Keeps the UI readable without needing Angular DatePipe imports
  formatStartDate(value: any): string {
    if (!value) return '';
    const d = new Date(value);
    if (isNaN(d.getTime())) return String(value);
    return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
  }
}
