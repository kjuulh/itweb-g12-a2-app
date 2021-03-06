import { ShowLogsComponent } from './pages/show-logs/show-logs.component';
import { LogWorkoutPageComponent } from './pages/log-workout-page/log-workout-page.component';
import { AuthGuard } from './guards/auth.guard.service';
import { EditWorkoutPageComponent } from './pages/edit-workout-page/edit-workout-page.component';
import { CreateWorkoutPageComponent } from './pages/create-workout-page/create-workout-page.component';
import { WorkoutsPageComponent } from './pages/workouts/workouts.page';
import { LoginPageComponent } from './pages/login/login.page';
import { HomePageComponent } from './pages/home/home.page';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterPageComponent } from './pages/register/register.page';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },
  {
    path: 'login',
    component: LoginPageComponent,
  },
  {
    path: 'register',
    component: RegisterPageComponent,
  },
  {
    path: 'workouts',
    component: WorkoutsPageComponent,
  },
  {
    path: 'workout',
    children: [
      {
        path: 'create',
        component: CreateWorkoutPageComponent,
        canActivate: [AuthGuard],
      },
      {
        path: ':workoutId/log',
        component: LogWorkoutPageComponent,
        canActivate: [AuthGuard],
      },
      {
        path: ':workoutId',
        component: EditWorkoutPageComponent,
      },
    ],
  },
  {
    path: 'logs',
    component: ShowLogsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
