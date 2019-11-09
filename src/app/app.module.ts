import { AngularMaterialModule } from './angular-material.module';
import { ErrorInterceptor } from './interceptors/error.interceptor/error.interceptor';
import { JwtInterceptor } from './interceptors/jwt.interceptor/jwt.interceptor';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomePageComponent } from './pages/home/home.page';
import { LoginPageComponent } from './pages/login/login.page';
import { RegisterPageComponent } from './pages/register/register.page';
import { WorkoutsPageComponent } from './pages/workouts/workouts.page';

import { NavbarComponent } from './components/navbar/navbar.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WorkoutsComponent } from './components/workouts/workouts.component';
import { CreateWorkoutComponent } from './components/create-workout/create-workout.component';
import { CreateWorkoutPageComponent } from './pages/create-workout-page/create-workout-page.component';
import { EditWorkoutPageComponent } from './pages/edit-workout-page/edit-workout-page.component';
import { PanelExerciseComponent } from './components/panel-exercise/panel-exercise.component';
import { AlertComponent } from './components/alert/alert.component';
import { ErrorSnackBarComponent } from './components/error-snack-bar/error-snack-bar.component';
import { SuccessSnackBarComponent } from './components/success-snack-bar/success-snack-bar.component';
import { WorkoutComponent } from './components/workout/workout.component';
import { LogWorkoutPageComponent } from './pages/log-workout-page/log-workout-page.component';
import { ShowLogsComponent } from './pages/show-logs/show-logs.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    RegisterPageComponent,
    NavbarComponent,
    LoginPageComponent,
    WorkoutsPageComponent,
    WorkoutsComponent,
    CreateWorkoutComponent,
    CreateWorkoutPageComponent,
    EditWorkoutPageComponent,
    PanelExerciseComponent,
    AlertComponent,
    ErrorSnackBarComponent,
    SuccessSnackBarComponent,
    WorkoutComponent,
    LogWorkoutPageComponent,
    ShowLogsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    AngularMaterialModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  entryComponents: [ErrorSnackBarComponent, SuccessSnackBarComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
