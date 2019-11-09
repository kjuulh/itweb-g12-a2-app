import { environment } from './../../../environments/environment';
import { User } from './../../models/user/user';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private readonly userStorage = 'currentUser';

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem(this.userStorage)),
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string) {
    return this.http
      .post<any>(`${environment.API_URL}/authenticate`, { email, password })
      .pipe(
        map(user => {
          localStorage.setItem(this.userStorage, JSON.stringify(user));
          this.currentUserSubject.next(user);
          return user;
        }),
      );
  }

  register(userData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) {
    return this.http
      .post<any>(`${environment.API_URL}/register`, userData)
      .pipe(
        map(user => {
          return user;
        }),
      );
  }

  logout() {
    localStorage.removeItem(this.userStorage);
    this.currentUserSubject.next(null);
  }
}
