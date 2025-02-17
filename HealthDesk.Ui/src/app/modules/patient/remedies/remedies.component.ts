import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Modal } from 'bootstrap';

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

  otherRemedies: MedicalCase[] = [
    { id: 1, submittedBy: 'Dr. Smith', speciality: 'Cardiology', comments: ['Great case!'], likeCount: 10, shareCount: 5, shortDescription: 'A detailed case study on cardiology',thumbnail:'' },
    { id: 2, submittedBy: 'Dr. Johnson', speciality: 'Neurology', comments: [], likeCount: 7, shareCount: 2, shortDescription: 'An intriguing neurology case',thumbnail:'' },
    { id: 3, submittedBy: 'Dr. Lee', speciality: 'Orthopedics', comments: [], likeCount: 15, shareCount: 3, shortDescription: 'Orthopedics case study and analysis',thumbnail:'' },
    { id: 4, submittedBy: 'Dr. Brown', speciality: 'Dermatology', comments: [], likeCount: 8, shareCount: 4, shortDescription: 'Dermatology case with treatment details',thumbnail:'' },
    { id: 5, submittedBy: 'Dr. Taylor', speciality: 'Pediatrics', comments: [], likeCount: 12, shareCount: 6, shortDescription: 'A pediatric case involving rare symptoms',thumbnail:'' },
  ];

  yourRemedies: MedicalCase[] = [
    { id: 1, submittedBy: 'You', speciality: 'Cardiology', comments: [], likeCount: 0, shareCount: 0, shortDescription: 'Your own case study on cardiology',thumbnail:'' },
    { id: 2, submittedBy: 'You', speciality: 'Neurology', comments: [], likeCount: 0, shareCount: 0, shortDescription: 'Your own case study on neurology',thumbnail:'' },
    { id: 3, submittedBy: 'You', speciality: 'Orthopedics', comments: [], likeCount: 0, shareCount: 0, shortDescription: 'Your own case study on orthopedics',thumbnail:'' },
  ];

  constructor(private router: Router, private modalService: NgbModal) {}

 ngOnInit(): void {
    this.filterRemedies();
  }



  createNewCase() {
    this.router.navigate(['/physician/new-medical-case']);
  }

  addComment(caseId: number) {
    const caseIndex = this.otherRemedies.findIndex(c => c.id === caseId);
    if (caseIndex !== -1 && this.newComment[caseId]) {
      this.otherRemedies[caseIndex].comments.push(this.newComment[caseId]);
      this.newComment[caseId] = '';
    }
  }

  likeCase(caseId: number) {
    const caseIndex = this.otherRemedies.findIndex(c => c.id === caseId);
    if (caseIndex !== -1) {
      this.otherRemedies[caseIndex].likeCount++;
    }
  }

  viewComments(caseId: number) {
    const caseIndex = this.otherRemedies.findIndex(c => c.id === caseId);
    if (caseIndex !== -1) {
      this.comments = this.otherRemedies[caseIndex].comments;
      const commentsModalInstance = new Modal(this.commentsModal.nativeElement);
      commentsModalInstance.show();
    }
  }

  shareCase(caseId: number) {
    this.shareLink = 'https://HealthDesk.com/physician/view-medical/${caseId}';
    const shareModalInstance = new Modal(this.shareModal.nativeElement);
    shareModalInstance.show();
  }

  filteredRemedies: MedicalCase[] = [...this.otherRemedies]; // Initialize with all remedies

  searchRemedies(): void {
    const searchTerm = this.searchValue.toLowerCase();
    this.filteredRemedies = this.otherRemedies.filter((remedy) =>
      remedy.speciality.toLowerCase().includes(searchTerm) ||
      remedy.submittedBy.toLowerCase().includes(searchTerm)
    );
  }

  filterRemedies(): void {
    this.latestRemedies = [...this.otherRemedies].sort((a, b) => b.id - a.id).slice(0, 5);
    this.trendingRemedies = [...this.otherRemedies].sort((a, b) => b.likeCount - a.likeCount).slice(0, 5);
    this.recommendedRemedies = this.otherRemedies.filter(remedy =>
      this.preferences.some(pref => remedy.speciality.includes(pref))
    );
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