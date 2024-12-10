import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageClinicComponent } from './manage-clinic.component';

describe('ManageClinicComponent', () => {
  let component: ManageClinicComponent;
  let fixture: ComponentFixture<ManageClinicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageClinicComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageClinicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
