import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service/authentication.service';

@Component({
  selector: 'app-workouts-page',
  templateUrl: './workouts.page.html',
  styleUrls: ['./workouts.page.scss'],
})
export class WorkoutsPageComponent implements OnInit {
  constructor(public auth: AuthenticationService) {}

  ngOnInit() {}
}
