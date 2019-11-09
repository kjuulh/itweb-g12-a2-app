import { AlertService } from './../../services/alert/alert.service';
import { AuthenticationService } from './../../services/authentication.service/authentication.service';
import { AuthenticationErrorStateMatcher } from './../../helpers/matchers/authentication.error.state.matcher';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login-page',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPageComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  error = '';

  matcher = new AuthenticationErrorStateMatcher();
  returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService,
  ) {
    if (this.auth.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }

  onSubmit(userData: { email: string; password: string }) {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.auth
      .login(userData.email, userData.password)
      .pipe(first())
      .subscribe(
        data => {
          this.alertService.success("You've logged in", true);
          this.router.navigate([this.returnUrl]);
        },
        (error: any) => {
          this.loading = false;
          this.alertService.error(error);
        },
      );
  }
}
