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
  workouts: Workout[];
  step = 0;
  error: any;
  @Input()
  mine = false;

  constructor(
    public auth: AuthenticationService,
    private workoutService: WorkoutService,
  ) {}

  ngOnInit() {
    this.loading = true;
    this.workoutService
      .getAll()
      .pipe(first())
      .subscribe(
        data => {
          if (this.mine) {
            this.workouts = data.filter(
              d => d.ownerId === this.auth.currentUserValue.id,
            );
          }
          this.workouts = data;
          this.loading = false;
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
