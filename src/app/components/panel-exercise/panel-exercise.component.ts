import { Component, OnInit, Input } from '@angular/core';
import { Exercise } from 'src/app/models/exercise/exercise';

@Component({
  selector: 'app-panel-exercise',
  templateUrl: './panel-exercise.component.html',
  styleUrls: ['./panel-exercise.component.scss'],
})
export class PanelExerciseComponent implements OnInit {
  @Input()
  exercise: Exercise;

  constructor() {}

  ngOnInit() {}
}
