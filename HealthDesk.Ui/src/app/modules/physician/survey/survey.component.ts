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

        this.loadPhysicianSurveys();

      },
      error: (err) => console.error('Error fetching user data:', err)
    });
  }

  private async loadPhysicianSurveys() {
    const all = await this.organizationService.getSurveys();
    // only surveys shared with me
    this.surveys = all
      .filter((s : any)=> s.sharedWith?.includes(this.userData.id))
      .map((s : any) => {
        const responded = s.responses?.some((r: any) => r.physicianId === this.userData.id);
        return { ...s, isTaken: responded };
      });
    this.filteredSurveys = [...this.surveys];
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

  takeSurvey(id: any) {
    const survey = this.surveys.find(s => s.id === id);
    if (survey?.isTaken) {
      // just in case someone re-enables the button
      alert('You have already taken this survey.');
      return;
    }
    this.router.navigate(['/physician/take-survey', id]);
  }
}
