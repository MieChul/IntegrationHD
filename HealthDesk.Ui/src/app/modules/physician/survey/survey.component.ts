import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrganizationService } from '../../services/organization.service';
import { AccountService } from '../../services/account.service';
import { Survey } from '../../organization/design-survey/design-survey.component';



@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss']
})
export class SurveyComponent implements OnInit {
  surveys: Survey[] = [];
  filteredSurveys: Survey[] = [];
  searchTerm: string = '';
  sortDirection: string = 'asc';
  userData: any;

  constructor(private router: Router, private accountService: AccountService, private organizationService: OrganizationService) { }

  ngOnInit(): void {
    this.accountService.getUserData().subscribe({
      next: (data) => {
        this.userData = data;
        this.organizationService.getSurveys().then((surveys: any[]) => {
          // Filter only those surveys that have been shared with the current physician
          this.surveys = surveys.filter((survey) =>
            survey.sharedWith && survey.sharedWith.includes(data.id)
          ).map((survey) => {
            // Check if the current physician has already responded
            const hasResponded = survey.responses && survey.responses.some((resp: any) => resp.physicianId === data.id);
            return { ...survey, isTaken: hasResponded };
          });
          this.filteredSurveys = [...this.surveys];
        });
      },
      error: (err) => console.error('Error fetching user data:', err)
    });
  }


  filterSurveys(): void {
    this.filteredSurveys = this.surveys.filter(survey =>
      survey.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  sort(field: keyof Survey): void {

  }


  viewSurvey(surveyId: any): void {
    this.router.navigate(['/physician/view-survey', surveyId]);
  }

  takeSurvey(surveyId: any): void {
    this.router.navigate(['/physician/take-survey', surveyId]);
  }
}
