import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmaLandingComponent } from './pharma-landing.component';

describe('PharmaLandingComponent', () => {
  let component: PharmaLandingComponent;
  let fixture: ComponentFixture<PharmaLandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PharmaLandingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PharmaLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
