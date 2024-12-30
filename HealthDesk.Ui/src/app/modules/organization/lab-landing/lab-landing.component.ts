import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Modal } from 'bootstrap';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { Router } from '@angular/router';
import { AccountService } from '../../services/account.service';

interface LaboratoryTest {
  name: string;
  specimenRequirement: string;
  precaution: string;
  reportingTime: string;
  amount: number;
  comment: string;
}

@Component({
  selector: 'app-lab-landing',
  templateUrl: './lab-landing.component.html',
  styleUrls: ['./lab-landing.component.scss']
})
export class LabLandingComponent implements OnInit, AfterViewInit {
  @ViewChild('testModal') testModal!: any;

  // Data arrays
  tests: LaboratoryTest[] = [];

  // Filtered array for display
  filteredTests: LaboratoryTest[] = [];

  // Search text
  testSearchText: string = '';

  // Form
  testForm!: FormGroup;

  // Modal reference
  testModalRef!: NgbModalRef;

  // Flags
  isEditTest: boolean = false;
  userData:any;
  constructor(private router: Router, private fb: FormBuilder, private modalService: NgbModal, private accountService: AccountService) {}

  ngOnInit(): void {
    this.accountService.getUserData().subscribe({
      next: (data) => {
        this.userData = data;
        if (this.userData.status == 'Approved') {
          this.initForm();
          this.loadDummyData();
        }
        else
          this.router.navigate(['/account']);
      }
    });
  }

  ngAfterViewInit(): void {
    this.filterTests();
  }

  initForm(): void {
    this.testForm = this.fb.group({
      name: [''],
      specimenRequirement: [''],
      precaution: [''],
      reportingTime: [''],
      amount: [''],
      comment: ['']
    });
  }

  loadDummyData(): void {
    // Dummy data for laboratory tests
    this.tests = [
      {
        name: 'Complete Blood Count',
        specimenRequirement: 'Blood sample (EDTA tube)',
        precaution: 'Fasting not required',
        reportingTime: '4 hours',
        amount: 300,
        comment: 'Routine blood test'
      },
      {
        name: 'Fasting Blood Sugar',
        specimenRequirement: 'Blood sample (Fluoride tube)',
        precaution: '8-12 hours fasting',
        reportingTime: '2 hours',
        amount: 200,
        comment: 'Diabetes screening'
      },
      {
        name: 'Lipid Profile',
        specimenRequirement: 'Blood sample (Serum separator tube)',
        precaution: '12 hours fasting',
        reportingTime: '6 hours',
        amount: 800,
        comment: 'Cholesterol levels'
      },
      {
        name: 'Urine Routine Examination',
        specimenRequirement: 'Midstream urine sample',
        precaution: 'Clean catch sample',
        reportingTime: '3 hours',
        amount: 150,
        comment: 'Urinary tract infection screening'
      },
      {
        name: 'Thyroid Function Test',
        specimenRequirement: 'Blood sample (Serum separator tube)',
        precaution: 'No special preparation',
        reportingTime: '8 hours',
        amount: 600,
        comment: 'Thyroid hormone levels'
      },
      {
        name: 'Liver Function Test',
        specimenRequirement: 'Blood sample (Serum separator tube)',
        precaution: 'No alcohol 24 hours prior',
        reportingTime: '5 hours',
        amount: 700,
        comment: 'Assess liver health'
      }
    ];

    this.filterTests();
  }

  // Laboratory Test Methods

  openTestDialog(test?: LaboratoryTest): void {
    this.isEditTest = !!test;
    this.testForm.reset();

    if (test) {
      this.testForm.patchValue(test);
    }

    const modal = new Modal(this.testModal.nativeElement);
    modal.show();
  }

  closeTestDialog(): void {
    const modal = Modal.getInstance(this.testModal.nativeElement);
    if (modal) {
      modal.hide();
    }
  }

  saveTest(): void {
    const formValues = this.testForm.value;

    const test: LaboratoryTest = {
      name: formValues.name,
      specimenRequirement: formValues.specimenRequirement,
      precaution: formValues.precaution,
      reportingTime: formValues.reportingTime,
      amount: formValues.amount,
      comment: formValues.comment
    };

    if (this.isEditTest) {
      const index = this.tests.findIndex(t => t.name === test.name);
      if (index !== -1) {
        this.tests[index] = test;
      }
    } else {
      this.tests.push(test);
    }

    this.filterTests();
    this.closeTestDialog();
  }

  deleteTest(test: LaboratoryTest): void {
    if (confirm('Are you sure you want to delete this laboratory test?')) {
      this.tests = this.tests.filter(t => t !== test);
      this.filterTests();
    }
  }

  filterTests(): void {
    if (this.testSearchText) {
      this.filteredTests = this.tests.filter(t =>
        t.name.toLowerCase().includes(this.testSearchText.toLowerCase())
      );
    } else {
      this.filteredTests = [...this.tests];
    }
  }

  sortTestTable(column: keyof LaboratoryTest): void {
    this.filteredTests.sort((a, b) => (a[column] > b[column] ? 1 : -1));
  }

  exportToExcel(): void {
    // Define the headers matching the HTML table
    const headers = [
      'Laboratory Test Name',
      'Specimen Requirement',
      'Precaution',
      'Reporting Time',
      'Amount',
      'Comment'
    ];
  
    // Map the data to include headers
    const dataToExport = this.filteredTests.map(test => ({
      'Laboratory Test Name': test.name,
      'Specimen Requirement': test.specimenRequirement,
      'Precaution': test.precaution,
      'Reporting Time': test.reportingTime,
      'Amount': test.amount,
      'Comment': test.comment
    }));
  
    // Add headers as the first row
    const worksheet = XLSX.utils.json_to_sheet(dataToExport, { header: headers });
  
    // Create a new workbook and append the worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Laboratory Tests');
  
    // Write workbook to an Excel file
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  
    // Save the file
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, `Laboratory_Tests_${new Date().toISOString()}.xlsx`);
  }
}
