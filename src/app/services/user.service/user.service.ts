import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './../../models/user/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<User[]>(`${environment.API_URL}/users`);
  }

  getById(userId: string) {
    return this.http.get<User>(`${environment.API_URL}/users/id/${userId}`);
  }
}
