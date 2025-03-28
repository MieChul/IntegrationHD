import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ValidationService } from '../../../shared/services/validator.service';

@Component({
  selector: 'app-new-medical-case',
  templateUrl: './new-medical-case.component.html',
  styleUrls: ['./new-medical-case.component.scss']
})
export class NewMedicalCaseComponent {
  speciality = '';
  diagnosis = '';
  patientInitials = '';
  age: number | null = null;
  chiefComplaints: string[] = [''];
  pastHistory = '';
  examination = '';
  investigation = '';
  treatment = '';
  caseSummary = '';
  images: File[] = [];
  validInitials: boolean = true;
  ageError: string | null = null;
  imageFiles: (File | null)[] = [null, null, null];
  imagePreviewUrls: (string | null)[] = [null, null, null];
  displayImageIndex: number | null = null;

  constructor(private router: Router, private validationService: ValidationService) { }

  submitCase() {
    this.validInitials = /^[A-Za-z.']{3}$/.test(this.patientInitials);
    if (!this.validInitials) return;
    if (!this.validateAge()) return;
    // Logic to handle form submission
    console.log({
      speciality: this.speciality,
      diagnosis: this.diagnosis,
      patientInitials: this.patientInitials,
      age: this.age,
      chiefComplaints: this.chiefComplaints,
      pastHistory: this.pastHistory,
      examination: this.examination,
      investigation: this.investigation,
      treatment: this.treatment,
      caseSummary: this.caseSummary,
      images: this.images
    });
    this.router.navigate(['/physician/medical-cases']);
  }

  goBack() {
    this.router.navigate(['/physician/medical-cases']);
  }

  triggerFileInput(elementId: string): void {
    document.getElementById(elementId)?.click();
  }



  onFileChange(event: any, index: number): void {
    const file = event.target.files[0];
    if (!file) return;

    // Validate the image (assuming validateImage returns a boolean)
    if (!this.validationService.validateImage(file)) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreviewUrls[index] = reader.result as string;
      this.imageFiles[index] = file;
    };
    reader.readAsDataURL(file);
  }

  selectDisplayImage(index: number): void {
    // Only allow selecting an image slot if an image has been uploaded
    if (!this.imagePreviewUrls[index]) {
      return;
    }
    this.displayImageIndex = index;
  }


  addComplaint() {
    this.chiefComplaints.push('');
  }

  validateAge(): boolean {
    if ((this.age ?? 0) < 1 || (this.age ?? 0) > 150) {
      this.ageError = 'Age must be between 1 and 150.';
      return false;
    }

    this.ageError = null;
    return true;
  }

  removeComplaint(index: number) {
    this.chiefComplaints.splice(index, 1);
  }
}
