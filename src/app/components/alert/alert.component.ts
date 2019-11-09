import { ErrorSnackBarComponent } from './../error-snack-bar/error-snack-bar.component';
import { SuccessSnackBarComponent } from './../success-snack-bar/success-snack-bar.component';
import { AlertService } from './../../services/alert/alert.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  constructor(
    private snackBar: MatSnackBar,
    private alertService: AlertService,
  ) {}

  ngOnInit() {
    this.subscription = this.alertService.getAlert().subscribe(message => {
      if (message && message.type) {
        this.openSnackBar(message.text, message.type);
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  openSnackBar(message: string, status: string) {
    switch (status) {
      case 'success':
        this.snackBar.openFromComponent(SuccessSnackBarComponent, {
          duration: 5000,
          panelClass: ['snackbar-success'],
          data: message,
          horizontalPosition: 'start',
        });
        break;
      case 'error':
        this.snackBar.openFromComponent(ErrorSnackBarComponent, {
          duration: 5000,
          panelClass: ['snackbar-error'],
          data: message,
          horizontalPosition: 'start',
        });
        break;
    }
  }
}
