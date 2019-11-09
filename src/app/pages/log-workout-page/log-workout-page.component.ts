import { LogsService } from './../../services/logs/logs.service';
import { AuthenticationService } from './../../services/authentication.service/authentication.service';
import { Log } from './../../models/log/log';
import { AuthenticationErrorStateMatcher } from './../../helpers/matchers/authentication.error.state.matcher';
import { AlertService } from './../../services/alert/alert.service';
import { ExerciseService } from './../../services/exercise/exercise.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { WorkoutService } from 'src/app/services/workout.service/workout.service';
import { first } from 'rxjs/operators';
import { runInThisContext } from 'vm';
import { Workout } from 'src/app/models/workout/workout';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';

@Component({
  selector: 'app-log-workout-page',
  templateUrl: './log-workout-page.component.html',
  styleUrls: ['./log-workout-page.component.scss'],
})
export class LogWorkoutPageComponent implements OnInit {
  loading = false;
  workout: Workout;
  logForm: FormGroup;
  matcher = new AuthenticationErrorStateMatcher();

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private workoutService: WorkoutService,
    private exerciseService: ExerciseService,
    private alertService: AlertService,
    private auth: AuthenticationService,
    private logsService: LogsService,
  ) {}

  ngOnInit() {
    const workoutId: string = this.route.snapshot.params.workoutId;

    this.loading = true;
    this.workoutService
      .getById(workoutId)
      .pipe(first())
      .subscribe(
        data => {
          this.workout = data;
          this.exerciseService
            .getByWorkout(data._id)
            .pipe(first())
            .subscribe(
              d => {
                this.workout.exercises = d;

                const group = {};
                this.workout.exerciseIds.forEach(id => {
                  group['log' + id] = new FormControl();
                });

                this.logForm = this.formBuilder.group({
                  date: [Validators.required],
                  workoutId: [this.workout._id],
                  exerciseIds: [this.workout.exerciseIds],
                  ...group,
                });
                console.log(this.logForm);
                this.loading = false;
              },
              error => {
                this.loading = false;
                this.alertService.error(error);
              },
            );
        },
        error => {
          this.loading = false;
          this.alertService.error(error);
        },
      );
  }

  submitLog(logData: FormGroup) {
    if (logData.status === 'INVALID') {
      return;
    }

    const logs: Log[] = [];

    this.workout.exercises.forEach(exercise => {
      logs.push({
        ownerId: this.auth.currentUserValue.id,
        exerciseId: exercise._id,
        workoutId: this.workout._id,
        date: logData.value.date.toString(),
        exerciseName: exercise.name,
        content: logData.value['log' + exercise._id],
      } as Log);
    });

    this.logsService
      .createMany(logs)
      .pipe(first())
      .subscribe(
        data => {
          this.alertService.success('Successfully submitted logs');
        },
        error => this.alertService.error(error),
      );
  }
}
