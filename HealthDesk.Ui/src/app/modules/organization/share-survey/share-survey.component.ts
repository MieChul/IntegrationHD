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

  doctors: any[] = []; // All doctors list
  filteredDoctors: any[] = []; // Filtered list for display

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    // Get survey ID from route and mock survey details
    this.surveyId = this.route.snapshot.paramMap.get('id') || '';
    this.surveyTitle = `Survey ${this.surveyId}`; // Mock survey title
    this.surveyShareLink = `https://your-survey-platform.com/survey/${this.surveyId}`;

    // Mock doctors data
    this.doctors = [
      { name: 'Dr. Alice', speciality: 'Cardiologist', selected: false },
      { name: 'Dr. Bob', speciality: 'Dermatologist', selected: false },
      { name: 'Dr. Charlie', speciality: 'Neurologist', selected: false },
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

  // Filter doctors by name
  filterDoctors(): void {
    const searchTerm = this.searchValue.toLowerCase();
    this.filteredDoctors = this.doctors.filter((doctor) =>
      doctor.name.toLowerCase().includes(searchTerm)
    );
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
