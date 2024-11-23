import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OrganizationService } from '../../services/organization.service';

@Component({
  selector: 'app-design-survey',
  templateUrl: './design-survey.component.html',
  styleUrls: ['./design-survey.component.scss']
})
export class DesignSurveyComponent {
  // Initialize surveyForm with correct structure
  surveyForm: Survey = {
    name: '',
    title: '',
    description: '',
    questions: [],
    image: null,
    is_active: true,
    date: '',
    author: '',
    responses: []
  };

  questionErrors: any = [];
  formNameError: boolean = false;
  formAutherError: boolean = false;
  formQuestionError: boolean = false;

  constructor(private router: Router, private organizationService: OrganizationService) { }

  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      const surveyData = navigation.extras.state['survey'];
      if (surveyData) {
        this.surveyForm = surveyData;
      }
    }
  }

  addQuestion() {
    this.surveyForm.questions.push({
      text: '',
      type: 'text',
      options: [],
      required: false,
      numbersOnly: false,
      allowOther: false,
      description: ''
    });
    this.questionErrors.push({});
  }

  addOption(questionIndex: number) {
    this.surveyForm.questions[questionIndex].options?.push({ text: '' });
  }

  removeQuestion(index: number) {
    this.surveyForm.questions.splice(index, 1);
    this.questionErrors.splice(index, 1);
  }

  removeOption(questionIndex: number, optionIndex: number) {
    this.surveyForm.questions[questionIndex].options?.splice(optionIndex, 1);
  }

  onFileChange(event: any) {
    const reader = new FileReader();
    const file = event.target.files[0];

    reader.onload = () => {
      if (reader.result && typeof reader.result === 'string') {
        this.surveyForm.image = reader.result;
      }
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  }

  onQuestionTypeChange(index: number) {
    const question = this.surveyForm.questions[index];
    if (question.type === 'text' || question.type === 'radio' || question.type === 'checkbox' || question.type === 'dropdown') {
      question.options = [];
    }
  }

  validateSurvey() {
    if (!this.surveyForm.name)
      this.formNameError = true;
    else
      this.formNameError = false;
    if (!this.surveyForm.author)
      this.formAutherError = true;
    else
    this.formAutherError = false;
    if (!(this.surveyForm.questions.length > 0))
      this.formQuestionError = true;
    else
    this.formQuestionError = false;

    if(this.formQuestionError || this.formAutherError || this.formNameError)
      return;
    
    this.questionErrors = [];
    this.surveyForm.questions.forEach((question, i) => {
      this.questionErrors[i] = {};
      if (!question.text) {
        this.questionErrors[i].text = true;
      }
      if (question.type === 'date' && question.minDate && question.maxDate && question.minDate > question.maxDate) {
        this.questionErrors[i].date = true;
      }
    });

    return !this.questionErrors.some((error: any) => Object.keys(error).length > 0);
  }

  saveSurvey() {
    if (this.validateSurvey()) {
      this.surveyForm.date = new Date().toISOString();  // Store current date
      this.organizationService.saveSurvey(this.surveyForm).then(() => {
        // Clear the form after saving
        this.surveyForm = {
          name: '',
          title: '',
          description: '',
          questions: [],
          image: null,
          is_active: true,
          date: '',
          author: '',
          responses: []
        };
        this.questionErrors = [];
      });
      this.router.navigate(['/organization/pharma/surveys']);
    }
  }
}

export interface Survey {
  id?: string;
  name: string;
  title: string;
  description: string;
  questions: Question[];
  image?: string | null;
  is_active: boolean;
  date: string;  // New field for the current date
  author: '',
  responses: any[];
}

export interface Question {
  text: string;
  type: 'text' | 'radio' | 'checkbox' | 'date' | 'dropdown' | 'number';
  options?: Option[];
  required: boolean;
  numbersOnly?: boolean;
  minDate?: string;
  maxDate?: string;
  allowOther?: boolean;
  description: string;
}

export interface Option {
  text: string;
}
