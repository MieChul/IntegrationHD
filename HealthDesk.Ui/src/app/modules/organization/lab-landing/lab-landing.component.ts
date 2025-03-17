import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as bootstrap from 'bootstrap';
import { FilteringService } from '../../../shared/services/filter.service';
import { PatientService } from '../../services/patient.service';
import { AccountService } from '../../services/account.service';
import { DatabaseService } from '../../../shared/services/database.service';
import { SortingService } from '../../../shared/services/sorting.service';
import { map, Observable, startWith } from 'rxjs';
import { OrganizationService } from '../../services/organization.service';

@Component({
  selector: 'app-lab-landing',
  templateUrl: './lab-landing.component.html',
  styleUrls: ['./lab-landing.component.scss']
})
export class LabLandingComponent implements OnInit {
  @ViewChild('testModal') testModal!: ElementRef;
  tests: any[] = [];
  filteredTests: any[] = [];
  testSearchText: string = '';
  testForm!: FormGroup;
  isEditTest: boolean = false;
  selectedTest: any;
  userData: any;
  sortDirection: { [key: string]: 'asc' | 'desc' } = {};
  constructor(
    private fb: FormBuilder,
    private sortingService: SortingService,
    private filteringService: FilteringService,
    private organizationService: OrganizationService,
    private accountService: AccountService,
    private databaseService: DatabaseService
  ) { }

  ngOnInit(): void {
    this.initializeForms();

    this.accountService.getUserData().subscribe({
      next: async (data) => {
        this.userData = data;
        await this.loadData();
      },
      error: (err) => console.error('Error fetching user data:', err)
    });
  }

  initializeForms(): void {
    this.testForm = this.fb.group({
      id:[],
      name: ['', Validators.required],
      specimenRequirement: ['', Validators.required],
      precaution: ['', Validators.required],
      reportingTime: ['', Validators.required],
      amount: ['', Validators.required],
      comment: ['']
    });
  }

  loadData(): void {
    if (!this.userData?.id) {
      console.error('User ID is missing');
      return;
    }

    this.organizationService.getAllLabTests(this.userData.id).subscribe({
      next: (data: any) => {
        this.tests = data?.data.map((test: any) => ({
          ...test
        }));
        this.filteredTests = [...this.tests];
      },
      error: (error) => {
        console.error('Error loading history:', error);
      }
    });
  }


  openTestDialog(isEditMode: boolean, test: any = null): void {
    this.isEditTest = isEditMode;


    if (isEditMode && test) {
      this.selectedTest = test;
      this.testForm.patchValue(test);
    }
    else {
      this.selectedTest = null;
      this.testForm.reset();
    }

    const modal = new bootstrap.Modal(this.testModal.nativeElement);
    modal.show();
  }

  saveTest(): void {
    this.testForm.markAllAsTouched();
    if (this.testForm.invalid || !this.userData.id) return;

    this.organizationService.saveLabTest(this.userData.id, this.testForm.value).subscribe({
      next: (response) => {
        this.loadData();
      },
      error: (error) => {
        console.error('Error updating medical treatments:', error);
      },
    });

  }

  deleteTest(test: any): void {

    if (!this.userData.id || !test.id) return;
    this.organizationService.deleteLabTest(this.userData.id, test.id).subscribe({
      next: (response) => {
        console.log(response.message); // Success message from API
        this.loadData(); // Reload the list after successful deletion
      },
      error: (error) => {
        console.error('Error deleting treatments:', error); // Handle errors
      }
    });
  }

  applyFilters(): void {
    this.filteredTests = this.filteringService.filter(
      this.tests,
      {
        name: this.testSearchText
      },
      []
    );
  }

  sortTable(column: string): void {
    // Toggle the sort direction
    this.sortDirection[column] = this.sortDirection[column] === 'asc' ? 'desc' : 'asc';
    const direction = this.sortDirection[column];

    // Use the sorting service to sort the data
    this.filteredTests = this.sortingService.sort(this.filteredTests, column, direction);
  }
}
