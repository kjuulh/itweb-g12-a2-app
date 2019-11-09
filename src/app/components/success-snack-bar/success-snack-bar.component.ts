import { Component, OnInit, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material';

@Component({
  selector: 'app-success-snack-bar',
  templateUrl: './success-snack-bar.component.html',
  styleUrls: ['./success-snack-bar.component.scss'],
})
export class SuccessSnackBarComponent implements OnInit {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {}

  ngOnInit() {}
}
