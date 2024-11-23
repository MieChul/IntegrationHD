import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Modal } from 'bootstrap';

interface PatientHistory {
  diagnosisDate: Date;
  disease: string;
  drug: string;
  dosageForm: string;
  strength: string;
  frequency: string;
  outcome: string;
}

@Component({
  selector: 'app-patient-history',
  templateUrl: './patient-history.component.html',
  styleUrls: ['./patient-history.component.scss']
})
export class PatientHistoryComponent implements OnInit {
  patientHistories: PatientHistory[] = [];
  historyForm!: FormGroup;
  isEditMode = false;
  selectedHistory!: PatientHistory;
  
  @ViewChild('historyModal') historyModal!: ElementRef;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.historyForm = this.fb.group({
      diagnosisDate: [''],
      disease: [''],
      drug: [''],
      dosageForm: [''],
      strength: [''],
      frequency: [''],
      outcome: ['']
    });

    this.loadDummyData();
  }

  loadDummyData(): void {
    this.patientHistories = [
      { diagnosisDate: new Date('2023-08-01'), disease: 'Diabetes', drug: 'Metformin', dosageForm: 'Tablet', strength: '500mg', frequency: 'Twice a day', outcome: 'Stable' },
      { diagnosisDate: new Date('2022-07-15'), disease: 'Hypertension', drug: 'Amlodipine', dosageForm: 'Tablet', strength: '10mg', frequency: 'Once a day', outcome: 'Improved' }
    ];
  }

  addHistory(): void {
    this.isEditMode = false;
    this.historyForm.reset();
    const modal = new Modal(this.historyModal.nativeElement);
    modal.show();
  }

  editHistory(history: PatientHistory): void {
    this.isEditMode = true;
    this.selectedHistory = history;
    this.historyForm.patchValue(history);
    const modal = new Modal(this.historyModal.nativeElement);
    modal.show();
  }

  deleteHistory(history: PatientHistory): void {
    this.patientHistories = this.patientHistories.filter(h => h !== history);
  }

  saveHistory(): void {
    if (this.isEditMode) {
      Object.assign(this.selectedHistory, this.historyForm.value);
    } else {
      this.patientHistories.push(this.historyForm.value);
    }
    const modal = new Modal(this.historyModal.nativeElement);
    modal.hide();
  }

  sortTable(column: keyof PatientHistory): void {
    this.patientHistories.sort((a, b) => {
      if (a[column] < b[column]) {
        return -1;
      } else if (a[column] > b[column]) {
        return 1;
      } else {
        return 0;
      }
    });
  }
}
