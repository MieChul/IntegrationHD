import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewRemedyComponent } from './new-remedy.component';


describe('NewMedicalCaseComponent', () => {
  let component: NewRemedyComponent;
  let fixture: ComponentFixture<NewRemedyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewRemedyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewRemedyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
