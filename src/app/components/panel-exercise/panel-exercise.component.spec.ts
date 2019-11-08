import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelExerciseComponent } from './panel-exercise.component';

describe('PanelExerciseComponent', () => {
  let component: PanelExerciseComponent;
  let fixture: ComponentFixture<PanelExerciseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelExerciseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelExerciseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
