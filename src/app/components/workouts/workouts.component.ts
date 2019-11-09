import { AlertService } from './../../services/alert/alert.service';
import { ExerciseService } from './../../services/exercise/exercise.service';
import { WorkoutService } from './../../services/workout.service/workout.service';
import { AuthenticationService } from './../../services/authentication.service/authentication.service';
import { Component, OnInit, Input } from '@angular/core';
import { Workout } from 'src/app/models/workout/workout';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-workouts',
  templateUrl: './workouts.component.html',
  styleUrls: ['./workouts.component.scss'],
})
export class WorkoutsComponent implements OnInit {
  loading = false;
  workouts: Workout[] = [];
  step = 0;
  error: any;
  @Input()
  mine = false;

  constructor(
    public auth: AuthenticationService,
    private workoutService: WorkoutService,
    private exerciseService: ExerciseService,
    private alertService: AlertService,
  ) {}

  stepChanged($event) {
    this.step = $event;
  }

  ngOnInit() {
    this.loading = true;
    this.workoutService
      .getAll()
      .pipe(first())
      .subscribe(
        data => {
          if (this.mine) {
            this.workouts = data.filter(
              d => d.ownerId == this.auth.currentUserValue.id,
            );
          } else {
            this.workouts = data;
          }

          if (this.workouts.length == 0) {
            this.loading = false;
            return;
          }

          this.workouts.forEach((workout, index) => {
            this.exerciseService
              .getByWorkout(workout._id)
              .pipe(first())
              .subscribe(
                data => {
                  this.workouts[index].exercises = data;
                  this.loading = false;
                },
                err => {
                  this.alertService.error(err);
                  this.loading = false;
                },
              );
          });
        },
        error => {
          this.error = error;
          this.loading = false;
        },
      );
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }
}
