import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface Survey {
  id: number;
  name: string;
  number: string;
  creator: string;
  company: string;
  expiryDate: Date;
  isTaken: boolean;
}

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss']
})
export class SurveyComponent implements OnInit {
  surveys: Survey[] = [];
  filteredSurveys: Survey[] = [];
  searchTerm: string = '';
  sortField: keyof Survey = 'id';
  sortDirection: string = 'asc';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.filteredSurveys = this.surveys;
  }

  filterSurveys(): void {
    this.filteredSurveys = this.surveys.filter(survey =>
      survey.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  sort(field: keyof Survey): void {
    if (this.sortField === field) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortDirection = 'asc';
    }
    this.filteredSurveys.sort((a, b) => {
      let comparison = 0;
      if (a[field] > b[field]) {
        comparison = 1;
      } else if (a[field] < b[field]) {
        comparison = -1;
      }
      return this.sortDirection === 'asc' ? comparison : -comparison;
    });
  }

  getSortIcon(field: keyof Survey): string {
    if (this.sortField !== field) {
      return '';
    }
    return this.sortDirection === 'asc' ? 'bi bi-caret-up-fill' : 'bi bi-caret-down-fill';
  }

  viewSurvey(surveyId: number): void {
    this.router.navigate(['/physician/view-survey', surveyId]);
  }

  takeSurvey(surveyId: number): void {
    this.router.navigate(['/physician/take-survey', surveyId]);
  }
}
