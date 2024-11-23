import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Modal } from 'bootstrap';

interface SelfRecord {
  date: Date;
  type: string;
  description: string;
}

@Component({
  selector: 'app-self-record',
  templateUrl: './self-record.component.html',
  styleUrls: ['./self-record.component.scss']
})
export class SelfRecordComponent implements OnInit {
  selfRecords: SelfRecord[] = [];
  selfRecordForm!: FormGroup;
  isEditMode: boolean = false;
  selectedRecord!: SelfRecord;
  editIndex: number | null = null;

  @ViewChild('selfRecordModal') selfRecordModal!: ElementRef;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.selfRecordForm = this.fb.group({
      date: [''],
      type: [''],
      description: ['']
    });
    this.loadDummyData();
  }

  loadDummyData(): void {
    this.selfRecords = [
      { date: new Date('2024-08-01'), type: 'Blood Pressure', description: '120/80 mmHg' },
      { date: new Date('2024-07-15'), type: 'Weight', description: '70 kg' }
    ];
  }

  addSelfRecord(): void {
    this.selfRecordForm.reset();
    this.isEditMode = false;
    this.editIndex = null;
    const modal = new Modal(this.selfRecordModal.nativeElement);
    modal.show();
  }

  saveSelfRecord(): void {
    const formData = this.selfRecordForm.value;

    if (this.isEditMode && this.editIndex !== null) {
      // Update existing record
      this.selfRecords[this.editIndex] = formData;
    } else {
      // Add new record
      this.selfRecords.push(formData);
    }

    const modal = Modal.getInstance(this.selfRecordModal.nativeElement);
    if (modal) {
      modal.hide();
    }
  }

  editSelfRecord(record: SelfRecord): void {
    this.isEditMode = true;
    this.editIndex = this.selfRecords.indexOf(record);
    this.selfRecordForm.patchValue(record);
    const modal = new Modal(this.selfRecordModal.nativeElement);
    modal.show();
  }

  deleteSelfRecord(record: SelfRecord): void {
    const index = this.selfRecords.indexOf(record);
    if (index > -1) {
      this.selfRecords.splice(index, 1);
    }
  }
}
