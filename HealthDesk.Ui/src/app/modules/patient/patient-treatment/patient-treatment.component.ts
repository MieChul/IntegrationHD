import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Modal } from 'bootstrap';
interface PatientTreatment {
  drugName: string;
  dosageForm: string;
  strength: string;
  frequency: string;
  startDate: Date;
  endDate?: Date;
  ongoing: boolean;
  comment: string;
}

@Component({
  selector: 'app-patient-treatment',
  templateUrl: './patient-treatment.component.html',
  styleUrls: ['./patient-treatment.component.scss']
})
export class PatientTreatmentComponent implements OnInit {
  patientTreatments: PatientTreatment[] = [];
  treatmentForm!: FormGroup;
  isEditMode = false;
  selectedTreatment!: PatientTreatment;
  
  @ViewChild('treatmentModal') treatmentModal!: ElementRef;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.treatmentForm = this.fb.group({
      drugName: [''],
      dosageForm: [''],
      strength: [''],
      frequency: [''],
      startDate: [''],
      endDate: [''],
      ongoing: [false],
      comment: ['']
    });

    this.loadDummyData();

    // Disable endDate if ongoing is checked
    this.treatmentForm.get('ongoing')?.valueChanges.subscribe(ongoing => {
      if (ongoing) {
        this.treatmentForm.get('endDate')?.disable();
        this.treatmentForm.get('endDate')?.setValue(null);
      } else {
        this.treatmentForm.get('endDate')?.enable();
      }
    });
  }

  loadDummyData(): void {
    this.patientTreatments = [
      {
        drugName: 'Amoxicillin',
        dosageForm: 'Capsule',
        strength: '500mg',
        frequency: 'Three times a day',
        startDate: new Date('2023-08-01'),
        endDate: new Date('2023-08-10'),
        ongoing: false,
        comment: 'For bacterial infection'
      },
      {
        drugName: 'Metformin',
        dosageForm: 'Tablet',
        strength: '850mg',
        frequency: 'Twice a day',
        startDate: new Date('2022-07-15'),
        ongoing: true,
        comment: 'For diabetes management'
      }
    ];
  }

  addTreatment(): void {
    this.isEditMode = false;
    this.treatmentForm.reset();
    const modal = new Modal(this.treatmentModal.nativeElement);
    modal.show();
  }

  editTreatment(treatment: PatientTreatment): void {
    this.isEditMode = true;
    this.selectedTreatment = treatment;
    this.treatmentForm.patchValue({
      ...treatment,
      startDate: this.formatDateForInput(treatment.startDate),
      endDate: treatment.endDate ? this.formatDateForInput(treatment.endDate) : null
    });
    const modal = new Modal(this.treatmentModal.nativeElement);
    modal.show();
  }

  deleteTreatment(treatment: PatientTreatment): void {
    this.patientTreatments = this.patientTreatments.filter(t => t !== treatment);
  }

  saveTreatment(): void {
    const formValues = this.treatmentForm.value;
    const treatmentData: PatientTreatment = {
      drugName: formValues.drugName,
      dosageForm: formValues.dosageForm,
      strength: formValues.strength,
      frequency: formValues.frequency,
      startDate: new Date(formValues.startDate),
      endDate: formValues.ongoing ? undefined : new Date(formValues.endDate),
      ongoing: formValues.ongoing,
      comment: formValues.comment
    };

    if (this.isEditMode) {
      Object.assign(this.selectedTreatment, treatmentData);
    } else {
      this.patientTreatments.push(treatmentData);
    }
    const modal =  new Modal(this.treatmentModal.nativeElement);
    modal.hide();
  }

  sortTable(column: keyof PatientTreatment): void {
    // this.patientTreatments.sort((a, b) => {
    //   let valA = a[column];
    //   let valB = b[column];

    //   // Handle undefined values
    //   if (valA === undefined || valA === null) return 1;
    //   if (valB === undefined || valB === null) return -1;

    //   // Convert Date objects to timestamps for comparison
    //   if (valA instanceof Date) valA = valA.getTime();
    //   if (valB instanceof Date) valB = valB.getTime();

    //   if (valA[column] < valB[column]) {
    //     return -1;
    //   } else if (valA[column] > valB[column]) {
    //     return 1;
    //   } else {
    //     return 0;
    //   }
    // });
  }

 

  toggleEndDate(): void {
    const ongoing = this.treatmentForm.get('ongoing')?.value;
    if (ongoing) {
      this.treatmentForm.get('endDate')?.disable();
      this.treatmentForm.get('endDate')?.setValue(null);
    } else {
      this.treatmentForm.get('endDate')?.enable();
    }
  }

  formatDateForInput(date: Date): string {
    const d = new Date(date);
    const month = ('0' + (d.getMonth() + 1)).slice(-2);
    const day = ('0' + d.getDate()).slice(-2);
    return `${d.getFullYear()}-${month}-${day}`;
  }
}
