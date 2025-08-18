import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, ValidatorFn, AbstractControl, ValidationErrors, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidationService } from '../../../shared/services/validator.service';
import { PatientService } from '../../services/patient.service';
import { AccountService } from '../../services/account.service';
import { map, Observable, startWith } from 'rxjs';
import { DatabaseService } from '../../../shared/services/database.service';

@Component({
  selector: 'app-new-remedy',
  templateUrl: './new-remedy.component.html',
  styleUrls: ['./new-remedy.component.scss']
})
export class NewRemedyComponent implements OnInit {
  remedyForm!: FormGroup;
  imageFiles: (File | null)[] = [null, null, null];
  imagePreviewUrls: (string | null)[] = [null, null, null];
  userData: any;
  remedyFors: string[] = [];
  remedyForFilterCtrl = new FormControl();
  filteredRemedyForOptions!: Observable<string[]>;

  constructor(private fb: FormBuilder, private router: Router, private validationService: ValidationService, private patientService: PatientService, private accountService: AccountService, private databaseService: DatabaseService) { }

  ngOnInit(): void {
    this.initializeForm();
    this.accountService.getUserData().subscribe({
      next: async (data) => {
        this.userData = data;
        this.remedyFors = await this.databaseService.getSymptoms();
        await this.initializeSearch();
      },
      error: (err) => console.error('Error fetching user data:', err)
    });
  }

  initializeForm() {
    this.remedyForm = this.fb.group({
      id: [],
      userId: [''],
      remedyFor: [[], [Validators.required, Validators.minLength(1)]],
      name: ['', Validators.required],
      description: [''],
      preparationMethod: ['', Validators.required],
      usageDirection: ['', Validators.required],
      precaution: [''],
      ingredients: this.fb.array([this.createIngredient()], [this.atLeastOneIngredientValidator()]),
      images: this.fb.array([this.createImage(), this.createImage(), this.createImage()], [this.atLeastOneDefaultImageValidator()])
    });
  }

  initializeSearch(): void {
    this.filteredRemedyForOptions = this.remedyForFilterCtrl.valueChanges.pipe(
      startWith(''),
      map((search) => this.filterOptions(search, this.remedyFors))
    );
  }

  filterOptions(search: string, options: string[]): string[] {
    const filterValue = search.toLowerCase();
    return options.filter(option => option.toLowerCase().includes(filterValue));
  }

  createIngredient(): FormGroup {
    return this.fb.group({
      id: [],
      name: ['', Validators.required],
      quantity: ['', [Validators.required]]
    });
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

  atLeastOneIngredientValidator(): ValidatorFn {
    return (formArray: AbstractControl): ValidationErrors | null => {
      const array = formArray as FormArray;
      return array && array.length > 0 ? null : { noIngredients: true };
    };
  }

  get ingredients(): FormArray {
    return this.remedyForm?.get('ingredients') as FormArray;
  }

  get images(): FormArray {
    return this.remedyForm?.get('images') as FormArray;
  }

  addIngredient() {
    this.ingredients.push(this.createIngredient());
  }

  removeIngredient(index: number) {
    this.ingredients.removeAt(index);
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

  submitRemedy(): void {

    this.remedyForm.markAllAsTouched();
    if (this.remedyForm.invalid) return;

    this.remedyForm.get('userId')?.setValue(this.userData.id);
    this.patientService
      .saveRemedy(this.userData.id, this.remedyForm.value)
      .subscribe({
        next: (response) => {
          this.router.navigate(['/patient/remidies']);
        },
        error: (error) => {
          console.error('Error Saving Remedy:', error);
        },
      });
  }

  showDefaultImageError(): boolean {
    return this.images?.hasError('noDefaultImage') &&
      this.images.controls.some(c => c.touched || c.get('file')?.value);
  }


  goBack() {
    this.router.navigate(['/patient/remidies']);
  }
}
