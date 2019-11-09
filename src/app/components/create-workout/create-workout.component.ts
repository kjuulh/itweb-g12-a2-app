import { Router } from '@angular/router';
import { ExerciseService } from './../../services/exercise/exercise.service';
import { AlertService } from './../../services/alert/alert.service';
import { AuthenticationService } from 'src/app/services/authentication.service/authentication.service';
import { Workout } from './../../models/workout/workout';
import { WorkoutService } from './../../services/workout.service/workout.service';
import { AuthenticationErrorStateMatcher } from './../../helpers/matchers/authentication.error.state.matcher';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Exercise } from './../../models/exercise/exercise';
import { Component, OnInit, Input } from '@angular/core';
import { first } from 'rxjs/operators';
import { Observable, forkJoin } from 'rxjs';

@Component({
  selector: 'app-create-workout',
  templateUrl: './create-workout.component.html',
  styleUrls: ['./create-workout.component.scss'],
})
export class CreateWorkoutComponent implements OnInit {
  step = 0;

  @Input()
  title: string;
  @Input()
  description: string;
  @Input()
  workoutId = '';
  @Input()
  exercises: Exercise[] = [];

  addExerciseForm: FormGroup;
  currentExerciseForm: FormGroup;
  matcher = new AuthenticationErrorStateMatcher();
  error: any;
  loading = false;
  currentExercise: Exercise;

  constructor(
    private formBuilder: FormBuilder,
    private workoutService: WorkoutService,
    private exerciseService: ExerciseService,
    private auth: AuthenticationService,
    private alertService: AlertService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.initialForm();
  }

  initialForm() {
    this.addExerciseForm = this.formBuilder.group({
      type: ['', Validators.required],
      description: ['', Validators.required],
      sets: [0, [Validators.required, Validators.min(1)]],
      mode: ['Repetitions'],
      modeValue: [0, Validators.min(1)],
    });

    this.currentExerciseForm = this.formBuilder.group({
      type: ['', Validators.required],
      description: ['', Validators.required],
      sets: [0, [Validators.required, Validators.min(1)]],
      mode: ['Repetitions'],
      modeValue: [0, Validators.min(1)],
    });
  }

  setCurrentExercise(exerciseData: Exercise) {
    this.currentExercise = exerciseData;
    this.currentExerciseForm = this.formBuilder.group({
      type: [exerciseData.name, Validators.required],
      description: [exerciseData.description, Validators.required],
      sets: [exerciseData.sets, [Validators.required, Validators.min(1)]],
      mode: [exerciseData.reps !== 0 ? 'Repetitions' : 'Duration'],
      modeValue: [
        exerciseData.reps !== 0 ? exerciseData.reps : exerciseData.time,
        Validators.min(1),
      ],
    });
  }

  updateExercise(index: number, exerciseEvent: FormGroup) {
    if (exerciseEvent.status === 'INVALID') {
      return;
    }

    const exerciseData = exerciseEvent.value;

    this.exercises[index] = {
      _id: this.currentExercise._id,
      workoutId: this.workoutId,
      name: exerciseData.type,
      description: exerciseData.description,
      sets: exerciseData.sets,
      reps:
        exerciseData.mode.toLowerCase() === 'repetitions'
          ? exerciseData.modeValue
          : undefined,
      time:
        exerciseData.mode.toLowerCase() === 'duration'
          ? exerciseData.modeValue
          : undefined,
    } as Exercise;
    this.initialForm();
    this.step++;
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

  add(exerciseEvent) {
    if (exerciseEvent.status === 'INVALID') {
      return;
    }

    const exerciseData = exerciseEvent.value;

    this.exercises.push({
      name: exerciseData.type,
      description: exerciseData.description,
      sets: exerciseData.sets,
      reps:
        exerciseData.mode.toLowerCase() === 'repetitions'
          ? exerciseData.modeValue
          : 0,
      time:
        exerciseData.mode.toLowerCase() === 'duration'
          ? exerciseData.modeValue
          : 0,
    } as Exercise);
    this.initialForm();
    this.step++;
  }

  submit() {
    if (!this.auth.currentUserValue) {
      this.alertService.error('You need to be logged in to perfom this action');
      return;
    }

    const workout: Workout = {
      ownerId: this.auth.currentUserValue.id || '',
      name: this.title,
      description: this.description,
      exercises: this.exercises,
    };
    this.loading = true;

    if (this.workoutId == '') {
      this.workoutService
        .create(workout)
        .pipe(first())
        .subscribe(
          data => {
            this.addOrUpdateExercises(data);
          },
          error => {
            this.error = error;
            this.loading = false;
            this.alertService.error(error, true);
          },
        );
    } else {
      workout._id = this.workoutId;
      this.workoutService
        .update(workout)
        .pipe(first())
        .subscribe(
          data => {
            this.addOrUpdateExercises(data);
          },
          error => {
            this.error = error;
            this.loading = false;
            this.alertService.error(error, true);
          },
        );
    }
  }

  addOrUpdateExercises(workout: Workout) {
    this.exercises.forEach(exercise => {
      const calls = [];

      if (exercise._id && workout.exerciseIds.find(e => e == exercise._id)) {
        exercise.workoutId = workout._id;
        calls.push(this.exerciseService.update(workout._id, exercise));
      } else {
        exercise.workoutId = workout._id;
        calls.push(this.exerciseService.addToWorkout(workout._id, exercise));
      }

      forkJoin(calls)
        .pipe(first())
        .subscribe(
          (d: Exercise[]) => {
            d.forEach(e =>
              workout.exerciseIds.find(ex => ex == e._id)
                ? null
                : workout.exerciseIds.push(e._id),
            );
            this.loading = false;
          },
          err => {
            this.alertService.error(err);
            this.loading = false;
          },
        );
    });
  }
}
