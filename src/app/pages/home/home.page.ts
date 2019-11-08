import { AuthenticationService } from './../../services/authentication.service/authentication.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePageComponent implements OnInit {
  constructor(public auth: AuthenticationService) {}

  ngOnInit() {}
}
