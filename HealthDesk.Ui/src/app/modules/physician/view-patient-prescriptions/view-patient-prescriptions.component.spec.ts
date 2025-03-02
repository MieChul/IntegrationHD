import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPatientPrescriptionsComponent } from './view-patient-prescriptions.component';

describe('ViewPatientPrescriptionsComponent', () => {
  let component: ViewPatientPrescriptionsComponent;
  let fixture: ComponentFixture<ViewPatientPrescriptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewPatientPrescriptionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewPatientPrescriptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
