import { AuthenticationService } from './../../services/authentication.service/authentication.service';
import { MatButtonModule } from '@angular/material/button';
import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(private router: Router, public auth: AuthenticationService) {}

  ngOnInit() {}

  logout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }
}
