import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PhysicianService } from '../../services/physician.service';
import { AccountService } from '../../services/account.service';
import { Subscription, of } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
import { QuestionResponse, SurveyResponse } from '../../../shared/models/survey';

@Component({
  selector: 'app-view-survey',
  templateUrl: './view-survey.component.html',
  styleUrls: ['./view-survey.component.scss']
})
export class ViewSurveyComponent implements OnInit, OnDestroy {
  loading = true;
  name = '';
  description = '';
  author = '';
  takenDate!: Date;
  questions: QuestionResponse[] = [];
  qaList: { questionText: string; answer: string }[] = [];
  private physicianId!: string;
  private subscriptions = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private physicianService: PhysicianService,
    private acctSvc: AccountService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const surveyId = this.route.snapshot.paramMap.get('id')!;
    if (!surveyId) {
      console.error('Survey ID not found in route parameters.');
      this.loading = false;
      return;
    }

    this.subscriptions.add(
      this.acctSvc.getUserData().pipe(
        switchMap((user: any) => {
          this.physicianId = user.id;
          if (!this.physicianId) {
            console.error('User ID not available.');
            return of(null);
          }
          return this.physicianService.getSurveyById(surveyId).pipe(
            catchError(err => {
              console.error('Error fetching survey:', err);
              return of(null);
            })
          );
        })
      ).subscribe(survey => {
        if (survey) {
          this.processSurvey(survey);
        } else {
          this.loading = false;
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private processSurvey(survey: SurveyResponse) {
    this.name = survey.name;
    this.description = survey.description || '';
    this.author = survey.author || '';
    this.questions = survey.questions;

    const respObj = (survey.responses || [])
      .find((r: any) => r.physicianId === this.physicianId);

    if (respObj) {
      this.takenDate = new Date(respObj.submittedAt);
      this.qaList = this.questions.map((q: QuestionResponse) => ({
        questionText: q.text,
        answer: (respObj.responsesData[q.text] ?? '').toString()
      }));
    } else {
      console.warn('No response found for this physician on this survey.');
    }

    this.loading = false;
  }

  goBack() {
    this.router.navigate(['/physician/survey']);
  }
}