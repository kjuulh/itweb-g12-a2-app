import { WorkoutService } from './../../services/workout.service/workout.service';
import { Log } from './../../models/log/log';
import { LogsService } from './../../services/logs/logs.service';
import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-show-logs',
  templateUrl: './show-logs.component.html',
  styleUrls: ['./show-logs.component.scss'],
})
export class ShowLogsComponent implements OnInit {
  loading = false;
  logs: Log[];

  constructor(
    private logsService: LogsService,
    public workoutService: WorkoutService,
  ) {}

  ngOnInit() {
    this.loading = true;

    const workoutSchema = {};

    this.logsService
      .get()
      .pipe(first())
      .subscribe(data => {
        const unique = [...new Set(data.map(l => l.workoutId))];

        unique.forEach(workoutId => {
          const logsByWorkoutId = data.filter(l => l.workoutId == workoutId);
          const uniqueDate = [...new Set(logsByWorkoutId.map(l => l.date))];

          uniqueDate.forEach(l => {
            workoutSchema[window.btoa(l)] = data.filter(
              log => log.workoutId == workoutId && log.date == l,
            );
          });
        });

        this.logs = Object.keys(workoutSchema).map(
          logSession => workoutSchema[logSession],
        );
        this.loading = false;
        console.log(this.logs);
      });
  }
}
