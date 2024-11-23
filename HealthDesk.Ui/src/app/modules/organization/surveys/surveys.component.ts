import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Modal } from 'bootstrap';
import { OrganizationService } from '../../services/organization.service';

interface Survey {
  id: string;
  name: string;
  author: string;
  date: string;
  is_active: string;
  responses: any[];
}
@Component({
  selector: 'app-surveys',
  templateUrl: './surveys.component.html',
  styleUrls: ['./surveys.component.scss']
})
export class SurveysComponent implements OnInit {
  surveys: Survey[] = [];
  filteredSurveys: any[] = [];
  surveySearchText: string = '';
  @ViewChild('shareSurveyModal') shareSurveyModal!: any;
  surveyShareLink: string = '';
  isLinkCopied: boolean = false;
  constructor(private organizationService: OrganizationService,
    private router: Router) { }

  ngOnInit(): void {
    this.loadSurveys();
  }

  ngAfterViewInit(): void {
    this.filterSurveys();
  }

  loadSurveys() {
    this.organizationService.getSurveys().then((surveys) => {
      this.surveys = surveys;
    });
  }

  editSurvey(survey: any) {
    this.router.navigate(['/organization/pharma/design-survey'], { 
      state: { survey: survey }  // Passing survey object as state
    });
  }

  deleteSurvey(survey: any) {
    this.organizationService.deleteSurvey(survey.id).then(() => {
      this.loadSurveys();
    });
  }

  shareSurvey(survey: any) {
    this.surveyShareLink = this.generateSurveyLink(survey);
    this.isLinkCopied = false;

    const modal = new Modal(this.shareSurveyModal.nativeElement);
    modal.show();
  }

  generateSurveyLink(survey: any): string {
    return `http://localhost:4200/organization/pharma/survey/${survey.id}`;
  }

  copyLink() {
    const inputElement = document.createElement('textarea');
    inputElement.value = this.surveyShareLink;
    document.body.appendChild(inputElement);
    inputElement.select();
    document.execCommand('copy');
    document.body.removeChild(inputElement);

    this.isLinkCopied = true;
  }

  sortSurveyTable(column: keyof Survey, count: boolean = false): void {
    //Implement sorting logic for products
    if (!count)
      this.filteredSurveys.sort((a, b) =>
        a[column] > b[column] ? 1 : -1
      );
    else
      this.filteredSurveys.sort((a, b) =>
        a[column].length > b[column].length ? 1 : -1
      );
  }

  filterSurveys(): void {
    if (this.surveySearchText) {
      this.filteredSurveys = this.surveys.filter(p =>
        p.name
          .toLowerCase()
          .includes(this.surveySearchText.toLowerCase())
      );
    } else {
      this.filteredSurveys = [...this.surveys];
    }
  }

  openCreateSurvey():void{
    this.router.navigate(['/organization/pharma/design-survey']);
  }

  viewResponses(survey: Survey): void {
    this.router.navigate(['/organization/pharma/view-survey-response', survey.id]);  // Redirect to the view-survey-response component with the survey id as a parameter
  }
}
