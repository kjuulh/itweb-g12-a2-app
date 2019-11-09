import { AlertService } from './../alert/alert.service';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Exercise } from '../../models/exercise/exercise';

@Injectable({
  providedIn: 'root',
})
export class ExerciseService {
  constructor(private http: HttpClient, private alertService: AlertService) {}

  addToWorkout(workoutId: string, exercise: Exercise) {
    if (workoutId !== exercise.workoutId) {
      this.alertService.error('Invalid request');
      return;
    }

    let exerciseModel: Exercise;
    if (exercise.time) {
      exerciseModel = {
        workoutId,
        name: exercise.name,
        description: exercise.description,
        sets: exercise.sets,
        time: exercise.time,
      };
    }
    if (exercise.reps) {
      exerciseModel = {
        workoutId,
        name: exercise.name,
        description: exercise.description,
        sets: exercise.sets,
        reps: exercise.reps,
      };
    }

    return this.http.post<Exercise>(
      `${environment.API_URL}/workouts/${workoutId}/exercises`,
      exerciseModel,
    );
  }

  update(workoutId: string, exercise: Exercise) {
    if (workoutId !== exercise.workoutId) {
      this.alertService.error('Invalid request');
      return;
    }

    return this.http.put<Exercise>(
      `${environment.API_URL}/workouts/${workoutId}/exercises/${exercise._id}`,
      exercise,
    );
  }

  getByWorkout(workoutId: string) {
    return this.http.get<Exercise[]>(
      `${environment.API_URL}/workouts/${workoutId}/exercises`,
    );
  }

  getByWorkoutAndExercise(workoutId: string, exerciseId: string) {
    return this.http.get<Exercise[]>(
      `${environment.API_URL}/workouts/${workoutId}/exercises/${exerciseId}`,
    );
  }
}
