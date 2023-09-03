import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../shared/models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuthenticated = false;

  constructor() {}

  login() {
    this.isAuthenticated = true;
  }

  register() {
    this.isAuthenticated = true;
  }

  logout() {
    this.isAuthenticated = false;
  }

  isAuthenticatedUser() {
    return this.isAuthenticated;
  }
}
