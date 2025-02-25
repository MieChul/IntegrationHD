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
    { id: 1, submittedBy: ' Smith', speciality: 'Cardiology', comments: ['Great case!'], likeCount: 10, shareCount: 5, shortDescription: 'A detailed case study on cardiology', thumbnail: 'assets/remedies/3.jpg' },
    { id: 2, submittedBy: ' Johnson', speciality: 'Neurology', comments: [], likeCount: 7, shareCount: 2, shortDescription: 'An intriguing neurology case', thumbnail: 'assets/remedies/7.jpg' },
    { id: 3, submittedBy: ' Lee', speciality: 'Orthopedics', comments: [], likeCount: 15, shareCount: 3, shortDescription: 'Orthopedics case study and analysis', thumbnail: 'assets/remedies/2.jpg' },
    { id: 4, submittedBy: ' Brown', speciality: 'Dermatology', comments: [], likeCount: 8, shareCount: 4, shortDescription: 'Dermatology case with treatment details', thumbnail: 'assets/remedies/8.jpg' },
    { id: 5, submittedBy: ' Taylor', speciality: 'Pediatrics', comments: [], likeCount: 12, shareCount: 6, shortDescription: 'A pediatric case involving rare symptoms', thumbnail: 'assets/remedies/5.jpg' },
    { id: 6, submittedBy: ' Adams', speciality: 'Oncology', comments: [], likeCount: 9, shareCount: 3, shortDescription: 'Case study on oncology treatment', thumbnail: 'assets/remedies/4.jpg' },
    { id: 7, submittedBy: ' Clark', speciality: 'Gastroenterology', comments: [], likeCount: 11, shareCount: 4, shortDescription: 'Digestive health case analysis', thumbnail: 'assets/remedies/10.jpg' },
    { id: 8, submittedBy: ' Evans', speciality: 'Urology', comments: [], likeCount: 6, shareCount: 2, shortDescription: 'Urological case study', thumbnail: 'assets/remedies/9.jpg' },
    { id: 9, submittedBy: ' Foster', speciality: 'Endocrinology', comments: [], likeCount: 14, shareCount: 5, shortDescription: 'Endocrine system analysis', thumbnail: 'assets/remedies/1.jpg' },
    { id: 10, submittedBy: ' Green', speciality: 'Rheumatology', comments: [], likeCount: 5, shareCount: 1, shortDescription: 'Rheumatology case report', thumbnail: 'assets/remedies/6.jpg' },
    { id: 11, submittedBy: ' Harris', speciality: 'Nephrology', comments: [], likeCount: 13, shareCount: 4, shortDescription: 'Kidney disease case study', thumbnail: 'assets/remedies/11.jpg' },
    { id: 12, submittedBy: ' Irving', speciality: 'Ophthalmology', comments: [], likeCount: 7, shareCount: 3, shortDescription: 'Eye condition and treatment', thumbnail: 'assets/remedies/12.jpg' },
    { id: 13, submittedBy: ' Jones', speciality: 'ENT', comments: [], likeCount: 8, shareCount: 2, shortDescription: 'ENT examination report', thumbnail: 'assets/remedies/2.jpg' },
    { id: 14, submittedBy: ' King', speciality: 'Psychiatry', comments: [], likeCount: 10, shareCount: 3, shortDescription: 'Psychiatric case discussion', thumbnail: 'assets/remedies/4.jpg' },
    { id: 15, submittedBy: ' Lewis', speciality: 'Immunology', comments: [], likeCount: 9, shareCount: 2, shortDescription: 'Immunology and allergies case', thumbnail: 'assets/remedies/7.jpg' }
  ];
  
  yourRemedies: MedicalCase[] = [
    { id: 1, submittedBy: 'You', speciality: 'Cardiology', comments: [], likeCount: 0, shareCount: 0, shortDescription: 'Your own case study on cardiology', thumbnail: 'assets/remedies/3.jpg' },
    { id: 2, submittedBy: 'You', speciality: 'Neurology', comments: [], likeCount: 0, shareCount: 0, shortDescription: 'Your own case study on neurology', thumbnail: 'assets/remedies/9.jpg' },
    { id: 3, submittedBy: 'You', speciality: 'Orthopedics', comments: [], likeCount: 0, shareCount: 0, shortDescription: 'Your own case study on orthopedics', thumbnail: 'assets/remedies/5.jpg' }
  ];

  constructor(private router: Router, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.filterRemedies();
  }

  createNewCase(): void {
    this.router.navigate(['/patient/new-remedy']);
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
    this.router.navigate(['/patient/view-remedy', caseId]);
  }
}
