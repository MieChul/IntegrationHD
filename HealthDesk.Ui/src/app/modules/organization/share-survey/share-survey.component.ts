import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientService } from '../../services/patient.service';
import { FilteringService } from '../../../shared/services/filter.service';

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

  constructor(private route: ActivatedRoute, private router: Router, private patientService: PatientService,private filteringService: FilteringService) { }

  ngOnInit(): void {
    // Get survey ID from route and mock survey details
    this.surveyId = this.route.snapshot.paramMap.get('id') || '';
    this.surveyTitle = `Survey ${this.surveyId}`; // Mock survey title
    this.surveyShareLink = `https://your-survey-platform.com/survey/${this.surveyId}`;

    this.patientService.getEntities().subscribe({
      next: (data: any) => {
        this.doctors = data
        .filter((entity: any) => entity.entityType === "physician") // Filter only physicians
        .map((entity: any) => ({
          ...entity,
          reviews: entity.reviews || [] // Ensure reviews field is always an array
        }));
      
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

      // Return true only if all non-empty conditions match
      return matchesName && matchesSpeciality && matchesOpdTiming;
    });
  }

  // Send survey to selected doctors
  sendSurvey(): void {
    const selectedDoctors = this.filteredDoctors
      .filter((doctor) => doctor.selected)
      .map((doctor) => doctor.name);

    if (selectedDoctors.length > 0) {
      console.log(`Sending survey to: ${selectedDoctors.join(', ')}`);
      // Clear selections after sending
      this.filteredDoctors.forEach((doctor) => (doctor.selected = false));
      alert('Survey sent successfully!');
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
        speciality:this.specialitySearchText,
        location:this.citySearchText
      },
      []
    );
  }
}
