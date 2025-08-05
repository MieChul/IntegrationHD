import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import * as bootstrap from 'bootstrap';
import { Tooltip } from 'bootstrap';
import { AccountService } from '../../services/account.service';
import { Subscription } from 'rxjs';
import { OrganizationService } from '../../services/organization.service';
import { Router } from '@angular/router';
import { SortingService } from '../../../shared/services/sorting.service';
import { FilteringService } from '../../../shared/services/filter.service';

@Component({
  selector: 'app-surveys',
  templateUrl: './surveys.component.html',
  styleUrls: ['./surveys.component.scss']
})
export class SurveysComponent implements OnInit, OnDestroy {
  surveys: any[] = [];
  doctors: any[] = [];
  selectedDoctors: string[] = [];
  filteredSurveys: any[] = [];
  surveySearchText: string = '';
  surveyShareLink: string = '';
  isLinkCopied: boolean = false;
  userData: any;
  sortDirection: { [key: string]: 'asc' | 'desc' } = {};
  surveyToDelete: any;
  private deleteModal: bootstrap.Modal | undefined;
  private subscriptions = new Subscription();

  constructor(
    private organizationService: OrganizationService,
    private router: Router,
    private fb: FormBuilder,
    private accountService: AccountService,
    private sortingService: SortingService,
    private filteringService: FilteringService
  ) { }

  ngOnInit(): void {
    this.subscriptions.add(
      this.accountService.getUserData().subscribe({
        next: async (data) => {
          this.userData = data;
          await this.loadSurveys();
        },
        error: (err) => console.error('Error fetching user data:', err)
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    this.disposeTooltips();
  }

  ngAfterViewInit(): void {
    this.initializeTooltips();
    const modalElement = document.getElementById('deleteConfirmationModal');
    if (modalElement) {
      this.deleteModal = new bootstrap.Modal(modalElement);
    }
  }

  private initializeTooltips(): void {
    const tooltipTriggerList = Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.forEach(tooltipTriggerEl => new Tooltip(tooltipTriggerEl));
  }

  private disposeTooltips(): void {
    const tooltipTriggerList = Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.forEach(tooltipTriggerEl => {
      const tooltipInstance = bootstrap.Tooltip.getInstance(tooltipTriggerEl);
      if (tooltipInstance) {
        tooltipInstance.dispose();
      }
    });
  }

  async loadSurveys() {
    this.disposeTooltips();
    if (this.userData?.id) {
      this.subscriptions.add(
        this.organizationService.getSurveys(this.userData.id).subscribe({
          next: (surveys) => {
            this.surveys = surveys?.map((records: any) => ({
              ...records
            })).sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());
            this.filteredSurveys = [...this.surveys];
            setTimeout(() => {
              this.initializeTooltips();
            }, 0);
          },
          error: (err) => console.error('Error loading surveys:', err)
        })
      );
    }
  }

  editSurvey(survey: any) {
    this.router.navigate(['/organization/pharma/design-survey'], {
      state: { surveyId: survey.id }
    });
  }

  shareSurvey(survey: any) {
    this.router.navigate(['organization/pharma/share-survey', survey.id]);
  }

  generateSurveyLink(survey: any): string {
    return `https://www.healthdeskapp.in/organization/pharma/survey/${survey.id}`;
  }

  openCreateSurvey(): void {
    this.router.navigate(['/organization/pharma/design-survey']);
  }

  viewResponses(survey: any): void {
    this.router.navigate(['/organization/pharma/view-survey-response', survey.id]);
  }

  sendSurvey() {
    if (this.selectedDoctors.length > 0) {
      console.log(`Survey sent to: ${this.selectedDoctors.join(', ')}`);
    } else {
      console.log('Please select at least one doctor to send the survey.');
    }
  }

  sortTable(column: string): void {
    this.sortDirection[column] = this.sortDirection[column] === 'asc' ? 'desc' : 'asc';
    const direction = this.sortDirection[column];
    this.filteredSurveys = this.sortingService.sort(this.filteredSurveys, column, direction);
  }

  applyFilters(): void {
    this.filteredSurveys = this.filteringService.filter(
      this.surveys,
      {
        title: this.surveySearchText
      },
      []
    );
  }

  openDeleteConfirmation(survey: any): void {
    this.surveyToDelete = survey;
    if (this.deleteModal) {
      this.deleteModal.show();
    }
  }

  confirmDelete(): void {
    if (this.surveyToDelete && this.surveyToDelete.id && this.userData?.id) {
      this.subscriptions.add(
        this.organizationService.deleteSurvey(this.userData.id, this.surveyToDelete.id).subscribe({
          next: () => {
            this.loadSurveys();
            this.closeDeleteConfirmation();
          },
          error: (err) => console.error('Error confirming delete:', err)
        })
      );
    }
  }

  closeDeleteConfirmation(): void {
    if (this.deleteModal) {
      this.deleteModal.hide();
      this.surveyToDelete = null;
    }
  }
}
