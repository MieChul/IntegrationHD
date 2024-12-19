import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    // Get survey ID from route and mock survey details
    this.surveyId = this.route.snapshot.paramMap.get('id') || '';
    this.surveyTitle = `Survey ${this.surveyId}`; // Mock survey title
    this.surveyShareLink = `https://your-survey-platform.com/survey/${this.surveyId}`;

    // Mock doctors data
    this.doctors = [
      { name: 'Dr. Kapil Bhanushali', speciality: 'Cardiologist', city: 'Mumbai', selected: false },
      { name: 'Dr. Raghuvendra Iyer', speciality: 'Dermatologist', city: 'Hyderabad', selected: false },
      { name: 'Dr. Sonali Langde', speciality: 'Neurologist', city: 'Bengaluru', selected: false },
    ];
    this.filteredDoctors = [...this.doctors];
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
}
