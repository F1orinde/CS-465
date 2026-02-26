import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthenticationService } from '../services/authentication.service';
import { User } from '../models/user';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div style="max-width: 420px; margin: 40px auto;">
      <h2>Login</h2>

      <form (ngSubmit)="onLogin()">
        <div style="margin-bottom: 12px;">
          <label for="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            [(ngModel)]="user.email"
            style="width: 100%; padding: 8px;"
            required
          />
        </div>

        <div style="margin-bottom: 12px;">
          <label for="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            [(ngModel)]="password"
            style="width: 100%; padding: 8px;"
            required
          />
        </div>

        <button type="submit" style="padding: 8px 12px;">Login</button>

        <div *ngIf="message" style="margin-top: 12px;">
          {{ message }}
        </div>
      </form>
    </div>
  `
})
export class Login {
  user: User = new User();
  password = '';
  message = '';

  constructor(private authService: AuthenticationService, private router: Router) {}

  onLogin(): void {
    this.message = '';
    this.authService.login(this.user, this.password);

    setTimeout(() => {
      if (this.authService.isLoggedIn()) {
        this.router.navigateByUrl('/');
      } else {
        this.message = 'Login failed. Check email/password.';
      }
    }, 300);
  }
}