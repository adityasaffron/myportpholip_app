import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    // Check if the token is present in localStorage
    const token = localStorage.getItem('token');
    if (token) {
      // User is authenticated, allow access to the route
      
      return true;
    } else {
      // User is not authenticated, redirect to the home page
      this.router.navigate(['/home']);
      return false;
    }
  }
}