import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSurveyResponseComponent } from './view-survey-response.component';

describe('ViewSurveyResponseComponent', () => {
  let component: ViewSurveyResponseComponent;
  let fixture: ComponentFixture<ViewSurveyResponseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewSurveyResponseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewSurveyResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
