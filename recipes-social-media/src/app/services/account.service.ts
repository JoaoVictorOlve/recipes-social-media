import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../shared/models/user';
import { LoginRequest } from '../shared/models/login-request';


@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private readonly apiUrl = "http://localhost:3000/api/user"

  constructor(private http: HttpClient) {}

  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/create`, user, {
      withCredentials:true
    });
  }

  loginUser(user: any): Observable<LoginRequest>{
    return this.http.post<LoginRequest>(`${this.apiUrl}/login`, user, {
      withCredentials:true
    })
  }

  getUser(): Observable<User>{
    return this.http.get<User>(`${this.apiUrl}`, { withCredentials: true})
  }

  logoutUser(): Observable<User>{
    return this.http.post<User>(`${this.apiUrl}/logout`,{},{ withCredentials: true})
  }

}
