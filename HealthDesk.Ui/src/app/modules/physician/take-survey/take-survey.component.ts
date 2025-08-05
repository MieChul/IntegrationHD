import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PhysicianService } from '../../services/physician.service';
import { AccountService } from '../../services/account.service';
import { Subscription, of } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-take-survey',
  templateUrl: './take-survey.component.html',
  styleUrls: ['./take-survey.component.scss']
})
export class TakeSurveyComponent implements OnInit, OnDestroy {
  surveyForm!: FormGroup;
  survey: any;
  surveyId!: string;
  userData: any;
  isViewMode = false;
  private subscriptions = new Subscription();

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private physicianService: PhysicianService,
    private accountService: AccountService
  ) { }

  ngOnInit(): void {
    this.surveyId = this.route.snapshot.paramMap.get('id')!;
    if (!this.surveyId) {
      return;
    }

    this.subscriptions.add(
      this.accountService.getUserData().pipe(
        switchMap(userData => {
          this.userData = userData;
          if (!this.userData?.id) {
            return of(null);
          }
          return this.physicianService.getSurveyById(this.surveyId).pipe(
            catchError(err => of(null))
          );
        })
      ).subscribe(survey => {
        if (survey) {
          this.survey = survey;
          const existingResponse = this.survey.responses?.find((r: any) => r.userId === this.userData.id);
          if (existingResponse) {
            this.isViewMode = true;
          }
          this.buildForm(existingResponse);
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  buildForm(existingResponse?: any): void {
    const questionsFormArray = this.fb.array<AbstractControl>([]);

    this.survey.questions.forEach((question: any) => {
      let control: AbstractControl;
      const validators = question.required && !this.isViewMode ? [Validators.required] : [];
      switch (question.type) {
        case 'text':
        case 'number':
        case 'dropdown':
        case 'radio':
          control = this.fb.control('', validators);
          break;
        case 'date':
          const dateValidators = question.required && !this.isViewMode ? [Validators.required] : [];
          if (question.minDate || question.maxDate) {
            dateValidators.push(this.dateRangeValidator(question.minDate, question.maxDate));
          }
          control = this.fb.control('', dateValidators);
          break;
        case 'checkbox':
          const checkboxArray = this.fb.array(
            question.options.map(() => this.fb.control(false)),
            question.required && !this.isViewMode ? this.minSelectedCheckbox(1) : null
          );
          control = checkboxArray;
          break;
        default:
          control = this.fb.control('', validators);
      }
      questionsFormArray.push(control);
    });

    this.surveyForm = this.fb.group({
      responses: questionsFormArray
    });

    if (this.isViewMode && existingResponse) {
      this.populateAndDisableForm(existingResponse);
    }
  }

  populateAndDisableForm(response: any): void {
    const responseData = response.responsesData;
    this.survey.questions.forEach((question: any, index: number) => {
      const answer = responseData[question.text];
      if (answer !== undefined) {
        if (question.type === 'checkbox') {
          const checkboxValues = question.options.map((option: any) =>
            (answer as any[]).includes(option.text)
          );
          this.responses.at(index).setValue(checkboxValues);
        } else {
          this.responses.at(index).setValue(answer);
        }
      }
    });
    this.surveyForm.disable();
  }

  dateRangeValidator(minDateStr: string | null, maxDateStr: string | null) {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (!control.value) return null;
      const selectedDate = new Date(control.value);
      if (minDateStr) {
        const minDate = new Date(minDateStr);
        if (selectedDate < minDate) return { 'minDateError': true };
      }
      if (maxDateStr) {
        const maxDate = new Date(maxDateStr);
        if (selectedDate > maxDate) return { 'maxDateError': true };
      }
      return null;
    };
  }

  minSelectedCheckbox(min: number) {
    return (formArray: AbstractControl): { [key: string]: any } | null => {
      const totalSelected = (formArray as FormArray).controls
        .map(control => control.value)
        .reduce((prev, next) => next ? prev + 1 : prev, 0);
      return totalSelected >= min ? null : { required: true };
    };
  }

  get responses(): FormArray {
    return this.surveyForm.get('responses') as FormArray;
  }

  getRadioControl(index: number): FormControl {
    return this.responses.at(index) as FormControl;
  }

  getCheckboxControls(index: number): AbstractControl[] {
    return (this.responses.at(index) as FormArray).controls;
  }

  submitSurvey(): void {
    if (this.surveyForm.valid) {
      const responsesPayload: { [key: string]: any } = {};
      this.survey.questions.forEach((question: any, index: number) => {
        let answer = this.responses.at(index).value;
        if (question.type === 'checkbox') {
          answer = question.options
            .filter((option: any, i: number) => answer[i])
            .map((option: any) => option.text);
        }
        responsesPayload[question.text] = answer;
      });

      const responseData = {
        userId: this.userData.id,
        responsesData: responsesPayload
      };

      this.physicianService.saveSurveyResponse(this.surveyId, responseData).subscribe({
        next: () => this.router.navigate(['/physician/survey']),
        error: (err) => console.error('Failed to submit survey:', err)
      });
    } else {
      this.surveyForm.markAllAsTouched();
    }
  }

  goBack() {
    this.router.navigate(['/physician/survey']);
  }
}
