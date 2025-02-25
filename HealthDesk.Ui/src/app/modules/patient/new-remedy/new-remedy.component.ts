import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-remedy',
  templateUrl: './new-remedy.component.html',
  styleUrls: ['./new-remedy.component.scss']
})
export class NewRemedyComponent implements OnInit {
  remedyForm!: FormGroup;
  images: File[] = [];
  quantities: string[] = [];

  constructor(private fb: FormBuilder, private router: Router) { }

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

  /**
   * Handle Image Uploads
   */
  addImage(): void {
    if (this.images.length < 3) {
      this.images.push(new File([], ''));
    }
  }

  removeImage(index: number): void {
    this.images.splice(index, 1);
  }

  onFileSelected(event: any, index: number): void {
    const file = event.target.files[0];
    if (file) {
      this.images[index] = file;
    }
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
