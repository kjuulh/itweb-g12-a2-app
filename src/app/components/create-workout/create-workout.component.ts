import { AuthenticationService } from 'src/app/services/authentication.service/authentication.service';
import { Workout } from './../../models/workout/workout';
import { WorkoutService } from './../../services/workout.service/workout.service';
import { IExercise } from './../../../../../itweb-g12-a2-api/src/models/exercise.model';
import { AuthenticationErrorStateMatcher } from './../../helpers/matchers/authentication.error.state.matcher';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Exercise } from './../../models/exercise/exercise';
import { Component, OnInit, Input } from '@angular/core';
import { first } from 'rxjs/operators';

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
  exercises: Exercise[] = [];

  addExerciseForm: FormGroup;
  currentExerciseForm: FormGroup;
  matcher = new AuthenticationErrorStateMatcher();
  error: any;
  loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private workoutService: WorkoutService,
    private auth: AuthenticationService,
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
    this.currentExerciseForm = this.formBuilder.group({
      type: [exerciseData.type, Validators.required],
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
      type: exerciseData.type,
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
      type: exerciseData.type,
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
    console.log('Finished');
    const workout: Workout = {
      ownerId: this.auth.currentUserValue.id,
      name: this.title,
      description: this.description,
    };
    this.loading = true;
    this.workoutService
      .create(workout)
      .pipe(first())
      .subscribe(
        data => {
          console.log(data);
          // Add exercises now.
        },
        error => {
          this.error = error;
          this.loading = false;
          console.log(error);
        },
      );
  }
}
