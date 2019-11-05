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
  constructor(private router: Router) {}

  ngOnInit() {}

  login() {
    console.log('Logging in');
    this.router.navigate(['/login']);
  }

  logout() {
    console.log('Logging out');
    this.router.navigate(['/logout']);
  }

  register() {
    console.log('Registering');
    this.router.navigate(['/login']);
  }
}
