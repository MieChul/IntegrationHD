import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { OrganizationService } from '../../services/organization.service';
import { AccountService } from '../../services/account.service';
import { Subscription, of } from 'rxjs';
import { switchMap, tap, catchError } from 'rxjs/operators';
import { SurveyDto, SurveyForm, SurveyResponse } from '../../../shared/models/survey';

@Component({
  selector: 'app-design-survey',
  templateUrl: './design-survey.component.html',
  styleUrls: ['./design-survey.component.scss']
})
export class DesignSurveyComponent implements OnInit, OnDestroy {

  surveyForm: SurveyForm = {
    id: undefined,
    name: '',
    title: '',
    description: '',
    questions: [],
    headerImageUrl: undefined,
    headerImage: undefined,
    is_active: true,
    sharedWith: [],
    company: '',
    responses: [],
    isTaken: false
  };

  questionErrors: any[] = [];
  formNameError: boolean = false;
  formQuestionError: boolean = false;
  currentPharmaId: string | null = null;
  imageError: string | null = null;
  userData: any;

  private subscriptions: Subscription = new Subscription();

  constructor(
    private router: Router,
    private organizationService: OrganizationService,
    private accountService: AccountService
  ) { }

  ngOnInit() {
    this.subscriptions.add(
      this.accountService.getUserData().pipe(
        tap(data => {
          this.userData = data;
          if (!this.userData.id) {
            console.error('Pharmaceutical ID not found. Cannot manage surveys.');
            this.router.navigate(['/login']);
          }
        }),
        switchMap(() => {
          const surveyId = history.state.surveyId;
          if (surveyId && this.userData.id) {
            return this.organizationService.getSurveyById(this.userData.id, surveyId).pipe(
              catchError(error => {
                console.error('Error fetching survey data:', error);
                return of(undefined);
              })
            );
          } else {
            return of(undefined);
          }
        })
      ).subscribe({
        next: (survey) => {
          this.initializeForm(survey);
        },
        error: (err) => {
          console.error('Unhandled error in ngOnInit stream:', err);
          this.initializeForm();
        }
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  initializeForm(survey?: SurveyResponse): void {
    if (survey) {
      this.surveyForm = {
        id: survey.id,
        name: survey.name,
        title: survey.title,
        description: survey.description,
        questions: survey.questions.map(q => ({
          id: q.id,
          text: q.text,
          type: q.type as 'text' | 'radio' | 'checkbox' | 'date' | 'dropdown' | 'number', // Type assertion here
          options: q.options?.map((o:any) => ({ text: o.text })),
          required: q.required,
          numbersOnly: q.numbersOnly,
          minDate: q.minDate ? new Date(q.minDate).toISOString().split('T')[0] : undefined,
          maxDate: q.maxDate ? new Date(q.maxDate).toISOString().split('T')[0] : undefined,
          description: q.description
        })),
        headerImageUrl: survey.headerImageUrl,
        is_active: survey.isActive,
        date: survey.date,
        author: survey.author,
        sharedWith: survey.sharedWith,
        company: this.surveyForm.company,
        responses: survey.responses || [],
        isTaken: this.surveyForm.isTaken
      };
    } else {
      this.surveyForm = {
        name: '',
        title: '',
        description: '',
        questions: [],
        headerImageUrl: undefined,
        is_active: true,
        date: '',
        author: '',
        sharedWith: [],
        company: '',
        responses: [],
        isTaken: false
      };
    }
  }

  addQuestion(): void {
    this.surveyForm.questions.push({
      text: '',
      type: 'text',
      options: [],
      required: false,
      numbersOnly: false,
      description: ''
    });
    this.questionErrors.push({});
  }

  addOption(questionIndex: number): void {
    this.surveyForm.questions[questionIndex].options?.push({ text: '' });
  }

  removeQuestion(index: number): void {
    this.surveyForm.questions.splice(index, 1);
    this.questionErrors.splice(index, 1);
  }

  removeOption(questionIndex: number, optionIndex: number): void {
    this.surveyForm.questions[questionIndex].options?.splice(optionIndex, 1);
  }

  onFileChange(event: any): void {
    this.imageError = null;
    const file = event.target.files[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith('image/')) {
      this.imageError = 'Invalid file type. Please upload an image.';
      event.target.value = '';
      return;
    }

    const maxSizeInBytes = 2 * 1024 * 1024;
    if (file.size > maxSizeInBytes) {
      this.imageError = 'File is too large. Maximum size is 2MB.';
      event.target.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (reader.result && typeof reader.result === 'string') {
        this.surveyForm.headerImage = reader.result;
        this.surveyForm.headerImageUrl = reader.result;
      }
    };
    reader.readAsDataURL(file);
  }

  onQuestionTypeChange(index: number): void {
    const question = this.surveyForm.questions[index];
    if (question.type === 'text' || question.type === 'number' || question.type === 'date') {
      question.options = [];
    } else {
      if (!question.options) {
        question.options = [];
      }
    }
  }

  validateSurvey(): boolean {
    this.formNameError = !this.surveyForm.name;
    this.formQuestionError = !(this.surveyForm.questions.length > 0);

    if (this.formNameError || this.formQuestionError) {
      return false;
    }

    this.questionErrors = [];
    let isValid = true;
    this.surveyForm.questions.forEach((question, i) => {
      this.questionErrors[i] = {};
      if (!question.text) {
        this.questionErrors[i].text = true;
        isValid = false;
      }
      if (question.type === 'date' && question.minDate && question.maxDate && new Date(question.minDate) > new Date(question.maxDate)) {
        this.questionErrors[i].date = true;
        isValid = false;
      }

      if ((question.type === 'radio' || question.type === 'checkbox') && (!question.options || question.options.length === 0)) {
        this.questionErrors[i].options = true;
        isValid = false;
      }
    });

    return isValid;
  }

  saveSurvey(): void {
    if (!this.userData.id) {
      console.error('Cannot save survey: Pharmaceutical ID is missing.');
      return;
    }

    if (this.validateSurvey()) {
      const surveyDto: SurveyDto = {
        id: this.surveyForm.id,
        name: this.surveyForm.name,
        title: this.surveyForm.title,
        description: this.surveyForm.description,
        headerImage: this.surveyForm.headerImage,
        isActive: this.surveyForm.is_active,
        sharedWith: this.surveyForm.sharedWith,
        author: this.surveyForm.author,
        questions: this.surveyForm.questions.map(q => ({
          id: q.id,
          text: q.text,
          type: q.type,
          description: q.description,
          options: q.options?.map(o => ({ text: o.text })),
          required: q.required,
          numbersOnly: q.numbersOnly,
          minDate: q.minDate ? new Date(q.minDate).toISOString() : undefined,
          maxDate: q.maxDate ? new Date(q.maxDate).toISOString() : undefined
        }))
      };

      this.organizationService.saveSurvey(this.userData.id, surveyDto).subscribe({
        next: (response) => {
          console.log('Survey saved successfully:', response);
          this.resetForm();
          this.router.navigate(['/organization/pharma/surveys']);
        },
        error: (error) => {
          console.error('Error saving survey:', error);
        }
      });
    }
  }

  private resetForm(): void {
    this.surveyForm = {
      id: undefined,
      name: '',
      title: '',
      description: '',
      questions: [],
      headerImageUrl: undefined,
      headerImage: undefined,
      is_active: true,
      date: '',
      author: '',
      sharedWith: [],
      company: '',
      responses: [],
      isTaken: false
    };
    this.questionErrors = [];
  }

  goBack(): void {
    this.router.navigate(['/organization/pharma/surveys']);
  }
}