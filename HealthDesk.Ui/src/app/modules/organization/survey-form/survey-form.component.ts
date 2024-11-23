import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrganizationService } from '../../services/organization.service';
@Component({
  selector: 'app-survey-form',
  templateUrl: './survey-form.component.html',
  styleUrls: ['./survey-form.component.scss']
})
export class SurveyFormComponent implements OnInit {
  surveyForm: any;
  responses: any = {};
  questionErrors: any = [];
  captcha: string = '';
  userCaptchaInput: string = '';
  captchaMatched: boolean = false;
  captchaError : string ='';

  constructor(private route: ActivatedRoute, private organizationService: OrganizationService) { }

  ngOnInit(): void {
    const surveyId = this.route.snapshot.paramMap.get('id');
    this.loadSurvey(surveyId ?? '');
    // this.captcha = this.captchaService.generateCaptcha();
  }

  loadSurvey(id: string) {
    this.organizationService.getSurveyById(id).then((survey) => {
      this.surveyForm = survey;
      this.initializeResponses();
    });
  }

 
  validateCaptcha() {
    // this.captchaMatched = this.captchaService.validateCaptcha(this.userCaptchaInput, this.captcha);
    // if(!this.captchaMatched)
    //   this.captchaError="Captcha Mis Match."
  }

  initializeResponses() {
    this.surveyForm.questions.forEach((question: any) => {
      this.responses[question.text] = question.type === 'checkbox' ? [] : '';
    });
  }

  validateResponses(): boolean {
    this.questionErrors = [];
    let isValid = true;

    this.surveyForm.questions.forEach((question: any, index: number) => {
      this.questionErrors[index] = {};
      
      // Required validation
      if (question.required && !this.responses[question.text]) {
        this.questionErrors[index].required = true;
        isValid = false;
      }

      // Numbers only validation
      if (question.numbersOnly && isNaN(this.responses[question.text])) {
        this.questionErrors[index].numbersOnly = true;
        isValid = false;
      }

      // Date range validation
      if (question.type === 'date' && question.minDate && question.maxDate) {
        const responseDate = new Date(this.responses[question.text]);
        const minDate = new Date(question.minDate);
        const maxDate = new Date(question.maxDate);
        if (responseDate < minDate || responseDate > maxDate) {
          this.questionErrors[index].invalidDateRange = true;
          isValid = false;
        }
      }
    });

    return isValid;
  }

  submitResponse() {
    if ( this.validateResponses()) {
      const responseWithDate = {
        ...this.responses,
        Date: new Date().toLocaleString()  // Save the current date with time
      };
      this.organizationService.saveResponse(this.surveyForm.id, responseWithDate).then(() => {
        // Handle successful response submission
        alert('Thank you for submitting the survey!');
      }).catch(error => {
        console.error('Failed to save response:', error);
        alert('There was an error submitting your response.');
      });
    } else {
      alert('Please correct the errors before submitting.');
    }
  }
}
