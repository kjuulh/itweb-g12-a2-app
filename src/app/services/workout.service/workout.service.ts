import { environment } from './../../../environments/environment';
import { Workout } from './../../models/workout/workout';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WorkoutService {
  constructor(private http: HttpClient) {}

  create(workout: Workout) {
    return this.http.post<Workout>(`${environment.API_URL}/workouts`, workout);
  }

  update(workout: Workout) {
    return this.http.put<Workout>(
      `${environment.API_URL}/workouts/${workout._id as string}`,
      workout,
    );
  }

  getAll() {
    return this.http.get<Workout[]>(`${environment.API_URL}/workouts`);
  }

  getById(workoutId: string) {
    return this.http.get<Workout>(
      `${environment.API_URL}/workouts/${workoutId}`,
    );
  }
}
