import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as bootstrap from 'bootstrap';
import { AccountService } from '../../services/account.service';
import { DatabaseService } from '../../../shared/services/database.service';
import { SortingService } from '../../../shared/services/sorting.service';
import { FilteringService } from '../../../shared/services/filter.service';
import { count, map, Observable, startWith } from 'rxjs';
import { OrganizationService } from '../../services/organization.service';
import { Router } from '@angular/router';
import { PatientService } from '../../services/patient.service';
import { PhysicianService } from '../../services/physician.service';


@Component({
  selector: 'app-surveys',
  templateUrl: './surveys.component.html',
  styleUrls: ['./surveys.component.scss']
})
export class SurveysComponent implements OnInit {
  surveys: any = [];
  doctors: any = [];
  selectedDoctors: string[] = [];
  filteredSurveys: any[] = [];
  surveySearchText: string = '';
  surveyShareLink: string = '';
  isLinkCopied: boolean = false;
  userData: any;
  sortDirection: { [key: string]: 'asc' | 'desc' } = {};
  constructor(
    private organizationService: OrganizationService,
    private router: Router,
    private fb: FormBuilder,
    private accountService: AccountService,
    private databaseService: DatabaseService,
    private patientService: PhysicianService,
    private sortingService: SortingService,
    private filteringService: FilteringService) { }

  ngOnInit(): void {
    this.accountService.getUserData().subscribe({
      next: async (data) => {
        this.userData = data;
        await this.loadSurveys();
      },
      error: (err) => console.error('Error fetching user data:', err)
    });
  }

  loadSurveys() {
    this.organizationService.getSurveys().then((surveys) => {
      this.surveys = surveys?.map((records: any) => ({
        ...records
      })).sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());
      this.filteredSurveys = [...this.surveys];
    });
  }

  editSurvey(survey: any) {
    this.router.navigate(['/organization/pharma/design-survey'], {
      state: { surveyId: survey.id }
    });
  }

  deleteSurvey(survey: any) {
    this.organizationService.deleteSurvey(survey.id).then(() => {
      this.loadSurveys();
    });
  }

  shareSurvey(survey: any) {
    this.router.navigate(['organization/pharma/share-survey', survey.id]);
  }

  generateSurveyLink(survey: any): string {
    return `http://localhost:4200/organization/pharma/survey/${survey.id}`;
  }


  openCreateSurvey(): void {
    this.router.navigate(['/organization/pharma/design-survey']);
  }

  viewResponses(survey: any): void {
    this.router.navigate(['/organization/pharma/view-survey-response', survey.id]);  // Redirect to the view-survey-response component with the survey id as a parameter
  }

  sendSurvey() {
    if (this.selectedDoctors.length > 0) {
      alert(`Survey sent to: ${this.selectedDoctors.join(', ')}`);
    } else {
      alert('Please select at least one doctor to send the survey.');
    }
  }

  sortTable(column: string): void {
    // Toggle the sort direction
    this.sortDirection[column] = this.sortDirection[column] === 'asc' ? 'desc' : 'asc';
    const direction = this.sortDirection[column];

    // Use the sorting service to sort the data
    this.filteredSurveys = this.sortingService.sort(this.filteredSurveys, column, direction);
  }

  applyFilters(): void {
    this.filteredSurveys = this.filteringService.filter(
      this.surveys,
      {
        name: this.surveySearchText
      },
      []
    );
  }
}
