import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelfRecordComponent } from './self-record.component';

describe('SelfRecordComponent', () => {
  let component: SelfRecordComponent;
  let fixture: ComponentFixture<SelfRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelfRecordComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelfRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
