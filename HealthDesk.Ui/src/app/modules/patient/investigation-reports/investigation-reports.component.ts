import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Modal } from 'bootstrap';

interface InvestigationReport {
  date: Date;
  time: string;
  typeOfAssessment: string;
  assessmentParameters: string;
  results: string;
  comment: string;
  reportFileName?: string;
}

@Component({
  selector: 'app-investigation-reports',
  templateUrl: './investigation-reports.component.html',
  styleUrls: ['./investigation-reports.component.scss']
})
export class InvestigationReportsComponent implements OnInit {
  investigationReports: InvestigationReport[] = [];
  reportForm!: FormGroup;
  isEditMode: boolean = false;
  selectedReport!: InvestigationReport;
  editIndex: number | null = null;
  selectedFile!: File | null;
  submitted:boolean = false;
  filterForm!: FormGroup;

  assessmentTypes: string[] = ['Blood Test', 'X-ray', 'MRI', 'CT Scan', 'Ultrasound'];

  @ViewChild('reportModal') reportModal!: ElementRef;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.reportForm = this.fb.group({
      date: [''],
      time: [''],
      typeOfAssessment: [''],
      assessmentParameters: [''],
      results: [''],
      comment: ['']
    });

    this.filterForm = this.fb.group(
      {
        f_startDate: this.fb.control(null),
        f_endDate: this.fb.control(null)
      }
    );

    this.loadDummyData();
  }

  loadDummyData(): void {
  }

  addReport(): void {
    this.reportForm.reset();
    this.isEditMode = false;
    this.editIndex = null;
    this.selectedFile = null;
    const modal = new Modal(this.reportModal.nativeElement);
    modal.show();
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

  saveReport(): void {
    const formData = this.reportForm.value;

    if (this.isEditMode && this.editIndex !== null) {
      // Update existing report
      this.investigationReports[this.editIndex] = formData;
      if (this.selectedFile) {
        formData.reportFileName = `${this.editIndex}_investigation.pdf`;
        this.saveFile(this.selectedFile, formData.reportFileName);
      }
    } else {
      // Add new report
      formData.reportFileName = `${this.investigationReports.length}_investigation.pdf`;
      this.investigationReports.push(formData);
      if (this.selectedFile) {
        this.saveFile(this.selectedFile, formData.reportFileName);
      }
    }

    const modal = Modal.getInstance(this.reportModal.nativeElement);
    if (modal) {
      modal.hide();
    }
  }

  saveFile(file: File, fileName: string): void {
    const filePath = `src/assets/investigations/${fileName}`;
    const reader = new FileReader();
    reader.onload = function() {
      const blob = new Blob([reader.result as ArrayBuffer], { type: 'application/pdf' });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = fileName;
      link.click();
    };
    reader.readAsArrayBuffer(file);
  }

  viewReport(index: number): void {
    const fileName = this.investigationReports[index].reportFileName;
    const filePath = `assets/investigations/${fileName}`;
    window.open(filePath, '_blank');
  }

  sortTable(column: keyof InvestigationReport): void {
    this.investigationReports.sort((a, b) => {
      const aValue = a[column] ?? ''; // Use nullish coalescing to default to an empty string if undefined
      const bValue = b[column] ?? ''; // Same for b

      if (aValue < bValue) {
        return -1;
      } else if (aValue > bValue) {
        return 1;
      } else {
        return 0;
      }
    });
  }
}
