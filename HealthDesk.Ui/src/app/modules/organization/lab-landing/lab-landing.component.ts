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
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-lab-landing',
  templateUrl: './lab-landing.component.html',
  styleUrls: ['./lab-landing.component.scss']
})
export class LabLandingComponent implements OnInit {
  @ViewChild('testModal') testModal!: ElementRef;
  @ViewChild('importModal') importModal!: ElementRef;

  tests: any[] = [];
  filteredTests: any[] = [];
  testSearchText: string = '';
  testForm!: FormGroup;
  isEditTest: boolean = false;
  selectedTest: any;
  userData: any;
  sortDirection: { [key: string]: 'asc' | 'desc' } = {};
  importErrors: { row: number; errors: string[] }[] = [];
  importedTests: any[] = []
  fileName = '';
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

    this.organizationService.saveLabTest(this.userData.id, [this.testForm.value]).subscribe({
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

  openImportDialog(): void {
    this.importErrors = [];
    this.importedTests = [];
    this.fileName = '';
    const modal = new bootstrap.Modal(this.importModal.nativeElement);
    modal.show();
  }

  // --- when user picks file ---
  onFileSelected(evt: Event) {
    const input = evt.target as HTMLInputElement;
    if (!input.files?.length) return;
    const file = input.files[0];
    this.fileName = file.name;

    const reader = new FileReader();
    reader.onload = () => {
      const wb = XLSX.read(reader.result as ArrayBuffer, { type: 'array' });
      const ws = wb.Sheets[wb.SheetNames[0]];
      const raw: any[][] = XLSX.utils.sheet_to_json(ws, { header: 1, defval: '' });

      this.processRawRows(raw);
    };
    reader.readAsArrayBuffer(file);
  }

  // --- validate headers + rows ---
  private processRawRows(raw: any[][]) {
    this.importErrors = [];
    this.importedTests = [];

    if (!raw.length) {
      this.importErrors.push({ row: 0, errors: ['Excel is empty'] });
      return;
    }

    const header = raw[0].map(h => (h||'').toString().trim());
    const expected = ['Laboratory Test Name','Specimen Requirement','Precaution','Reporting Time','Amount','Comment'];
    if (header.length < expected.length ||
        expected.some((col, i) => col !== header[i])) {
      this.importErrors.push({
        row: 0,
        errors: [`Header must be exactly: ${expected.join(', ')}`]
      });
      return;
    }

    raw.slice(1).forEach((row, idx) => {
      const rowNum = idx + 2; // 1-based
      const dto: any = {
        name: row[0],
        specimenRequirement: row[1],
        precaution: row[2],
        reportingTime: row[3],
        amount: Number(row[4]),
        comment: row[5]
      };

      const errs: string[] = [];
      if (!dto.name) errs.push('name is required');
      if (!dto.specimenRequirement) errs.push('specimenRequirement is required');
      if (!dto.precaution) errs.push('precaution is required');
      if (!dto.reportingTime) errs.push('reportingTime is required');
      if (isNaN(dto.amount) || dto.amount < 0) errs.push('amount must be a non-negative number');

      if (errs.length) {
        this.importErrors.push({ row: rowNum, errors: errs });
      } else {
        this.importedTests.push(dto);
      }
    });
  }

  // --- submit if no errors ---
  submitImport(): void {
    if (this.importErrors.length) return;
    if (!this.userData?.id) return;

    this.organizationService
      .saveLabTest(this.userData.id, this.importedTests)
      .subscribe({
        next: () => {
          this.loadData();
          bootstrap.Modal.getInstance(this.importModal.nativeElement)!.hide();
        },
        error: err => {
          console.error('Error importing lab tests:', err);
        }
      });
  }
}
