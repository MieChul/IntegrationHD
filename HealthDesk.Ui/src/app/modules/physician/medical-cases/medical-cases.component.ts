import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Modal, Tooltip } from 'bootstrap';
import { map, Observable, startWith } from 'rxjs';
import { DatabaseService } from '../../../shared/services/database.service';
import { AccountService } from '../../services/account.service';
import { PhysicianService } from '../../services/physician.service';

@Component({
  selector: 'app-medical-cases',
  templateUrl: './medical-cases.component.html',
  styleUrls: ['./medical-cases.component.scss']
})
export class MedicalCasesComponent implements OnInit {

  ngAfterViewInit(): void {
    const tooltipTriggerList = Array.from(
      document.querySelectorAll('[data-bs-toggle="tooltip"]')
    );
    tooltipTriggerList.forEach((tooltipTriggerEl) => {
      new Tooltip(tooltipTriggerEl);
    });
  }

  @ViewChild('commentModal') commentModal!: ElementRef;
  @ViewChild('shareModal') shareModal!: ElementRef;

  userData: any;
  shareLink: string = '';
  searchValue: string[] = [];
  newPreference: string = '';
  preferences: string[] = [];
  selectedPreferences: string[] = [];
  activeSubTab: string = 'home';
  specialities: any[] = [];
  specialityFilterCtrl = new FormControl();
  filteredSpecialities!: Observable<string[]>;
  recommendedMedicalCases: any = [];
  latestMedicalCases: any = [];
  trendingMedicalCases: any = [];
  otherMedicalCases: any = [];
  yourMedicalCases: any = [];
  case: any;
  existingComment: any;
  newCommentText: any;
  isEditing: any;

  constructor(private router: Router, private modalService: NgbModal, private databaseService: DatabaseService, private accountService: AccountService, private physicianService: PhysicianService) { }

  async ngOnInit(): Promise<void> {
    this.accountService.getUserData().subscribe({
      next: async (data) => {
        this.userData = data;

        this.specialities = await this.databaseService.getSpecialities();
        await this.loadCases();
        await this.loadInfo();
        await this.initializeSearch();
      },
      error: (err) => console.error('Error fetching user data:', err)
    });
  }

  initializeSearch(): void {
    this.filteredSpecialities = this.specialityFilterCtrl.valueChanges.pipe(
      startWith(''),
      map((search) => this.filterOptions(search, this.specialities))
    );
  }

  savePreferences() {
    this.physicianService.updatePreferences(this.userData.id, this.selectedPreferences).subscribe({
      next: (res: any) => {
        this.loadInfo();
      },
      error: (error) => {
        console.error('Error Saving data:', error);
      }
    });
  }

  loadCases(): void {
    if (!this.userData?.id) {
      console.error('User ID is missing');
      return;
    }

    this.physicianService.getMedicalCases(this.userData.id).subscribe({
      next: (cases: any) => {
        this.otherMedicalCases = cases.data.others;
        this.yourMedicalCases = cases.data.yours;
      },
      error: (error) => {
        console.error('Error loading history:', error);
      }
    });
  }

  loadInfo() {
    this.physicianService.getPhysicianInfo(this.userData.id).subscribe({
      next: info => {
        this.selectedPreferences = info.data.preferences || [];
        this.filterMedicalCases();
      },
      error: (error) => {

      }
    });
  }

  filterOptions(search: string, options: string[]): string[] {
    const filterValue = search.toLowerCase();
    return options.filter(option => option.toLowerCase().includes(filterValue));
  }

  onPreferencesChange(newPrefs: string[]) {
    this.selectedPreferences = newPrefs;
  }

  createNewCase(): void {
    this.router.navigate(['/physician/new-medical-case']);
  }

  toggleLike(user: string, id: string,): void {
    this.physicianService.toggleLike(user, id, this.userData.id).subscribe({
      next: (com: any) => {
        this.loadCases();
      },
      error: (error) => {
        console.error('Error Saving data:', error);
      }
    });
  }

  shareCase(caseId: string): void {
    this.shareLink = `https://HealthDesk.com/physician/view-medical/${caseId}`;
    const modalInstance = new Modal(this.shareModal.nativeElement);
    modalInstance.show();
  }


  viewCase(caseId: string): void {
    this.router.navigate(['/physician/view-medical-case', caseId]);
  }

  setActiveSubTab(tab: string): void {
    this.activeSubTab = tab;
    this.filterMedicalCases();
  }

  filterMedicalCases(): void {
    const limit = this.getDisplayLimit();

    const searchVals = (Array.isArray(this.searchValue) ? this.searchValue : [])
      .map(val => val.trim().toLowerCase())
      .filter(val => val);

    const matchesSearch = (cases: any): boolean => {
      return Array.isArray(cases.speciality) &&
        cases.speciality.some((rf: string) =>
          searchVals.some(search => rf.toLowerCase().includes(search))
        );
    };

    const filteredCases = searchVals.length
      ? this.otherMedicalCases.filter(matchesSearch)
      : [...this.otherMedicalCases];

    this.latestMedicalCases = filteredCases
      .sort((a: any, b: any) => new Date(b.createDate).getTime() - new Date(a.createDate).getTime())
      .slice(0, limit);

    this.trendingMedicalCases = filteredCases
      .sort((a: any, b: any) => b.likedCount - a.likedCount)
      .slice(0, limit);

    this.filterRecommended();
  }

  filterRecommended(): void {
    const limit = this.getDisplayLimit();

    const prefs = (this.selectedPreferences || [])
      .map(p => p.toLowerCase().trim())
      .filter(p => p);

    if (!prefs.length) {
      this.recommendedMedicalCases = [];
      return;
    }

    this.recommendedMedicalCases = this.otherMedicalCases
      .filter((cases: any) => {
        const rfArr = Array.isArray(cases.speciality)
          ? cases.speciality
          : [cases.speciality];

        return rfArr
          .map((rf: any) => (rf || '').toLowerCase().trim())
          .some((rf: string) => prefs.includes(rf));
      })
      .sort((a: any, b: any) =>
        new Date(b.createDate).getTime() - new Date(a.createDate).getTime()
      )
      .slice(0, limit);
  }

  private getDisplayLimit(): number {
    return ['latest', 'trending', 'mychoice'].includes(this.activeSubTab) ? 30 : 5;
  }

  hasLiked(cases: any): boolean {
    return cases?.likedBy?.includes(this.userData.id);
  }

  copyLink(): void {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(this.shareLink)
        .then(() => console.log('Link copied!'))
        .catch(err => console.error('Copy failed', err));
    } else {
      const dummy = document.createElement('textarea');
      dummy.value = this.shareLink;
      document.body.appendChild(dummy);
      dummy.select();
      document.execCommand('copy');
      document.body.removeChild(dummy);
      console.log('Link copied (fallback)!');
    }
  }

  enableEdit(): void {
    this.isEditing = true;
  }

  postComment(): void {
    const trimmedText = this.newCommentText.trim();
    if (!trimmedText) return;

    const comment = {
      id: this.existingComment?.id,
      userId: this.userData.id,
      text: trimmedText,
      itemType: "Medical Case"
    };

    this.physicianService.saveComment(this.case.userId, this.case.id, comment).subscribe({
      next: (com: any) => {
        this.loadCases();
        this.newCommentText = '';
        this.isEditing = false;
      },
      error: (error) => {
        console.error('Error Saving data:', error);
      }
    });
  }

  viewComments(selectedCase: any) {
    if (!selectedCase) return;

    this.case = selectedCase;
    this.existingComment = selectedCase.comments?.find(
      (c: any) => c.userId === this.userData.id
    );
    this.newCommentText = this.existingComment?.text || '';
    this.isEditing = false;

    const modalInstance = new Modal(this.commentModal.nativeElement);
    modalInstance.show();
  }
}
