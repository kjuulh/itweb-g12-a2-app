import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateWorkoutPageComponent } from './create-workout-page.component';

describe('CreateWorkoutPageComponent', () => {
  let component: CreateWorkoutPageComponent;
  let fixture: ComponentFixture<CreateWorkoutPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateWorkoutPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateWorkoutPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
