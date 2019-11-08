import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditWorkoutPageComponent } from './edit-workout-page.component';

describe('EditWorkoutPageComponent', () => {
  let component: EditWorkoutPageComponent;
  let fixture: ComponentFixture<EditWorkoutPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditWorkoutPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditWorkoutPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
