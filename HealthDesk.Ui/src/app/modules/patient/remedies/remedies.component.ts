import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Modal, Tooltip } from 'bootstrap';
import { AccountService } from '../../services/account.service';
import { PatientService } from '../../services/patient.service';
import { FormControl } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { DatabaseService } from '../../../shared/services/database.service';

@Component({
  selector: 'app-remedies',
  templateUrl: './remedies.component.html',
  styleUrls: ['./remedies.component.scss']
})
export class RemediesComponent implements OnInit, AfterViewInit {

  ngAfterViewInit(): void {
    const tooltipTriggerList = Array.from(
      document.querySelectorAll('[data-bs-toggle="tooltip"]')
    );
    tooltipTriggerList.forEach((tooltipTriggerEl) => {
      new Tooltip(tooltipTriggerEl);
    });
  }

  @ViewChild('shareModal') shareModal!: ElementRef;
  @ViewChild('commentModal') commentModal!: ElementRef;

  shareLink: string = '';
  searchValue: string[] = [];
  newPreference: string = '';
  preferences: string[] = [];
  selectedPreferences: string[] = [];
  activeSubTab: string = 'home';
  recommendedRemedies: any = [];
  latestRemedies: any = [];
  trendingRemedies: any = [];
  otherRemedies: any = [];
  yourRemedies: any = [];
  userData: any;
  prefItemsFilterCtrl = new FormControl();
  filteredPrefs!: Observable<string[]>;
  remedy: any;
  existingComment: any;
  newCommentText: any;
  isEditing: any;


  constructor(private router: Router, private modalService: NgbModal, private accountService: AccountService, private patientService: PatientService, private databaseService: DatabaseService) { }

  ngOnInit(): void {
    this.accountService.getUserData().subscribe({
      next: async (data) => {
        this.userData = data;
        this.preferences = await this.databaseService.getSymptoms();
        await this.loadRemedies();
        await this.loadInfo();
        await this.initializeSearch();
        this.filterRemedies();
      },
      error: (err) => console.error('Error fetching user data:', err)
    });
  }

  loadRemedies(): void {
    if (!this.userData?.id) {
      return;
    }

    this.patientService.getRemedies(this.userData.id).subscribe({
      next: (remedies: any) => {
        this.otherRemedies = remedies.data.others;
        this.yourRemedies = remedies.data.yours;
        this.filterRemedies();
      },
      error: (error) => {
        console.error('Error loading history:', error);
      }
    });
  }

  loadInfo() {
    this.patientService.getPatientInfo(this.userData.id).subscribe({
      next: info => {
        this.selectedPreferences = info.data.preferences || [];
        this.filterRemedies();
      }
    });
  }

  onPreferencesChange(newPrefs: string[]) {
    this.selectedPreferences = newPrefs;
  }

  initializeSearch(): void {
    this.filteredPrefs = this.prefItemsFilterCtrl.valueChanges.pipe(
      startWith(''),
      map((search) => this.filterOptions(search, this.preferences))
    );
  }

  savePreferences() {
    this.patientService.updatePreferences(this.userData.id, this.selectedPreferences).subscribe({
      next: (res: any) => {
        this.loadInfo();
      },
      error: (error) => {
        console.error('Error Saving data:', error);
      }
    });
  }

  filterOptions(search: string, options: string[]): string[] {
    const filterValue = search.toLowerCase();
    return options.filter(option => option.toLowerCase().includes(filterValue));
  }

  createNewCase(): void {
    this.router.navigate(['/patient/new-remedy']);
  }

  setActiveSubTab(tab: string): void {
    this.activeSubTab = tab;
    this.filterRemedies();
  }


  toggleLike(remedyUser: string, remedyId: string,): void {
    this.patientService.toggleLike(remedyUser, remedyId, this.userData.id).subscribe({
      next: (com: any) => {
        this.loadRemedies();
      },
      error: (error) => {
        console.error('Error Saving data:', error);
      }
    });
  }

  shareCase(caseId: string): void {
    this.shareLink = `https://HealthDesk.com/physician/view-remedy/${caseId}`;
    const modalInstance = new Modal(this.shareModal.nativeElement);
    modalInstance.show();
  }

  filterRemedies(): void {
    const limit = this.getDisplayLimit();

    const searchVals = (Array.isArray(this.searchValue) ? this.searchValue : [])
      .map(val => val.trim().toLowerCase())
      .filter(val => val);

    const matchesSearch = (remedy: any): boolean => {
      return Array.isArray(remedy.remedyFor) &&
        remedy.remedyFor.some((rf: string) =>
          searchVals.some(search => rf.toLowerCase().includes(search))
        );
    };

    const filteredRemedies = searchVals.length
      ? this.otherRemedies.filter(matchesSearch)
      : [...this.otherRemedies];

    this.latestRemedies = filteredRemedies
      .sort((a: any, b: any) => new Date(b.createDate).getTime() - new Date(a.createDate).getTime())
      .slice(0, limit);

    this.trendingRemedies = filteredRemedies
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
      this.recommendedRemedies = [];
      return;
    }

    this.recommendedRemedies = this.otherRemedies
      .filter((remedy: any) => {
        const rfArr = Array.isArray(remedy.remedyFor)
          ? remedy.remedyFor
          : [remedy.remedyFor];

        return rfArr.some((rf: any) =>
          prefs.includes((rf || '').toLowerCase().trim())
        );
      })
      .sort((a: any, b: any) =>
        new Date(b.createDate).getTime() - new Date(a.createDate).getTime()
      )
      .slice(0, limit);
  }

  private getDisplayLimit(): number {
    return ['latest', 'trending', 'mychoice'].includes(this.activeSubTab) ? 30 : 5;
  }

  viewCase(caseId: string): void {
    this.router.navigate(['/patient/view-remedy', caseId]);
  }

  hasLiked(remedy: any): boolean {
    return remedy?.likedBy?.includes(this.userData.id);
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
      itemType: "Home_Remedy"
    };

    this.patientService.saveComment(this.remedy.userId, this.remedy.id, comment).subscribe({
      next: (com: any) => {
        this.loadRemedies();
        this.newCommentText = '';
        this.isEditing = false;
      },
      error: (error) => {
        console.error('Error Saving data:', error);
      }
    });
  }

  viewComments(selectedRemedy: any) {
    if (!selectedRemedy) return;

    this.remedy = selectedRemedy;
    this.existingComment = selectedRemedy.comments?.find(
      (c: any) => c.userId === this.userData.id
    );
    this.newCommentText = this.existingComment?.text || '';
    this.isEditing = false;

    const modalInstance = new Modal(this.commentModal.nativeElement);
    modalInstance.show();
  }
}
