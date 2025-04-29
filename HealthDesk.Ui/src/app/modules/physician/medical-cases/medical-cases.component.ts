import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Modal, Tooltip } from 'bootstrap';
import { map, Observable, startWith } from 'rxjs';
import { DatabaseService } from '../../../shared/services/database.service';

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
  templateUrl: './medical-cases.component.html',
  styleUrls: ['./medical-cases.component.scss']
})
export class MedicalCasesComponent implements OnInit {
  activeSubTab: string = 'home';

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
  specialities: any[] = [];
  specialityFilterCtrl = new FormControl();
  filteredSpecialities!: Observable<string[]>;
  preferenceControl    = new FormControl<string[]>([])

  recommendedMedicalCases: MedicalCase[] = [];
  latestMedicalCases: MedicalCase[] = [];
  trendingMedicalCases: MedicalCase[] = [];

  otherMedicalCases: MedicalCase[] = [
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

  yourMedicalCases: MedicalCase[] = [
    { id: 1, submittedBy: 'You', speciality: 'Cardiology', comments: [], likeCount: 0, shareCount: 0, shortDescription: 'Your own case study on cardiology', thumbnail: 'assets/remedies/3.jpg' },
    { id: 2, submittedBy: 'You', speciality: 'Neurology', comments: [], likeCount: 0, shareCount: 0, shortDescription: 'Your own case study on neurology', thumbnail: 'assets/remedies/9.jpg' },
    { id: 3, submittedBy: 'You', speciality: 'Orthopedics', comments: [], likeCount: 0, shareCount: 0, shortDescription: 'Your own case study on orthopedics', thumbnail: 'assets/remedies/5.jpg' }
  ];

  constructor(private router: Router, private modalService: NgbModal, private databaseService: DatabaseService,) { }

  async ngOnInit(): Promise<void> {

    this.specialities = await this.databaseService.getSpecialities();
    this.filteredSpecialities = this.specialityFilterCtrl.valueChanges.pipe(
      startWith(''),
      map((search) => this.filterOptions(search, this.specialities))
    );

    this.filterMedicalCases();

  }

  filterOptions(search: string, options: string[]): string[] {
    const filterValue = search.toLowerCase();
    return options.filter(option => option.toLowerCase().includes(filterValue));
  }
  createNewCase(): void {
    this.router.navigate(['/physician/new-medical-case']);
  }

  addComment(caseId: number): void {
    const index = this.otherMedicalCases.findIndex(c => c.id === caseId);
    if (index !== -1 && this.newComment[caseId]) {
      this.otherMedicalCases[index].comments.push(this.newComment[caseId]);
      this.newComment[caseId] = '';
    }
  }

  likeCase(caseId: number): void {
    const index = this.otherMedicalCases.findIndex(c => c.id === caseId);
    if (index !== -1) {
      this.otherMedicalCases[index].likeCount++;
      this.filterMedicalCases();
    }
  }

  viewComments(caseId: number): void {
    const index = this.otherMedicalCases.findIndex(c => c.id === caseId);
    if (index !== -1) {
      this.comments = this.otherMedicalCases[index].comments;
      const modalInstance = new Modal(this.commentsModal.nativeElement);
      modalInstance.show();
    }
  }

  shareCase(caseId: number): void {
    this.shareLink = `https://HealthDesk.com/physician/view-medical/${caseId}`;
    const modalInstance = new Modal(this.shareModal.nativeElement);
    modalInstance.show();
  }

  // Filtering based on search term and, for My Choice, on preference tags.
  searchMedicalCases(): void {
    this.filterMedicalCases();
  }

  addPreference(): void {
    const selected = this.preferenceControl.value || [];
    selected.forEach(pref => {
      if (!this.preferences.includes(pref)) {
        this.preferences.push(pref);
      }
    });

    // reset control & search input
    this.preferenceControl.setValue([]);
    this.specialityFilterCtrl.setValue('');

    // re-run your case filter now that prefs changed
    this.filterMedicalCases();
  }

  viewCase(caseId: number): void {
    this.router.navigate(['/patient/view-medical-case', caseId]);
  }

  setActiveSubTab(tab: string): void {
    this.activeSubTab = tab;
    this.filterMedicalCases();
  }

  filterMedicalCases(): void {
    const searchTerm = this.searchValue.toLowerCase();
    let filteredCases = this.otherMedicalCases;
    if (this.searchValue.trim()) {
      filteredCases = this.otherMedicalCases.filter(c =>
        c.speciality.toLowerCase().includes(searchTerm) ||
        c.submittedBy.toLowerCase().includes(searchTerm)
      );
    }
    // Latest: top 6 sorted by descending id.
    this.latestMedicalCases = [...filteredCases]
      .sort((a, b) => b.id - a.id)
      .slice(0, 6);

    // Trending: top 6 sorted by descending likeCount.
    this.trendingMedicalCases = [...filteredCases]
      .sort((a, b) => b.likeCount - a.likeCount)
      .slice(0, 6);

    // Recommended/My Choice: filter based on preferences (if any) and search.
    if (!this.searchValue.trim() && this.preferences.length === 0) {
      this.recommendedMedicalCases = [];
    } else {
      this.recommendedMedicalCases = filteredCases.filter(c => {
        return this.preferences.length
          ? this.preferences.some(pref =>
            c.speciality.toLowerCase().includes(pref.toLowerCase())
          )
          : true;
      });
    }
  }
}
