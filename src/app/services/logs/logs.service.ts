import { forkJoin } from 'rxjs';
import { AuthenticationService } from './../authentication.service/authentication.service';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Log } from '../../models/log/log';

@Injectable({
  providedIn: 'root',
})
export class LogsService {
  constructor(private http: HttpClient, private auth: AuthenticationService) {}

  get() {
    return this.http.get<Log[]>(
      `${environment.API_URL}/logs/users/${this.auth.currentUserValue.id}`,
    );
  }

  create(log: Log) {
    return this.http.post<Log>(
      `${environment.API_URL}/logs/users/${this.auth.currentUserValue.id}`,
      log,
    );
  }

  createMany(logs: Log[]) {
    return forkJoin(logs.map(log => this.create(log)));
  }

  getByWorkout(workoutId: string) {
    return this.http.get<Log[]>(
      `${environment.API_URL}/logs/workouts/${workoutId}/users/${this.auth.currentUserValue.id}`,
    );
  }

  getByExerciseId(exerciseId: string) {
    return this.http.get<Log>(
      `${environment.API_URL}/logs/exercises/${exerciseId}/users/${this.auth.currentUserValue.id}`,
    );
  }
}
