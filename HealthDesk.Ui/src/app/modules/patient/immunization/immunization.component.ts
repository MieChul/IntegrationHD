import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Modal } from 'bootstrap';

interface Immunization {
  dateOfAdministration: Date;
  vaccineName: string;
  preventableDisease: string;
  routeOfAdministration: string;
  dosageForm: string;
  dosageDetails: string;
}

@Component({
  selector: 'app-immunization',
  templateUrl: './immunization.component.html',
  styleUrls: ['./immunization.component.scss']
})
export class ImmunizationComponent implements OnInit {
  immunizationRecords: Immunization[] = [];
  immunizationForm!: FormGroup;
  isEditMode: boolean = false;
  selectedImmunization!: Immunization;
  editIndex: number | null = null;

  vaccines: string[] = ['COVID-19 Vaccine', 'Hepatitis B Vaccine', 'Influenza Vaccine', 'Polio Vaccine', 'Tetanus Vaccine'];
  preventableDiseases: string[] = ['COVID-19', 'Hepatitis B', 'Influenza', 'Polio', 'Tetanus'];
  routesOfAdministration: string[] = ['Intramuscular', 'Subcutaneous', 'Oral', 'Intranasal'];
  dosageDetails: string[] = ['Single Dose', 'Two Doses', 'Booster', 'Three Doses'];

  @ViewChild('immunizationModal') immunizationModal!: ElementRef;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.immunizationForm = this.fb.group({
      dateOfAdministration: [''],
      vaccineName: [''],
      preventableDisease: [''],
      routeOfAdministration: [''],
      dosageForm: [''],
      dosageDetails: ['']
    });

    this.loadDummyData();
  }

  loadDummyData(): void {
    this.immunizationRecords = [
      {
        dateOfAdministration: new Date('2024-08-01'),
        vaccineName: 'COVID-19 Vaccine',
        preventableDisease: 'COVID-19',
        routeOfAdministration: 'Intramuscular',
        dosageForm: 'Injection',
        dosageDetails: 'Two Doses'
      },
      {
        dateOfAdministration: new Date('2024-07-15'),
        vaccineName: 'Hepatitis B Vaccine',
        preventableDisease: 'Hepatitis B',
        routeOfAdministration: 'Intramuscular',
        dosageForm: 'Injection',
        dosageDetails: 'Three Doses'
      },
      {
        dateOfAdministration: new Date('2024-07-10'),
        vaccineName: 'Influenza Vaccine',
        preventableDisease: 'Influenza',
        routeOfAdministration: 'Intranasal',
        dosageForm: 'Spray',
        dosageDetails: 'Single Dose'
      },
      {
        dateOfAdministration: new Date('2024-06-20'),
        vaccineName: 'Polio Vaccine',
        preventableDisease: 'Polio',
        routeOfAdministration: 'Oral',
        dosageForm: 'Drops',
        dosageDetails: 'Booster'
      },
      {
        dateOfAdministration: new Date('2024-06-05'),
        vaccineName: 'Tetanus Vaccine',
        preventableDisease: 'Tetanus',
        routeOfAdministration: 'Intramuscular',
        dosageForm: 'Injection',
        dosageDetails: 'Single Dose'
      }
    ];
  }

  addImmunization(): void {
    this.immunizationForm.reset();
    this.isEditMode = false;
    this.editIndex = null;
    const modal = new Modal(this.immunizationModal.nativeElement);
    modal.show();
  }

  saveImmunization(): void {
    const formData = this.immunizationForm.value;

    if (this.isEditMode && this.editIndex !== null) {
      // Update existing immunization
      this.immunizationRecords[this.editIndex] = formData;
    } else {
      // Add new immunization
      this.immunizationRecords.push(formData);
    }

    const modal = Modal.getInstance(this.immunizationModal.nativeElement);
    if (modal) {
      modal.hide();
    }
  }

  editImmunization(immunization: Immunization): void {
    this.isEditMode = true;
    this.editIndex = this.immunizationRecords.indexOf(immunization);
    this.immunizationForm.patchValue(immunization);
    const modal = new Modal(this.immunizationModal.nativeElement);
    modal.show();
  }

  deleteImmunization(immunization: Immunization): void {
    const index = this.immunizationRecords.indexOf(immunization);
    if (index > -1) {
      this.immunizationRecords.splice(index, 1);
    }
  }

  sortTable(column: keyof Immunization): void {
    this.immunizationRecords.sort((a, b) => {
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
