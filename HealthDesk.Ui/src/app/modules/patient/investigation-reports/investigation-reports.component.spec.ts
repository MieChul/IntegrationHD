import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestigationReportsComponent } from './investigation-reports.component';

describe('InvestigationReportsComponent', () => {
  let component: InvestigationReportsComponent;
  let fixture: ComponentFixture<InvestigationReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InvestigationReportsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvestigationReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
