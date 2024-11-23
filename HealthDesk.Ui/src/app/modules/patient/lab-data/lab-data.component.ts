import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Modal } from 'bootstrap';

interface LabData {
  laboratoryName: string;
  date: Date;
  time: string;
  labTest: string;
  value: string;
  unit: string;
}

@Component({
  selector: 'app-lab-data',
  templateUrl: './lab-data.component.html',
  styleUrls: ['./lab-data.component.scss']
})
export class LabDataComponent implements OnInit {
  labDataRecords: LabData[] = [];
  labDataForm!: FormGroup;
  isEditMode: boolean = false;
  selectedLabData!: LabData;
  editIndex: number | null = null;

  @ViewChild('labDataModal') labDataModal!: ElementRef;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.labDataForm = this.fb.group({
      laboratoryName: [''],
      date: [''],
      time: [''],
      labTest: [''],
      value: [''],
      unit: ['']
    });

    this.loadDummyData();
  }

  loadDummyData(): void {
    this.labDataRecords = [
      {
        laboratoryName: 'Thyrocare',
        date: new Date('2024-08-01'),
        time: '10:30 AM',
        labTest: 'Thyroid Function Test',
        value: '4.5',
        unit: 'mIU/L'
      },
      {
        laboratoryName: 'SRL Diagnostics',
        date: new Date('2024-07-20'),
        time: '08:15 AM',
        labTest: 'Complete Blood Count',
        value: '13.5',
        unit: 'g/dL'
      },
      {
        laboratoryName: 'Metropolis Healthcare',
        date: new Date('2024-07-15'),
        time: '09:00 AM',
        labTest: 'Lipid Profile',
        value: '190',
        unit: 'mg/dL'
      },
      {
        laboratoryName: 'Dr. Lal Path Labs',
        date: new Date('2024-07-10'),
        time: '11:45 AM',
        labTest: 'Liver Function Test',
        value: '45',
        unit: 'IU/L'
      },
      {
        laboratoryName: 'Suburban Diagnostics',
        date: new Date('2024-06-25'),
        time: '07:30 AM',
        labTest: 'Blood Sugar Fasting',
        value: '95',
        unit: 'mg/dL'
      }
    ];
  }

  addLabData(): void {
    this.labDataForm.reset();
    this.isEditMode = false;
    this.editIndex = null;
    const modal = new Modal(this.labDataModal.nativeElement);
    modal.show();
  }

  saveLabData(): void {
    const formData = this.labDataForm.value;

    if (this.isEditMode && this.editIndex !== null) {
      // Update existing lab data
      this.labDataRecords[this.editIndex] = formData;
    } else {
      // Add new lab data
      this.labDataRecords.push(formData);
    }

    const modal = Modal.getInstance(this.labDataModal.nativeElement);
    if (modal) {
      modal.hide();
    }
  }

  editLabData(labData: LabData): void {
    this.isEditMode = true;
    this.editIndex = this.labDataRecords.indexOf(labData);
    this.labDataForm.patchValue(labData);
    const modal = new Modal(this.labDataModal.nativeElement);
    modal.show();
  }

  deleteLabData(labData: LabData): void {
    const index = this.labDataRecords.indexOf(labData);
    if (index > -1) {
      this.labDataRecords.splice(index, 1);
    }
  }

  sortTable(column: keyof LabData): void {
    this.labDataRecords.sort((a, b) => {
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
