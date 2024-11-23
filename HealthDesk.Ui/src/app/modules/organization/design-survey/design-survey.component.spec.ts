import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignSurveyComponent } from './design-survey.component';

describe('DesignSurveyComponent', () => {
  let component: DesignSurveyComponent;
  let fixture: ComponentFixture<DesignSurveyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DesignSurveyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DesignSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
