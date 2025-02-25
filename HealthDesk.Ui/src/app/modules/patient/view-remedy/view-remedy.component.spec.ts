import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewRemedyComponent } from './view-remedy.component';


describe('ViewMedicalCaseComponent', () => {
  let component: ViewRemedyComponent;
  let fixture: ComponentFixture<ViewRemedyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewRemedyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewRemedyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
