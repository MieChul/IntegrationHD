import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientSymptomsComponent } from './patient-symptoms.component';

describe('PatientSymptomsComponent', () => {
  let component: PatientSymptomsComponent;
  let fixture: ComponentFixture<PatientSymptomsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PatientSymptomsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientSymptomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
