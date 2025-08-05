import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { PhysicianService } from '../../services/physician.service';
import { AccountService } from '../../services/account.service';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { SurveyForm } from '../../../shared/models/survey';
import { FilteringService } from '../../../shared/services/filter.service';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss']
})
export class SurveyComponent implements OnInit, OnDestroy {
  surveys: SurveyForm[] = [];
  filteredSurveys: SurveyForm[] = [];
  searchTerm: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';
  userData: any;
  private subscriptions = new Subscription();

  constructor(
    private router: Router,
    private accountService: AccountService,
    private physicianService: PhysicianService,
    private filteringService: FilteringService
  ) { }

  ngOnInit(): void {
    this.subscriptions.add(
      this.accountService.getUserData().pipe(
        switchMap(userData => {
          this.userData = userData;
          if (userData?.id) {
            return this.physicianService.getSurveys(userData.id);
          }
          throw new Error('User data or ID not available.');
        })
      ).subscribe({
        next: (surveysFromApi) => {
          this.surveys = (surveysFromApi || []).map((s: any) => {
            const responded = s.responses?.some((r: any) => r.userId === this.userData.id);
            return { ...s, isTaken: responded };
          });
          this.filteredSurveys = [...this.surveys];
        },
        error: (err) => console.error('Error fetching surveys:', err)
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  filterSurveys(): void {
    this.filteredSurveys = this.filteringService.filter(
      this.surveys,
      {
        title: this.searchTerm
      },
      []
    );
  }

  sort(field: keyof SurveyForm): void {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    const direction = this.sortDirection === 'asc' ? 1 : -1;

    this.filteredSurveys.sort((a, b) => {
      const aValue = (a as any)[field] ?? '';
      const bValue = (b as any)[field] ?? '';

      if (aValue < bValue) {
        return -1 * direction;
      }
      if (aValue > bValue) {
        return 1 * direction;
      }
      return 0;
    });
  }

  takeSurvey(id: any) {
    const survey = this.surveys.find(s => s.id === id);
    this.router.navigate(['/physician/take-survey', id]);
  }
}