import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrganizationService } from '../../services/organization.service';
import { AccountService } from '../../services/account.service';
import { Subscription, of } from 'rxjs';
import { switchMap, tap, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-survey-form',
  templateUrl: './survey-form.component.html',
  styleUrls: ['./survey-form.component.scss']
})
export class SurveyFormComponent implements OnInit, OnDestroy {
  surveyForm: any;
  responses: any = {};
  questionErrors: any = [];
  userData: any;

  private subscriptions: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private organizationService: OrganizationService,
    private accountService: AccountService
  ) { }

  ngOnInit(): void {
    const surveyId = this.route.snapshot.paramMap.get('id');

    if (surveyId) {
      this.subscriptions.add(
        this.accountService.getUserData().pipe(
          tap(userData => {
            this.userData = userData;
            if (!this.userData.id) {
              console.error('Pharmaceutical ID not found. Cannot load survey.');
            }
          }),
          switchMap(() => {
            if (!this.userData.id) {
              return of(null);
            }
            return this.organizationService.getSurveyById(this.userData.id, surveyId).pipe(
              catchError(err => {
                console.error('Error loading survey:', err);
                return of(null);
              })
            );
          })
        ).subscribe({
          next: (survey) => {
            if (survey) {
              this.surveyForm = survey;
              this.initializeResponses();
            }
          },
          error: (err) => console.error('Unhandled error in ngOnInit stream:', err)
        })
      );
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  initializeResponses() {
    if (this.surveyForm && this.surveyForm.questions) {
      this.surveyForm.questions.forEach((question: any) => {
        this.responses[question.text] = question.type === 'checkbox' ? [] : '';
      });
    }
  }

  validateResponses(): boolean {
    this.questionErrors = [];
    let isValid = true;

    if (!this.surveyForm || !this.surveyForm.questions) {
      return false;
    }

    this.surveyForm.questions.forEach((question: any, index: number) => {
      this.questionErrors[index] = {};

      if (question.required && (!this.responses[question.text] || (Array.isArray(this.responses[question.text]) && this.responses[question.text].length === 0))) {
        this.questionErrors[index].required = true;
        isValid = false;
      }

      if (question.numbersOnly && this.responses[question.text] !== '' && isNaN(this.responses[question.text])) {
        this.questionErrors[index].numbersOnly = true;
        isValid = false;
      }

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
    if (this.validateResponses()) {
      const responsePayload = {
        responsesData: {
          ...this.responses,
          submitted_at: new Date().toLocaleString()
        }
      };

      this.subscriptions.add(
        this.organizationService.saveResponse(this.surveyForm.id, responsePayload).subscribe({
          next: () => {
            console.log('Thank you for submitting the survey!');
          },
          error: (error) => {
            console.error('Failed to save response:', error);
          }
        })
      );
    } else {
      console.log('Please correct the errors before submitting.');
    }
  }
}
