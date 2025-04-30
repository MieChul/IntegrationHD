import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  FormControl,
  Validators,
  AbstractControl
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OrganizationService } from '../../services/organization.service';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-take-survey',
  templateUrl: './take-survey.component.html',
  styleUrls: ['./take-survey.component.scss']
})
export class TakeSurveyComponent implements OnInit {
  surveyForm!: FormGroup;
  survey: any; // Loaded survey from IndexedDB
  surveyId!: string;
  userData: any;


  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private organizationService: OrganizationService,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.surveyId = this.route.snapshot.paramMap.get('id')!;
    this.accountService.getUserData().subscribe({
      next: (data) => {
        this.userData = data;

           
    this.loadSurvey();
      },
      error: (err) => console.error('Error fetching user data:', err)
    });

  }

  async loadSurvey(): Promise<void> {
    // Load the survey based on its id
    this.survey = await this.organizationService.getSurveyById(this.surveyId);

    // Build the FormArray for questions dynamically
    const questionsFormArray = this.fb.array<AbstractControl>([]);

    this.survey.questions.forEach((question: any) => {
      let control: AbstractControl;
      const validators = question.required ? [Validators.required] : [];
      switch (question.type) {
        case 'text':
        case 'number':
        case 'date':
          // Simple control starting with an empty string
          control = this.fb.control('', validators);
          break;
        case 'radio':
          // Radio control: no option selected by default
          control = this.fb.control('', validators);
          break;
        case 'checkbox':
          // For checkboxes, create a FormArray of booleans (all starting unchecked)
          const checkboxArray = this.fb.array(
            question.options.map(() => this.fb.control(false)),
            question.required ? this.minSelectedCheckbox(1) : null
          );
          control = checkboxArray;
          break;
        default:
          control = this.fb.control('', validators);
      }
      questionsFormArray.push(control);
    });

    // Build the complete form. (Meta-data controls are read-only.)
    this.surveyForm = this.fb.group({
      name: [{ value: this.survey.name, disabled: true }],
      creator: [{ value: this.survey.author, disabled: true }],
      responses: questionsFormArray
    });
  }

  // Custom validator for checkbox arrays: at least one must be selected if required.
  minSelectedCheckbox(min: number) {
    return (formArray: AbstractControl): { [key: string]: any } | null => {
      const totalSelected = (formArray as FormArray).controls
        .map(control => control.value)
        .reduce((prev, next) => next ? prev + 1 : prev, 0);
      return totalSelected >= min ? null : { required: true };
    };
  }

  // Getter for the responses FormArray.
  get responses(): FormArray {
    return this.surveyForm.get('responses') as FormArray;
  }

  // Helper method for retrieving the radio control at a given index as FormControl.
  getRadioControl(index: number): FormControl {
    return this.responses.at(index) as FormControl;
  }

  // Helper method for retrieving the controls of a checkbox FormArray at index i.
  getCheckboxControls(index: number): AbstractControl[] {
    return (this.responses.at(index) as FormArray).controls;
  }

  async submitSurvey(): Promise<void> {
    if (this.surveyForm.valid) {
      // Build the response payload.
      const responsesPayload = this.survey.questions.map((question: any, index: number) => {
        let answer = this.responses.at(index).value;
        if (question.type === 'checkbox') {
          // Convert boolean array to an array of option texts that are selected.
          answer = question.options.filter((option: any, i: number) => answer[i]);
        }
        return {
          question: question.text,
          type: question.type,
          answer: answer
        };
      });

      // Save the response with the current physician's ID.
      const responseData = {
        physicianId: this.userData.id,
        answers: responsesPayload,
        submittedAt: new Date().toISOString()
      };

      await this.organizationService.saveResponse(this.surveyId, responseData);
      alert('Survey submitted successfully!');
      this.router.navigate(['/physician/survey']);
    } else {
      this.surveyForm.markAllAsTouched();
    }
  }

  goBack() {

    this.router.navigate(['/physician/survey']);
  }
}