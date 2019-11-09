import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Workout } from '../../models/workout/workout';

@Component({
  selector: 'app-workout',
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.scss'],
})
export class WorkoutComponent implements OnInit {
  @Input()
  workout: Workout;
  @Input()
  step: number;
  @Output()
  subscribe = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  setStep(index) {
    this.step = index;
    // this.subscribe.emit(this.step);
  }

  prevStep() {
    this.step--;
    // this.subscribe.emit(this.step);
  }

  nextStep() {
    this.step++;
    // this.subscribe.emit(this.step);
  }
}
