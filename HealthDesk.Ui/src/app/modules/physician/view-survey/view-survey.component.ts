import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrganizationService } from '../../services/organization.service';
import { AccountService } from '../../services/account.service';

interface Question {
  text: string;
  type: string;
  options: any[];
  required: boolean;
  numbersOnly: boolean;
}

interface Answer {
  // whichever shape your DB stores—here we assume response text directly
  response: string;
}

@Component({
  selector: 'app-view-survey',
  templateUrl: './view-survey.component.html',
  styleUrls: ['./view-survey.component.scss']
})
export class ViewSurveyComponent implements OnInit {
  loading = true;

  // survey metadata
  title = '';
  description = '';
  author = '';
  company = '';
  takenDate!: Date;

  // questions + this physician's answers
  qaList: { questionText: string; answer: string }[] = [];

  private physicianId!: string;

  constructor(
    private route: ActivatedRoute,
    private orgSvc: OrganizationService,
    private acctSvc: AccountService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // 1) get current physician ID
    this.acctSvc.getUserData().subscribe((user: any) => {
      this.physicianId = user.id;
      this.loadSurvey();
    });
  }

  private async loadSurvey() {
    const surveyId = this.route.snapshot.paramMap.get('id')!;
    // 2) fetch from IndexedDB
    const survey: any = await this.orgSvc.getSurveyById(surveyId);

    // 3) pull metadata
    this.title = survey.title;
    this.description = survey.description;
    this.author = survey.author;
    this.company = survey.company || '';

    // 4) find this physician’s response object
    const respObj = (survey.responses || [])
      .find((r: any) => r.physicianId === this.physicianId);

    if (respObj) {
      this.takenDate = new Date(respObj.submittedAt);
      // 5) map each question to its corresponding answer by index
      this.qaList = survey.questions.map((q: Question, idx: number) => ({
        questionText: q.text,
        answer: (respObj.answers[idx]?.response ?? '').toString()
      }));
    }

    this.loading = false;
  }

  goBack() {

    this.router.navigate(['/physician/survey']);
  }
}
