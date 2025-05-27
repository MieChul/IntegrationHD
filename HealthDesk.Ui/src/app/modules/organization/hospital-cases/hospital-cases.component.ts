import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from '../../../shared/services/database.service';
import { AccountService } from '../../services/account.service';
import { FormControl } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { OrganizationService } from '../../services/organization.service';

@Component({
  selector: 'app-hospital-cases',
  templateUrl: './hospital-cases.component.html',
  styleUrls: ['./hospital-cases.component.scss']
})
export class HospitalCasesComponent implements OnInit {

  userData: any;
  searchValue: string = '';
  newPreference: string = '';
  preferences: string[] = [];
  activeSubTab: string = 'home';
  specialities: any[] = [];
  specialityFilterCtrl = new FormControl();
  filteredSpecialities!: Observable<string[]>;
  preferenceControl = new FormControl<string[]>([])

  latestHospitalCases: any = [];
  trendingHospitalCases: any = [];
  recommendedHospitalCases: any = [];
  yourHospitalCases: any = [];
  othersHospitalCases: any = [];

  shareLink: string = '';

  constructor(private router: Router, private databaseService: DatabaseService, private accountService: AccountService, private organizationService: OrganizationService) { }

  ngOnInit(): void {
    this.accountService.getUserData().subscribe({
      next: async (data) => {
        this.userData = data;
        await this.loadCases();

        this.specialities = await this.databaseService.getSpecialities();
        this.filteredSpecialities = this.specialityFilterCtrl.valueChanges.pipe(
          startWith(''),
          map((search) => this.filterOptions(search, this.specialities))
        );
        this.filterHospitalCases();
      },
      error: (err) => console.error('Error fetching user data:', err)
    });

  }

  loadCases(): void {
    if (!this.userData?.id) {
      console.error('User ID is missing');
      return;
    }

    this.organizationService.getCases(this.userData.id).subscribe({
      next: (data: any) => {

      },
      error: (error) => {
        console.error('Error loading history:', error);
      }
    });
  }

  filterOptions(search: string, options: string[]): string[] {
    const filterValue = search.toLowerCase();
    return options.filter(option => option.toLowerCase().includes(filterValue));
  }

  filterHospitalCases() { }

  searchHospitalCases(): void {

  }

  setActiveSubTab(tab: string): void {
    this.activeSubTab = tab;
  }

  viewCase(caseId: number): void {
    this.router.navigate(['organization/hospital/view-case', caseId]);
  }

  likeCase(caseId: number): void {
    const updateLike = (cases: any) => {
      const foundCase = cases.find((c: any) => c.id === caseId);
      if (foundCase) {
        foundCase.likeCount++;
      }
    };

    updateLike(this.latestHospitalCases);
    updateLike(this.trendingHospitalCases);
    updateLike(this.recommendedHospitalCases);
    updateLike(this.yourHospitalCases);
  }

  viewComments(caseId: number): void {
  }

  shareCase(caseId: number): void {
    this.shareLink = `https://HealthDesk.com/organization/hospital/view-case/${caseId}`;
    // Add your share logic here (e.g. copy to clipboard, open modal, etc.)
    console.log('Share link:', this.shareLink);
  }

  createNewCase(): void {
    this.router.navigate(['organization/hospital/new-case']);
  }

  addPreference(): void {
    if (this.newPreference.trim()) {
      this.preferences.push(this.newPreference.trim());
      this.newPreference = '';
    }
  }
}
