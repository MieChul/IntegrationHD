import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OrganizationService } from '../../services/organization.service';
import { AccountService } from '../../services/account.service';
import { Subscription, of } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';

@Component({
    selector: 'app-view-single-response',
    templateUrl: './view-single-response.component.html',
    styleUrls: ['./view-single-response.component.scss']
})
export class ViewSingleResponseComponent implements OnInit, OnDestroy {
    surveyForm!: FormGroup;
    survey: any;
    surveyId!: string;
    respondentId!: string;
    private subscriptions = new Subscription();

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private organizationService: OrganizationService,
        private accountService: AccountService
    ) { }

    ngOnInit(): void {
        this.surveyId = this.route.snapshot.paramMap.get('surveyId')!;
        this.respondentId = this.route.snapshot.paramMap.get('userId')!;
        if (!this.surveyId || !this.respondentId) {
            console.error('Survey ID or Respondent ID not found in route parameters.');
            return;
        }

        this.subscriptions.add(
            this.accountService.getUserData().pipe(
                switchMap(pharmaUser => {
                    if (!pharmaUser?.id) {
                        console.error('Pharmaceutical user ID not found.');
                        return of(null);
                    }
                    return this.organizationService.getSurveyById(pharmaUser.id, this.surveyId);
                }),
                catchError(err => {
                    console.error('Error loading survey:', err);
                    return of(null);
                })
            ).subscribe(survey => {
                if (survey) {
                    this.survey = survey;
                    const responseToView = this.survey.responses?.find((r: any) => r.userId === this.respondentId);
                    if (responseToView) {
                        this.buildAndPopulateForm(responseToView);
                    } else {
                        console.error('Response for this user not found.');
                    }
                }
            })
        );
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    buildAndPopulateForm(response: any): void {
        const questionsFormArray = this.fb.array<AbstractControl>([]);
        const responseData = response.responsesData;

        this.survey.questions.forEach((question: any) => {
            let control: AbstractControl;
            const answer = responseData[question.text];

            switch (question.type) {
                case 'checkbox':
                    control = this.fb.array(
                        question.options.map((option: any) =>
                            this.fb.control((answer as any[]).includes(option.text))
                        )
                    );
                    break;
                default:
                    control = this.fb.control(answer || '');
            }
            questionsFormArray.push(control);
        });

        this.surveyForm = this.fb.group({
            responses: questionsFormArray
        });

        this.surveyForm.disable();
    }

    get responses(): FormArray {
        return this.surveyForm.get('responses') as FormArray;
    }

    getRadioControl(index: number): FormControl {
        return this.responses.at(index) as FormControl;
    }

    getCheckboxControls(index: number): AbstractControl[] {
        return (this.responses.at(index) as FormArray).controls;
    }

    goBack() {
        this.router.navigate(['/organization/pharma/view-survey-response', this.surveyId]);
    }
}