import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Modal, Tooltip } from 'bootstrap';

interface MedicalCase {
  id: number;
  submittedBy: string;
  speciality: string;
  comments: string[];
  likeCount: number;
  shareCount: number;
  shortDescription: string;
  thumbnail: string; 
}

@Component({
  selector: 'app-medical-cases',
  templateUrl: './remedies.component.html',
  styleUrls: ['./remedies.component.scss']
})
export class RemediesComponent implements OnInit {

  ngAfterViewInit(): void {
    const tooltipTriggerList = Array.from(
      document.querySelectorAll('[data-bs-toggle="tooltip"]')
    );
    tooltipTriggerList.forEach((tooltipTriggerEl) => {
      new Tooltip(tooltipTriggerEl);
    });
  }
  
  @ViewChild('commentsModal') commentsModal!: ElementRef;
  @ViewChild('shareModal') shareModal!: ElementRef;

  shareLink: string = '';
  searchValue: string = '';
  comments: string[] = [];
  newComment: { [key: number]: string } = {};
  newPreference: string = '';
  preferences: string[] = [];

  recommendedRemedies: MedicalCase[] = [];
  latestRemedies: MedicalCase[] = [];
  trendingRemedies: MedicalCase[] = [];

  // Base remedies plus 25 additional dummy cases
  otherRemedies: MedicalCase[] = [
    { id: 1, submittedBy: 'Dr. Smith', speciality: 'Cardiology', comments: ['Great case!'], likeCount: 10, shareCount: 5, shortDescription: 'A detailed case study on cardiology', thumbnail: 'https://via.placeholder.com/150?text=Case+1' },
    { id: 2, submittedBy: 'Dr. Johnson', speciality: 'Neurology', comments: [], likeCount: 7, shareCount: 2, shortDescription: 'An intriguing neurology case', thumbnail: 'https://via.placeholder.com/150?text=Case+2' },
    { id: 3, submittedBy: 'Dr. Lee', speciality: 'Orthopedics', comments: [], likeCount: 15, shareCount: 3, shortDescription: 'Orthopedics case study and analysis', thumbnail: 'https://via.placeholder.com/150?text=Case+3' },
    { id: 4, submittedBy: 'Dr. Brown', speciality: 'Dermatology', comments: [], likeCount: 8, shareCount: 4, shortDescription: 'Dermatology case with treatment details', thumbnail: 'https://via.placeholder.com/150?text=Case+4' },
    { id: 5, submittedBy: 'Dr. Taylor', speciality: 'Pediatrics', comments: [], likeCount: 12, shareCount: 6, shortDescription: 'A pediatric case involving rare symptoms', thumbnail: 'https://via.placeholder.com/150?text=Case+5' },
    // Dummy remedies from ID 6 to 30
    { id: 6, submittedBy: 'Dr. Adams', speciality: 'Oncology', comments: [], likeCount: 9, shareCount: 3, shortDescription: 'Case study on oncology treatment', thumbnail: 'https://via.placeholder.com/150?text=Case+6' },
    { id: 7, submittedBy: 'Dr. Clark', speciality: 'Gastroenterology', comments: [], likeCount: 11, shareCount: 4, shortDescription: 'Digestive health case analysis', thumbnail: 'https://via.placeholder.com/150?text=Case+7' },
    { id: 8, submittedBy: 'Dr. Evans', speciality: 'Urology', comments: [], likeCount: 6, shareCount: 2, shortDescription: 'Urological case study', thumbnail: 'https://via.placeholder.com/150?text=Case+8' },
    { id: 9, submittedBy: 'Dr. Foster', speciality: 'Endocrinology', comments: [], likeCount: 14, shareCount: 5, shortDescription: 'Endocrine system analysis', thumbnail: 'https://via.placeholder.com/150?text=Case+9' },
    { id: 10, submittedBy: 'Dr. Green', speciality: 'Rheumatology', comments: [], likeCount: 5, shareCount: 1, shortDescription: 'Rheumatology case report', thumbnail: 'https://via.placeholder.com/150?text=Case+10' },
    { id: 11, submittedBy: 'Dr. Harris', speciality: 'Nephrology', comments: [], likeCount: 13, shareCount: 4, shortDescription: 'Kidney disease case study', thumbnail: 'https://via.placeholder.com/150?text=Case+11' },
    { id: 12, submittedBy: 'Dr. Irving', speciality: 'Ophthalmology', comments: [], likeCount: 7, shareCount: 3, shortDescription: 'Eye condition and treatment', thumbnail: 'https://via.placeholder.com/150?text=Case+12' },
    { id: 13, submittedBy: 'Dr. Jones', speciality: 'ENT', comments: [], likeCount: 8, shareCount: 2, shortDescription: 'ENT examination report', thumbnail: 'https://via.placeholder.com/150?text=Case+13' },
    { id: 14, submittedBy: 'Dr. King', speciality: 'Psychiatry', comments: [], likeCount: 10, shareCount: 3, shortDescription: 'Psychiatric case discussion', thumbnail: 'https://via.placeholder.com/150?text=Case+14' },
    { id: 15, submittedBy: 'Dr. Lewis', speciality: 'Immunology', comments: [], likeCount: 9, shareCount: 2, shortDescription: 'Immunology and allergies case', thumbnail: 'https://via.placeholder.com/150?text=Case+15' },
    { id: 16, submittedBy: 'Dr. Martin', speciality: 'Cardiology', comments: [], likeCount: 11, shareCount: 3, shortDescription: 'Cardiac arrest emergency case', thumbnail: 'https://via.placeholder.com/150?text=Case+16' },
    { id: 17, submittedBy: 'Dr. Nelson', speciality: 'Neurology', comments: [], likeCount: 12, shareCount: 5, shortDescription: 'Neurological disorder diagnosis', thumbnail: 'https://via.placeholder.com/150?text=Case+17' },
    { id: 18, submittedBy: 'Dr. O’Brien', speciality: 'Orthopedics', comments: [], likeCount: 15, shareCount: 4, shortDescription: 'Fracture management and recovery', thumbnail: 'https://via.placeholder.com/150?text=Case+18' },
    { id: 19, submittedBy: 'Dr. Parker', speciality: 'Dermatology', comments: [], likeCount: 8, shareCount: 3, shortDescription: 'Skin rash and treatment case', thumbnail: 'https://via.placeholder.com/150?text=Case+19' },
    { id: 20, submittedBy: 'Dr. Quinn', speciality: 'Pediatrics', comments: [], likeCount: 10, shareCount: 4, shortDescription: 'Childhood illness case study', thumbnail: 'https://via.placeholder.com/150?text=Case+20' },
    { id: 21, submittedBy: 'Dr. Roberts', speciality: 'Oncology', comments: [], likeCount: 9, shareCount: 2, shortDescription: 'Cancer treatment analysis', thumbnail: 'https://via.placeholder.com/150?text=Case+21' },
    { id: 22, submittedBy: 'Dr. Scott', speciality: 'Gastroenterology', comments: [], likeCount: 7, shareCount: 3, shortDescription: 'Stomach ulcer management', thumbnail: 'https://via.placeholder.com/150?text=Case+22' },
    { id: 23, submittedBy: 'Dr. Turner', speciality: 'Urology', comments: [], likeCount: 8, shareCount: 2, shortDescription: 'Bladder infection case study', thumbnail: 'https://via.placeholder.com/150?text=Case+23' },
    { id: 24, submittedBy: 'Dr. Underwood', speciality: 'Endocrinology', comments: [], likeCount: 10, shareCount: 3, shortDescription: 'Diabetes management case', thumbnail: 'https://via.placeholder.com/150?text=Case+24' },
    { id: 25, submittedBy: 'Dr. Vincent', speciality: 'Rheumatology', comments: [], likeCount: 6, shareCount: 1, shortDescription: 'Arthritis patient review', thumbnail: 'https://via.placeholder.com/150?text=Case+25' },
    { id: 26, submittedBy: 'Dr. White', speciality: 'Nephrology', comments: [], likeCount: 11, shareCount: 4, shortDescription: 'Renal failure and dialysis', thumbnail: 'https://via.placeholder.com/150?text=Case+26' },
    { id: 27, submittedBy: 'Dr. Xander', speciality: 'Ophthalmology', comments: [], likeCount: 7, shareCount: 3, shortDescription: 'Cataract surgery review', thumbnail: 'https://via.placeholder.com/150?text=Case+27' },
    { id: 28, submittedBy: 'Dr. Young', speciality: 'ENT', comments: [], likeCount: 8, shareCount: 2, shortDescription: 'Sinus infection case study', thumbnail: 'https://via.placeholder.com/150?text=Case+28' },
    { id: 29, submittedBy: 'Dr. Zimmerman', speciality: 'Psychiatry', comments: [], likeCount: 9, shareCount: 3, shortDescription: 'Mental health case discussion', thumbnail: 'https://via.placeholder.com/150?text=Case+29' },
    { id: 30, submittedBy: 'Dr. Allen', speciality: 'Immunology', comments: [], likeCount: 10, shareCount: 4, shortDescription: 'Vaccine response case study', thumbnail: 'https://via.placeholder.com/150?text=Case+30' },
  ];

  yourRemedies: MedicalCase[] = [
    { id: 1, submittedBy: 'You', speciality: 'Cardiology', comments: [], likeCount: 0, shareCount: 0, shortDescription: 'Your own case study on cardiology', thumbnail: 'https://via.placeholder.com/150?text=Your+Case+1' },
    { id: 2, submittedBy: 'You', speciality: 'Neurology', comments: [], likeCount: 0, shareCount: 0, shortDescription: 'Your own case study on neurology', thumbnail: 'https://via.placeholder.com/150?text=Your+Case+2' },
    { id: 3, submittedBy: 'You', speciality: 'Orthopedics', comments: [], likeCount: 0, shareCount: 0, shortDescription: 'Your own case study on orthopedics', thumbnail: 'https://via.placeholder.com/150?text=Your+Case+3' },
  ];

  constructor(private router: Router, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.filterRemedies();
  }

  createNewCase(): void {
    this.router.navigate(['/physician/new-medical-case']);
  }

  addComment(caseId: number): void {
    const index = this.otherRemedies.findIndex(c => c.id === caseId);
    if (index !== -1 && this.newComment[caseId]) {
      this.otherRemedies[index].comments.push(this.newComment[caseId]);
      this.newComment[caseId] = '';
    }
  }

  likeCase(caseId: number): void {
    const index = this.otherRemedies.findIndex(c => c.id === caseId);
    if (index !== -1) {
      this.otherRemedies[index].likeCount++;
      this.filterRemedies();
    }
  }

  viewComments(caseId: number): void {
    const index = this.otherRemedies.findIndex(c => c.id === caseId);
    if (index !== -1) {
      this.comments = this.otherRemedies[index].comments;
      const modalInstance = new Modal(this.commentsModal.nativeElement);
      modalInstance.show();
    }
  }

  shareCase(caseId: number): void {
    this.shareLink = `https://HealthDesk.com/physician/view-medical/${caseId}`;
    const modalInstance = new Modal(this.shareModal.nativeElement);
    modalInstance.show();
  }

  // Filtering based on search term and preference tags.
  searchRemedies(): void {
    this.filterRemedies();
  }

  filterRemedies(): void {
    const searchTerm = this.searchValue.toLowerCase();

    // Only filter recommended remedies if a search term or preferences exist.
    if (!this.searchValue.trim() && this.preferences.length === 0) {
      this.recommendedRemedies = [];
    } else {
      this.recommendedRemedies = this.otherRemedies.filter(remedy => {
        const matchesSearch = this.searchValue.trim()
          ? (remedy.speciality.toLowerCase().includes(searchTerm) ||
             remedy.submittedBy.toLowerCase().includes(searchTerm))
          : true;
        const matchesPreference = this.preferences.length
          ? this.preferences.some(pref =>
              remedy.speciality.toLowerCase().includes(pref.toLowerCase())
            )
          : true;
        return matchesSearch && matchesPreference;
      });
    }

    // Latest: top 6 sorted by descending id.
    this.latestRemedies = [...this.otherRemedies]
      .sort((a, b) => b.id - a.id)
      .slice(0, 6);

    // Trending: top 6 sorted by descending likeCount.
    this.trendingRemedies = [...this.otherRemedies]
      .sort((a, b) => b.likeCount - a.likeCount)
      .slice(0, 6);
  }

  addPreference(): void {
    if (this.newPreference.trim()) {
      this.preferences.push(this.newPreference.trim());
      this.newPreference = '';
      this.filterRemedies();
    }
  }

  viewCase(caseId: number): void {
    this.router.navigate(['/physician/view-medical-case', caseId]);
  }
}
