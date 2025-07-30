import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as bootstrap from 'bootstrap';
import { FilteringService } from '../../../shared/services/filter.service';
import { PatientService } from '../../services/patient.service';
import { AccountService } from '../../services/account.service';
import { DatabaseService } from '../../../shared/services/database.service';
import { SortingService } from '../../../shared/services/sorting.service';
import { map, Observable, startWith } from 'rxjs';


@Component({
  selector: 'app-investigation-reports',
  templateUrl: './investigation-reports.component.html',
  styleUrls: ['./investigation-reports.component.scss']
})
export class InvestigationReportsComponent implements OnInit {
  investigationReports: any = [];
  filteredInvestigationReports: any = [];
  reportForm!: FormGroup;
  isEditMode: boolean = false;
  selectedReport!: any;
  selectedFile!: File | null;
  submitted: boolean = false;
  filterForm!: FormGroup;
  sortDirection: { [key: string]: 'asc' | 'desc' } = {};
  userData: any;
  assessments: string[] = [];

  assessmentFilterCtrl = new FormControl();
  filteredAssessments!: Observable<string[]>;
  filteredAssessmentsData: any = [];

  @ViewChild('reportModal') reportModal!: ElementRef;

  constructor(
    private fb: FormBuilder,
    private sortingService: SortingService,
    private filteringService: FilteringService,
    private patientService: PatientService,
    private accountService: AccountService,
    private databaseService: DatabaseService
  ) { }

  ngOnInit(): void {
    this.initializeForms();

    this.accountService.getUserData().subscribe({
      next: async (data) => {
        this.userData = data;
        this.assessments = await this.databaseService.getAssessments();

        // Load symptoms
        await this.loadRecords();
        await this.initializeSearch();

      },
      error: (err) => console.error('Error fetching user data:', err)
    });
  }

  initializeForms(): void {
    this.reportForm = this.fb.group({
      id: this.fb.control(''),
      date: this.fb.control('', [
        Validators.required,
        this.futureDateValidator
      ]),
      time: this.fb.control('', Validators.required),
      type: this.fb.control('', Validators.required),
      assessment: this.fb.control('', Validators.required),
      comment: [''],
      price: this.fb.control('', [
        Validators.required,
        Validators.pattern(/^\d{1,9}(\.\d{1,2})?$/)
      ])
    });

    this.filterForm = this.fb.group(
      {
        f_startDate: this.fb.control(null),
        f_endDate: this.fb.control(null)
      }
    );

    this.filterForm.valueChanges.subscribe(() => this.applyDateFilter());
  }

  loadRecords(): void {
    if (!this.userData?.id) {
      console.error('User ID is missing');
      return;
    }

    this.patientService.getReports(this.userData.id).subscribe({
      next: (data: any) => {
        this.investigationReports = data?.data.map((investigationData: any) => ({
          ...investigationData
        })).sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());;
        this.filteredInvestigationReports = [...this.investigationReports];
      },
      error: (error) => {
        console.error('Error loading symptom:', error);
      }
    });
  }


  initializeSearch(): void {
    this.filteredAssessments = this.assessmentFilterCtrl.valueChanges.pipe(
      startWith(''),
      map((search) => this.filterOptions(search, this.assessments))
    );

  }

  filterOptions(search: string, options: string[]): string[] {
    const filterValue = search.toLowerCase();
    return options.filter(option => option.toLowerCase().includes(filterValue));
  }


  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      this.selectedFile = file;
    } else {
      this.selectedFile = null;
      alert('Please select a valid PDF file.');
    }
  }

  openReportModal(isEditMode: boolean, record: any = null): void {
    this.isEditMode = isEditMode;

    if (isEditMode && record) {
      this.selectedReport = record;
      this.reportForm.patchValue(record);
    } else {
      this.selectedReport = null;
      this.reportForm.reset();
    }

    const modal = new bootstrap.Modal(this.reportModal.nativeElement);
    modal.show();
  }



  saveReport(): void {
    this.submitted = true;
    if (this.reportForm.invalid || !this.userData?.id) return;

    const dto = { ...this.reportForm.value };

    // Convert date to ISO format
    if (dto.date instanceof Date) {
      dto.date = dto.date.toISOString().split('T')[0];
    }

    const patientId = this.userData.id;
    const formData = new FormData();
    Object.keys(dto).forEach(key => formData.append(key, dto[key] ?? ''));

    if (this.selectedFile) {
      formData.append('file', this.selectedFile, this.selectedFile.name);
    }

    this.patientService.saveReportFormData(patientId, formData).subscribe({
      next: () => this.loadRecords(),
      error: err => console.error(err)
    });

    bootstrap.Modal.getInstance(this.reportModal.nativeElement)?.hide();
  }


  viewReport(report: any): void {
    if (!report.filePath) return;
    window.open(`/${report.filePath}`, '_blank');
  }

  deleteReport(report: any): void {
    if (!this.userData.id || !report.id) return;

    this.patientService.deleteReport(this.userData.id, report.id).subscribe({
      next: (response) => {
        console.log(response.message); // Success message from API
        this.loadRecords(); // Reload the list after successful deletion
      },
      error: (error) => {
        console.error('Error deleting symptom:', error); // Handle errors
      }
    });
  }

  applyDateFilter(): void {
    const { f_startDate, f_endDate } = this.filterForm.value;

    // Apply the date filter using the filtering service
    this.filteredInvestigationReports = this.filteringService.filter(
      this.investigationReports,
      {},
      [
        {
          field: 'date',
          range: [f_startDate || null, f_endDate || null]
        }
      ]
    );
  }

  sortTable(column: string): void {
    this.sortDirection[column] = this.sortDirection[column] === 'asc' ? 'desc' : 'asc';
    this.filteredInvestigationReports = this.sortingService.sort(this.filteredInvestigationReports, column, this.sortDirection[column]);
  }

  futureDateValidator(control: any): { [key: string]: boolean } | null {
    const currentDate = new Date();
    if (new Date(control.value) > currentDate) {
      return { futureDate: true };
    }
    return null;
  }
}
