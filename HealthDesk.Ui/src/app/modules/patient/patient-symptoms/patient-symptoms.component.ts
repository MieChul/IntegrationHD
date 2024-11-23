import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Modal } from 'bootstrap';

interface PatientSymptom {
  dateOfOnset: Date;
  timeOfOnset: string;
  symptomType: string;
  description: string;
  severity: string;
  comment: string;
}

@Component({
  selector: 'app-patient-symptoms',
  templateUrl: './patient-symptoms.component.html',
  styleUrls: ['./patient-symptoms.component.scss']
})
export class PatientSymptomsComponent implements OnInit {
  symptomsRecords: PatientSymptom[] = [];
  symptomForm!: FormGroup;
  isEditMode: boolean = false;
  selectedSymptom!: PatientSymptom;
  editIndex: number | null = null;

  symptomTypes: string[] = ['Fever', 'Cough', 'Fatigue', 'Shortness of Breath', 'Headache'];
  severityLevels: string[] = ['Mild', 'Moderate', 'Severe'];

  @ViewChild('symptomModal') symptomModal!: ElementRef;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.symptomForm = this.fb.group({
      dateOfOnset: [''],
      timeOfOnset: [''],
      symptomType: [''],
      description: [''],
      severity: [''],
      comment: ['']
    });

    this.loadDummyData();
  }

  loadDummyData(): void {
    this.symptomsRecords = [
      {
        dateOfOnset: new Date('2024-08-01'),
        timeOfOnset: '08:00 AM',
        symptomType: 'Fever',
        description: 'High temperature, chills',
        severity: 'Moderate',
        comment: 'Started suddenly after travel'
      },
      {
        dateOfOnset: new Date('2024-07-20'),
        timeOfOnset: '10:30 AM',
        symptomType: 'Cough',
        description: 'Persistent dry cough',
        severity: 'Mild',
        comment: 'No other associated symptoms'
      },
      {
        dateOfOnset: new Date('2024-07-15'),
        timeOfOnset: '02:00 PM',
        symptomType: 'Fatigue',
        description: 'Feeling of exhaustion',
        severity: 'Severe',
        comment: 'Worsening over the last few days'
      },
      {
        dateOfOnset: new Date('2024-07-10'),
        timeOfOnset: '09:00 AM',
        symptomType: 'Shortness of Breath',
        description: 'Difficulty breathing, especially at night',
        severity: 'Severe',
        comment: 'Associated with chest pain'
      },
      {
        dateOfOnset: new Date('2024-07-05'),
        timeOfOnset: '11:00 AM',
        symptomType: 'Headache',
        description: 'Throbbing pain in the temples',
        severity: 'Moderate',
        comment: 'Occurs in the afternoon and evening'
      }
    ];
  }

  addSymptom(): void {
    this.symptomForm.reset();
    this.isEditMode = false;
    this.editIndex = null;
    const modal = new Modal(this.symptomModal.nativeElement);
    modal.show();
  }

  saveSymptom(): void {
    const formData = this.symptomForm.value;

    if (this.isEditMode && this.editIndex !== null) {
      // Update existing symptom
      this.symptomsRecords[this.editIndex] = formData;
    } else {
      // Add new symptom
      this.symptomsRecords.push(formData);
    }

    const modal = Modal.getInstance(this.symptomModal.nativeElement);
    if (modal) {
      modal.hide();
    }
  }

  editSymptom(symptom: PatientSymptom): void {
    this.isEditMode = true;
    this.editIndex = this.symptomsRecords.indexOf(symptom);
    this.symptomForm.patchValue(symptom);
    const modal = new Modal(this.symptomModal.nativeElement);
    modal.show();
  }

  deleteSymptom(symptom: PatientSymptom): void {
    const index = this.symptomsRecords.indexOf(symptom);
    if (index > -1) {
      this.symptomsRecords.splice(index, 1);
    }
  }

  sortTable(column: keyof PatientSymptom): void {
    this.symptomsRecords.sort((a, b) => {
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
