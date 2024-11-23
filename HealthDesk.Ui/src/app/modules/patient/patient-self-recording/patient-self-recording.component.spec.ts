import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientSelfRecordingComponent } from './patient-self-recording.component';

describe('PatientSelfRecordingComponent', () => {
  let component: PatientSelfRecordingComponent;
  let fixture: ComponentFixture<PatientSelfRecordingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PatientSelfRecordingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientSelfRecordingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
