import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientService } from '../../services/patient.service';
import { FilteringService } from '../../../shared/services/filter.service';
import { OrganizationService } from '../../services/organization.service';
import { AccountService } from '../../services/account.service';
import { Subscription, forkJoin, of } from 'rxjs';
import { switchMap, tap, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-share-survey',
  templateUrl: './share-survey.component.html',
  styleUrls: ['./share-survey.component.scss'],
})
export class ShareSurveyComponent implements OnInit, OnDestroy {
  surveyId: string = '';
  surveyTitle: string = '';
  surveyShareLink: string = '';
  isLinkCopied: boolean = false;
  searchValue: string = '';
  specialitySearchText: string = '';
  citySearchText: string = '';

  doctors: any[] = [];
  filteredDoctors: any[] = [];

  isSurveyShared: boolean = false;
  currentPharmaId: string | null = null;

  private subscriptions = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private patientService: PatientService,
    private filteringService: FilteringService,
    private organizationService: OrganizationService,
    private accountService: AccountService
  ) { }

  ngOnInit(): void {
    this.surveyId = this.route.snapshot.paramMap.get('id') || '';
    if (!this.surveyId) {
      console.error('Survey ID not found in route.');
      this.router.navigate(['/organization/pharma/surveys']);
      return;
    }

    this.surveyTitle = `${this.surveyId}`;
    this.surveyShareLink = `https://www.healthdeskapp.in/physician/take-survey/${this.surveyId}`;

    this.subscriptions.add(
      this.accountService.getUserData().pipe(
        tap(userData => {
          this.currentPharmaId = userData?.id;
          if (!this.currentPharmaId) {
            console.error('User data not available. Cannot fetch surveys.');
            this.router.navigate(['/login']);
          }
        }),
        switchMap(() => {
          if (!this.currentPharmaId) {
            return of(null);
          }
          return forkJoin({
            survey: this.organizationService.getSurveyById(this.currentPharmaId, this.surveyId),
            entities: this.patientService.getEntities()
          }).pipe(
            catchError(error => {
              console.error('Error fetching data:', error);
              return of({ survey: null, entities: [] });
            })
          );
        })
      ).subscribe({
        next: (result) => {
          if (!result) {
            return;
          }
          const { survey, entities } = result;

          if (survey && survey.sharedWith && survey.sharedWith.length > 0) {
            this.isSurveyShared = true;
          }

          this.doctors = entities
            .filter((entity: any) => entity.entityType === "physician")
            .map((entity: any) => ({
              ...entity,
              reviews: entity.reviews || []
            }));

          this.doctors = Array.from(
            new Map(this.doctors.map((doctor: any) => [doctor.userId, doctor])).values()
          );

          this.filteredDoctors = [...this.doctors];
        },
        error: (err) => {
          console.error('Unhandled error in ngOnInit stream:', err);
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  copyLink(): void {
    navigator.clipboard.writeText(this.surveyShareLink).then(() => {
      this.isLinkCopied = true;
      setTimeout(() => (this.isLinkCopied = false), 3000);
    });
  }

  

  sendSurvey(): void {
    if (!this.currentPharmaId) {
      console.error('Cannot send survey: Pharmaceutical ID is missing.');
      return;
    }

    const selectedDoctorIds = this.filteredDoctors
      .filter((doctor) => doctor.selected)
      .map((doctor) => doctor.userId);

    if (selectedDoctorIds.length > 0) {
      this.subscriptions.add(
        this.organizationService.addSharedWith(this.currentPharmaId, this.surveyId, selectedDoctorIds)
          .subscribe({
            next: () => {
              console.log('Survey shared successfully!');
              this.isSurveyShared = true;
            },
            error: (error) => {
              console.error('Error sharing survey:', error);
            }
          })
      );
    } else {
      console.log('No doctors selected!');
    }
  }

  hasSelectedDoctors(): boolean {
    return this.filteredDoctors.some(d => d.selected);
  }

  applyFilters(): void {
    this.filteredDoctors = this.filteringService.filter(
      this.doctors,
      {
        name: this.searchValue,
        speciality: this.specialitySearchText,
        location: this.citySearchText
      },
      []
    );
  }

  goBack() {
    this.router.navigate(['/organization/pharma/surveys']);
  }
}