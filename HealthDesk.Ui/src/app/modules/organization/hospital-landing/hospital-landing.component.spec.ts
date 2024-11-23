import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalLandingComponent } from './hospital-landing.component';

describe('HospitalLandingComponent', () => {
  let component: HospitalLandingComponent;
  let fixture: ComponentFixture<HospitalLandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HospitalLandingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HospitalLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
