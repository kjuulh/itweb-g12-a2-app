import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutsPageComponent } from './workouts.page';

describe('HomeComponent', () => {
  let component: WorkoutsPageComponent;
  let fixture: ComponentFixture<WorkoutsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WorkoutsPageComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkoutsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
