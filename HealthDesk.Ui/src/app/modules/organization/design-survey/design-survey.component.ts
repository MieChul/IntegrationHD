import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrganizationService } from '../../services/organization.service';

@Component({
  selector: 'app-design-survey',
  templateUrl: './design-survey.component.html',
  styleUrls: ['./design-survey.component.scss']
})
export class DesignSurveyComponent implements OnInit {
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

  constructor(
    private router: Router,
    private organizationService: OrganizationService
  ) {}

  async ngOnInit() {
    // Check if a surveyId was passed in history.state
    const surveyId = history.state.surveyId;
    if (surveyId) {
      try {
        const survey = await this.organizationService.getSurveyById(surveyId);
        await this.initializeForm(survey);
      } catch (error) {
        console.error('Error fetching survey data:', error);
        // If there's an error, initialize a blank form
        await this.initializeForm();
      }
    } else {
      // If no surveyId exists, keep the form blank
      await this.initializeForm();
    }
  }

  /**
   * Initializes or patches the survey form.
   * If a survey is provided, its values are used to patch the form.
   * Otherwise, the form is reset to a blank state.
   */
  async initializeForm(survey?: Survey): Promise<void> {
    if (survey) {
      // Patch the form with the survey data
      this.surveyForm = { ...survey };
    } else {
      // Reset to default blank state
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
    this.formNameError = !this.surveyForm.name;
    this.formAutherError = !this.surveyForm.author;
    this.formQuestionError = !(this.surveyForm.questions.length > 0);

    if (this.formNameError || this.formAutherError || this.formQuestionError) {
      return false;
    }

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
      // Update the survey date to current timestamp
      this.surveyForm.date = new Date().toISOString();
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
  date: string;
  author: string;
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
