import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogWorkoutPageComponent } from './log-workout-page.component';

describe('LogWorkoutPageComponent', () => {
  let component: LogWorkoutPageComponent;
  let fixture: ComponentFixture<LogWorkoutPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogWorkoutPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogWorkoutPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
