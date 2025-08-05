import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrganizationService } from '../../services/organization.service';
import { AccountService } from '../../services/account.service';
import { Subscription, of } from 'rxjs';
import { switchMap, tap, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-view-survey-response',
  templateUrl: './view-survey-response.component.html',
  styleUrls: ['./view-survey-response.component.scss']
})
export class ViewSurveyResponseComponent implements OnInit, OnDestroy {
  surveyResponses: any[] = [];
  surveyId: string = '';
  surveyTitle: string = '';
  private currentPharmaId: string | null = null;
  private subscriptions = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private organizationService: OrganizationService,
    private router: Router,
    private accountService: AccountService
  ) { }

  ngOnInit(): void {
    this.surveyId = this.route.snapshot.paramMap.get('id') ?? '';
    if (!this.surveyId) {
      this.router.navigate(['/organization/pharma/surveys']);
      return;
    }

    this.subscriptions.add(
      this.accountService.getUserData().pipe(
        tap(userData => {
          this.currentPharmaId = userData?.id;
          if (!this.currentPharmaId) {
            this.router.navigate(['/login']);
          }
        }),
        switchMap(() => {
          if (!this.currentPharmaId) {
            return of(null);
          }
          return this.organizationService.getSurveyById(this.currentPharmaId, this.surveyId).pipe(
            catchError(err => of(null))
          );
        })
      ).subscribe({
        next: (survey) => {
          if (survey) {
            this.surveyTitle = survey.title;
            this.surveyResponses = survey.responses || [];
          }
        },
        error: (err) => console.error('Unhandled error in ngOnInit stream:', err)
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  viewResponse(response: any): void {
    this.router.navigate(['/organization/pharma/view-single-response', this.surveyId, response.userId]);
  }

  goBack() {
    this.router.navigate(['/organization/pharma/surveys']);
  }
}