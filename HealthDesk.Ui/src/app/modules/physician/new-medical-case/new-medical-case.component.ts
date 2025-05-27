import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ValidationService } from '../../../shared/services/validator.service';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { PhysicianService } from '../../services/physician.service';
import { AccountService } from '../../services/account.service';
import { DatabaseService } from '../../../shared/services/database.service';

@Component({
  selector: 'app-new-medical-case',
  templateUrl: './new-medical-case.component.html',
  styleUrls: ['./new-medical-case.component.scss']
})
export class NewMedicalCaseComponent {
  caseForm!: FormGroup;
  imageFiles: (File | null)[] = [null, null, null];
  imagePreviewUrls: (string | null)[] = [null, null, null];
  displayImageIndex: number | null = null;
  specialities: string[] = [];
  specialitiesFilterCtrl = new FormControl();
  filteredSpecialitiesOptions!: Observable<string[]>;
  userData: any;

  constructor(private fb: FormBuilder, private router: Router, private validationService: ValidationService, private physicianService: PhysicianService, private accountService: AccountService, private databaseService: DatabaseService) { }

  ngOnInit(): void {
    this.initializeForm();
    this.accountService.getUserData().subscribe({
      next: async (data) => {
        this.userData = data;
        this.specialities = await this.databaseService.getSpecialities();
        await this.initializeSearch();
      },
      error: (err) => console.error('Error fetching user data:', err)
    });
  }

  initializeForm() {
    this.caseForm = this.fb.group({
      id: [],
      userId: ['', Validators.required],
      speciality: [[], Validators.required, Validators.minLength(1)],
      name: ['', Validators.required],
      diagnosis: ['', Validators.required],
      patientInitials: ['', [Validators.required, Validators.minLength(2), Validators.pattern(/^[A-Za-z\-]{2,}$/)]],
      age: ['', [Validators.min(1), Validators.max(150)]],
      images: this.fb.array([this.createImage(), this.createImage(), this.createImage()], [this.atLeastOneDefaultImageValidator()]),
      chiefComplaints: this.fb.array([this.createComplaint()], [this.atLeastOneComplaintValidator()]),
      pastHistory: [''],
      examination: [''],
      investigations: [''],
      treatment: [''],
      caseSummary: ['']
    });
  }

  initializeSearch(): void {
    this.filteredSpecialitiesOptions = this.specialitiesFilterCtrl.valueChanges.pipe(
      startWith(''),
      map((search) => this.filterOptions(search, this.specialities))
    );
  }

  filterOptions(search: string, options: string[]): string[] {
    const filterValue = search.toLowerCase();
    return options.filter(option => option.toLowerCase().includes(filterValue));
  }


  get images(): FormArray {
    return this.caseForm?.get('images') as FormArray;
  }

  get chiefComplaints(): FormArray {
    return this.caseForm?.get('chiefComplaints') as FormArray;
  }

  createImage(): FormGroup {
    return this.fb.group({
      image: ['',],
      isDefault: [false]
    });
  }

  atLeastOneDefaultImageValidator(): ValidatorFn {
    return (formArray: AbstractControl): ValidationErrors | null => {
      const images = (formArray as FormArray).controls;
      const hasDefault = images.some(ctrl => ctrl.get('isDefault')?.value === true);
      return hasDefault ? null : { noDefaultImage: true };
    };
  }

  atLeastOneComplaintValidator(): ValidatorFn {
    return (formArray: AbstractControl): ValidationErrors | null => {
      const array = formArray as FormArray;
      return array && array.length > 0 ? null : { noComplaints: true };
    };
  }

  createComplaint(): FormGroup {

    return this.fb.group({
      id: [],
      name: ['', Validators.required],
      days: [0, Validators.min(1)]
    })

  }

  addComplaint() {
    const newComplaint = this.createComplaint();
    newComplaint.reset({ id: null, name: '', days: 0 });
    this.chiefComplaints.push(newComplaint);
  }

  removeComplaint(index: number) {
    this.chiefComplaints.removeAt(index);
  }

  triggerFileInput(inputId: string) {
    const input = document.getElementById(inputId) as HTMLInputElement;
    input?.click();
  }

  onFileChange(event: any, index: number) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = (reader.result as string).split(',')[1];
      this.images.at(index).get('image')?.setValue(base64);
      this.imagePreviewUrls[index] = 'data:image/png;base64,' + base64;
    };
    reader.readAsDataURL(file);
  }

  selectDisplayImage(index: number) {
    this.images.controls.forEach((ctrl, i) =>
      ctrl.get('isDefault')?.setValue(i === index)
    );
  }

  submitCase() {
    this.caseForm.markAllAsTouched();
    if (this.caseForm.invalid) return;

    this.caseForm.get('userId')?.setValue(this.userData.id);
    this.physicianService
      .saveMedicalCase(this.userData.id, this.caseForm.value)
      .subscribe({
        next: (response) => {
          this.router.navigate(['/physician/medical-cases']);
        },
        error: (error) => {
          console.error('Error Saving case:', error);
        },
      });
  }

  showDefaultImageError(): boolean {
    return this.images?.hasError('noDefaultImage') &&
      this.images.controls.some(c => c.touched || c.get('file')?.value);
  }

  goBack() {
    this.router.navigate(['/physician/medical-cases']);
  }
}
