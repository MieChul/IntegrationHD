import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalViewCaseComponent } from './hospital-view-case.component';

describe('HospitalViewCaseComponent', () => {
  let component: HospitalViewCaseComponent;
  let fixture: ComponentFixture<HospitalViewCaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HospitalViewCaseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HospitalViewCaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
