import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidationService } from '../../../shared/services/validator.service';

@Component({
  selector: 'app-new-remedy',
  templateUrl: './new-remedy.component.html',
  styleUrls: ['./new-remedy.component.scss']
})
export class NewRemedyComponent implements OnInit {
  remedyForm!: FormGroup;
  images: File[] = [];
  quantities: string[] = [];
  imageFiles: (File | null)[] = [null, null, null];
  imagePreviewUrls: (string | null)[] = [null, null, null];
  displayImageIndex: number | null = null;

  constructor(private fb: FormBuilder, private router: Router, private validationService: ValidationService) { }

  ngOnInit(): void {
    this.remedyForm = this.fb.group({
      name: ['', Validators.required],
      remedyFor: ['', Validators.required],
      ingredients: this.fb.array([this.createIngredient()]),
      preparationMethod: ['', Validators.required],
      usageDirections: ['', Validators.required],
      precautions: ['']
    });
  }

  /**
   * Form Array for Ingredients
   */
  get ingredients(): FormArray {
    return this.remedyForm.get('ingredients') as FormArray;
  }

  createIngredient(): FormGroup {
    return this.fb.group({
      ingredient: ['', Validators.required]
    });
  }

  addIngredient(): void {
    this.ingredients.push(this.createIngredient());
    this.quantities.push('');
  }

  removeIngredient(index: number): void {
    this.ingredients.removeAt(index);
    this.quantities.splice(index, 1);
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

  /**
   * Submit the Remedy
   */
  submitRemedy(): void {
    if (this.remedyForm.valid) {
      const remedyData = {
        ...this.remedyForm.value,
        images: this.images,
        quantities: this.quantities
      };
      console.log('Remedy Data:', remedyData);
      this.router.navigate(['/patient/remedies']);
    } else {
    }
  }

  goBack() {
    this.router.navigate(['/patient/remidies']);
  }
}
