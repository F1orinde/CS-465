import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

import { TripDataService } from '../services/trip-data.service';
import { Trip } from '../models/trip';

@Component({
  selector: 'app-edit-trip',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-trip.html',
  styleUrl: './edit-trip.css'
})
export class EditTrip implements OnInit {
  public editForm!: FormGroup;
  trip!: Trip;
  submitted = false;
  message: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private tripDataService: TripDataService
  ) {}

  // Convenience getter for easy access to form fields in HTML
  get f() {
    return this.editForm.controls;
  }

  ngOnInit(): void {
    const tripCode = this.route.snapshot.paramMap.get('tripCode');

    if (!tripCode) {
      alert("Missing trip code in the URL. Can't load trip to edit.");
      this.router.navigate(['']);
      return;
    }

    // Build the form so template bindings work immediately
    this.editForm = this.formBuilder.group({
      _id: [''],
      code: ['', Validators.required],
      name: ['', Validators.required],
      length: ['', Validators.required],
      start: ['', Validators.required],
      resort: ['', Validators.required],
      perPerson: ['', Validators.required],
      image: ['', Validators.required],
      description: ['', Validators.required]
    });

    // Load the trip from the API
    this.tripDataService.getTrip(tripCode).subscribe({
      next: (value: Trip[]) => {
        if (!value || value.length === 0) {
          alert('Trip not found for code: ' + tripCode);
          this.router.navigate(['']);
          return;
        }

        this.trip = value[0];

        this.editForm.patchValue({
          _id: (this.trip as any)._id ?? '',
          code: this.trip.code,
          name: this.trip.name,
          length: this.trip.length,
          start: this.trip.start,
          resort: this.trip.resort,
          perPerson: this.trip.perPerson,
          image: this.trip.image,
          description: this.trip.description
        });
      },
      error: (error: any) => {
        console.log('Error: ' + error);
        alert('Error loading trip.');
        this.router.navigate(['']);
      }
    });
  }

  public onSubmit(): void {
    this.submitted = true;
    this.message = '';

    if (this.editForm.invalid) {
      return;
    }

    const updatedTrip: Trip = this.editForm.value as Trip;

    this.tripDataService.updateTrip(updatedTrip).subscribe({
      next: (value: Trip) => {
        this.message = 'Trip updated successfully.';
        this.router.navigate(['']);
      },
      error: (error: any) => {
        console.log('Error: ' + error);
        this.message = 'Error updating trip.';
      }
    });
  }

  // Keeps your existing HTML working (it calls cancel())
  public cancel(): void {
    this.router.navigate(['']);
  }
}