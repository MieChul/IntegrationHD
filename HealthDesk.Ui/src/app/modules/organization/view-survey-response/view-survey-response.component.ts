import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrganizationService } from '../../services/organization.service';

@Component({
  selector: 'app-view-survey-response',
  templateUrl: './view-survey-response.component.html',
  styleUrls: ['./view-survey-response.component.scss']
})
export class ViewSurveyResponseComponent implements OnInit {
  surveyResponses: any[] = [];
  surveyId: string = '';
  surveyTitle:string = '';

  constructor(private route: ActivatedRoute, private organizationService: OrganizationService) { }

  ngOnInit(): void {
    this.surveyId = this.route.snapshot.paramMap.get('id') ?? '';
    this.loadResponses(this.surveyId);
  }

  loadResponses(id: string) {
    this.organizationService.getSurveyById(id).then((survey) => {
      this.surveyTitle = survey.name;
      this.surveyResponses = survey.responses || [];
    });
  }

  deleteResponse(responseIndex: number) {
    this.surveyResponses.splice(responseIndex, 1);
    this.organizationService.updateSurvey(this.surveyId, { responses: this.surveyResponses }).then(() => {
      alert('Response deleted successfully');
    });
  }
}
