import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Trip } from '../models/trip';
import { User } from '../models/user';
import { AuthResponse } from '../models/auth-response';
import { BROWSER_STORAGE } from '../storage';

@Injectable({
  providedIn: 'root'
})
export class TripDataService {
  private tripsUrl = 'http://localhost:3000/api/trips';
  private loginUrl = 'http://localhost:3000/api/login';
  private registerUrl = 'http://localhost:3000/api/register';

  constructor(
    private http: HttpClient,
    @Inject(BROWSER_STORAGE) private storage: Storage
  ) {}

  private getAuthHeaders(): HttpHeaders {
    const token = this.storage.getItem('travlr-token');
    if (!token) {
      return new HttpHeaders();
    }
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  getTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(this.tripsUrl);
  }

  getTrip(tripCode: string): Observable<Trip[]> {
    return this.http.get<Trip[]>(this.tripsUrl + '/' + tripCode);
  }

  addTrip(formData: Trip): Observable<Trip> {
    return this.http.post<Trip>(this.tripsUrl, formData, {
      headers: this.getAuthHeaders()
    });
  }

  updateTrip(formData: Trip): Observable<Trip> {
    return this.http.put<Trip>(this.tripsUrl + '/' + formData.code, formData, {
      headers: this.getAuthHeaders()
    });
  }

  login(user: User, passwd: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.loginUrl, {
      email: user.email,
      password: passwd
    });
  }

  register(user: User, passwd: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.registerUrl, {
      name: user.name,
      email: user.email,
      password: passwd
    });
  }
}