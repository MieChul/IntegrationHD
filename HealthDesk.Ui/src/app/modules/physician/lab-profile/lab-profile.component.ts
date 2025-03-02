import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import * as bootstrap from 'bootstrap';
import { AccountService } from '../../services/account.service';
import { PhysicianService } from '../../services/physician.service';
import { SortingService } from '../../../shared/services/sorting.service';
import { FilteringService } from '../../../shared/services/filter.service';
import { Observable, map, startWith } from 'rxjs';
import { DatabaseService } from '../../../shared/services/database.service';

@Component({
  selector: 'app-lab-profile',
  templateUrl: './lab-profile.component.html',
  styleUrl: './lab-profile.component.scss'
})
export class LabProfileComponent implements OnInit {
  profiles: any[] = [];
  filteredProfiles: any[] = [];
  profileForm!: FormGroup;
  isEditMode: boolean = false;
  userData: any;
  sortDirection: { [key: string]: 'asc' | 'desc' } = {};
  investigations: any[] = [];
  filteredInvestigations!: Observable<string[]>;
  investigationFilterCtrl = new FormControl();
  submitted: boolean = false;
  searchCtrl = new FormControl('');
  filterForm!: FormGroup;

  @ViewChild('profileModal') profileModal!: ElementRef;

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private physicianService: PhysicianService,
    private sortingService: SortingService,
    private filteringService: FilteringService,
    private databaseService: DatabaseService
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.accountService.getUserData().subscribe({
      next: async (data) => {
        this.userData = data;
        this.investigations = await this.databaseService.getInvestigations();
        await this.loadProfiles();
        this.initializeSearch();
      },
      error: (err) => console.error('Error fetching user data:', err)
    });
  }

  initializeForm() {
    this.profileForm = this.fb.group({
      id: this.fb.control(''),
      name: this.fb.control('', [Validators.required, Validators.maxLength(25)]),
      investigations: this.fb.control([], Validators.required)
    });

    this.filterForm = this.fb.group({
      search: this.searchCtrl
    });

    this.searchCtrl.valueChanges.subscribe(() => {
      this.applySearchFilter();
    });
  }



  async loadProfiles(): Promise<void> {
    this.physicianService.getProfiles(this.userData.id).subscribe({
      next: (profile: any) => {
        this.profiles = profile.data.map((profile: any) => ({
          ...profile,
          investigationNames: profile.investigations.map((inv: any) => inv.name).join(', ')
        }));
        this.filteredProfiles = [...this.profiles];
      }
    });
  }

  initializeSearch() {
    this.filteredInvestigations = this.investigationFilterCtrl.valueChanges.pipe(
      startWith(''),
      map((search: string) => this.filterOptions(search, this.investigations))
    );
  }

  filterOptions(search: string, options: string[]): string[] {
    return options.filter(option => option.toLowerCase().includes(search.toLowerCase()));
  }

  addProfile(): void {
    this.profileForm.reset();
    this.isEditMode = false;
    const modal = new bootstrap.Modal(document.getElementById('profileModal')!);
    modal.show();
  }

  saveProfile(): void {
    this.profileForm.markAllAsTouched();
    if (this.profileForm.invalid) return;
    const profileData = this.profileForm.value;
    profileData.investigations = profileData.investigations.map((name: string) => ({ name }));

    this.physicianService.saveProfiles(this.userData.id, profileData).subscribe(() => this.loadProfiles());
    bootstrap.Modal.getInstance(document.getElementById('profileModal')!)?.hide();
  }

  editProfile(profile: any): void {
    this.isEditMode = true;
    this.profileForm.patchValue({
      id: profile.id,
      name: profile.name,
      investigations: profile.investigations.map((inv: any) => inv.name)
    });

    const modal = new bootstrap.Modal(document.getElementById('profileModal')!);
    modal.show();
  }

  deleteProfile(profile: any): void {
    this.physicianService.deleteProfile(this.userData.id, profile.id).subscribe(() => {
      this.loadProfiles();
    });
  }

  sortTable(column: string): void {
    this.sortDirection[column] = this.sortDirection[column] === 'asc' ? 'desc' : 'asc';
    this.filteredProfiles = this.sortingService.sort(this.filteredProfiles, column, this.sortDirection[column]);
  }

  applySearchFilter() {
    const searchValue = this.searchCtrl.value?.toLowerCase() || '';
    this.filteredProfiles = this.filteringService.filter(
      this.profiles,
      { investigationNames: searchValue }
    );
  }
}