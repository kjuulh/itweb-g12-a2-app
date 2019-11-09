import { AlertService } from './../../services/alert/alert.service';
import { ExerciseService } from './../../services/exercise/exercise.service';
import { WorkoutService } from './../../services/workout.service/workout.service';
import { AuthenticationService } from 'src/app/services/authentication.service/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Workout } from 'src/app/models/workout/workout';
import { Exercise } from 'src/app/models/exercise/exercise';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-edit-workout-page',
  templateUrl: './edit-workout-page.component.html',
  styleUrls: ['./edit-workout-page.component.scss'],
})
export class EditWorkoutPageComponent implements OnInit {
  workout: Workout;
  isOwner = false;

  loading: boolean;
  error: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private auth: AuthenticationService,
    private workoutService: WorkoutService,
    private exerciseService: ExerciseService,
    private alertService: AlertService,
  ) {}

  ngOnInit() {
    const workoutId: string = this.activatedRoute.snapshot.params.workoutId;
    this.loading = true;
    this.workoutService
      .getById(workoutId)
      .pipe(first())
      .subscribe(
        data => {
          this.workout = data;
          if (this.auth.currentUserValue) {
            this.isOwner =
              this.auth.currentUserValue.id === this.workout.ownerId;
          }

          this.exerciseService
            .getByWorkout(this.workout._id)
            .pipe(first())
            .subscribe(
              d => {
                this.workout.exercises = d;
                this.loading = false;
              },
              err => {
                this.alertService.error(err);
                this.loading = false;
              },
            );
        },
        error => {
          this.error = error;
          this.loading = false;
        },
      );
  }
}
