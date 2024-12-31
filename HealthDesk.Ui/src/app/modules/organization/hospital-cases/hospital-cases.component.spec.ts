import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalCasesComponent } from './hospital-cases.component';

describe('HospitalCasesComponent', () => {
  let component: HospitalCasesComponent;
  let fixture: ComponentFixture<HospitalCasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HospitalCasesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HospitalCasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
