import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientService } from '../../services/patient.service';
import { FilteringService } from '../../../shared/services/filter.service';
import { OrganizationService } from '../../services/organization.service';

@Component({
  selector: 'app-share-survey',
  templateUrl: './share-survey.component.html',
  styleUrls: ['./share-survey.component.scss'],
})
export class ShareSurveyComponent implements OnInit {
  surveyId: string = ''; // Survey ID from route
  surveyTitle: string = ''; // Survey title
  surveyShareLink: string = ''; // Survey share link
  isLinkCopied: boolean = false; // Link copied flag
  searchValue: string = ''; // Search input value
  specialitySearchText: string = '';
  citySearchText: string = '';

  doctors: any[] = []; // All doctors list
  filteredDoctors: any[] = []; // Filtered list for display

  // Flag to disable checkboxes once survey is shared
  isSurveyShared: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private patientService: PatientService,
    private filteringService: FilteringService,
    private organizationService: OrganizationService
  ) { }

  ngOnInit(): void {
    // Get survey ID from route and mock survey details
    this.surveyId = this.route.snapshot.paramMap.get('id') || '';
    this.surveyTitle = `Survey ${this.surveyId}`; // Mock survey title
    this.surveyShareLink = `https://your-survey-platform.com/survey/${this.surveyId}`;

    // Check if survey is already shared
    this.organizationService.getSurveyById(this.surveyId).then((survey) => {
      if (survey && survey.sharedWith && survey.sharedWith.length > 0) {
        this.isSurveyShared = true;
      }
    });

    this.patientService.getEntities().subscribe({
      next: (data: any) => {
        this.doctors = data
          .filter((entity: any) => entity.entityType === "physician")
          .map((entity: any) => ({
            ...entity,
            reviews: entity.reviews || []
          }));

        // Filter unique doctors based on userId:
        this.doctors = Array.from(
          new Map(this.doctors.map((doctor: any) => [doctor.userId, doctor])).values()
        );

        this.filteredDoctors = [...this.doctors]; // Copy to filteredDoctors
      },
      error: (error) => {
        console.error('Error loading entities:', error);
      }
    });
  }

  // Copy survey link to clipboard
  copyLink(): void {
    navigator.clipboard.writeText(this.surveyShareLink).then(() => {
      this.isLinkCopied = true;
      setTimeout(() => (this.isLinkCopied = false), 3000);
    });
  }

  filterDoctors(): void {
    this.filteredDoctors = this.doctors.filter(doc => {
      const matchesName = this.searchValue
        ? doc.name.toLowerCase().includes(this.searchValue.toLowerCase())
        : true;

      const matchesSpeciality = this.specialitySearchText
        ? doc.speciality.toLowerCase().includes(this.specialitySearchText.toLowerCase())
        : true;

      const matchesOpdTiming = this.citySearchText
        ? doc.city.toLowerCase().includes(this.citySearchText.toLowerCase())
        : true;

      return matchesName && matchesSpeciality && matchesOpdTiming;
    });
  }

  // Send survey to selected doctors
  sendSurvey(): void {
    // Use doctor ids (assuming each doctor has a 'userId' property)
    const selectedDoctorIds = this.filteredDoctors
      .filter((doctor) => doctor.selected)
      .map((doctor) => doctor.userId);

    if (selectedDoctorIds.length > 0) {
      // Retrieve the survey record from IndexedDB, update it with sharedWith, and save
      this.organizationService.getSurveyById(this.surveyId).then((survey) => {
        survey.sharedWith = selectedDoctorIds;
        this.organizationService.updateSurvey(this.surveyId, survey).then(() => {
          alert('Survey shared successfully!');
          this.isSurveyShared = true; // disable further changes
        });
      });
    } else {
      alert('No doctors selected!');
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
