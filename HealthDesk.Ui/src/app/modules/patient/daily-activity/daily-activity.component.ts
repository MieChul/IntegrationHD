import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import * as bootstrap from 'bootstrap';
import { map, Observable, startWith } from 'rxjs';
import { AccountService } from '../../services/account.service';
import { DatabaseService } from '../../../shared/services/database.service';
import { PatientService } from '../../services/patient.service';
import { FilteringService } from '../../../shared/services/filter.service';
import { SortingService } from '../../../shared/services/sorting.service';



@Component({
  selector: 'app-daily-activity',
  templateUrl: './daily-activity.component.html',
  styleUrls: ['./daily-activity.component.scss']
})
export class DailyActivityComponent implements OnInit {
  dailyActivities: any = [];
  activityForm!: FormGroup;
  editForm!: FormGroup;
  isEditMode = false;
  sortDirection: { [key: string]: 'asc' | 'desc' } = {};
  selectedActivity!: any;
  meals: string[] = ['Breakfast', 'Lunch', 'Dinner'];
  exercises: string[] = ['Exercise'];
  userData: any;
  age: any;
  foodItems: any;
  exerciseItems: any;
  bmi:any;

  foodItemsFilterCtrl = new FormControl();

  // Filtered Observables
  filteredFoodItems!: Observable<string[]>;

  exercisesFilterCtrl = new FormControl();

  // Filtered Observables
  filteredExercises!: Observable<string[]>;

  @ViewChild('activityModal') activityModal!: ElementRef;
  @ViewChild('editDetailsModal') editDetailsModal!: ElementRef;

  constructor(private fb: FormBuilder, private accountService: AccountService, private databaseService: DatabaseService, private patientService: PatientService, private sortingService: SortingService, private filteringService: FilteringService) { }

  ngOnInit(): void {
    this.accountService.getUserData().subscribe({
      next: async (data) => {
        this.userData = data;
        this.initializeForm();
        this.calculateAge();
        this.foodItems = await this.databaseService.getFoodItems();
        this.exerciseItems = await this.databaseService.getExercises();
        await this.loadActivity();
        await this.loadDetails();
        await this.initializeSearch();
      },
      error: (err) => console.error('Error fetching user data:', err)
    });

    // Initialize default form controls for meals and exercises
    this.meals.forEach((meal, index) => {
      this.addMealControls(index);
    });

    this.exercises.forEach((exercise, index) => {
      this.addExerciseControls(index);
    });

  }


  initializeSearch(): void {
    this.filteredFoodItems = this.foodItemsFilterCtrl.valueChanges.pipe(
      startWith(''),
      map((search) => this.filterOptions(search, this.foodItems))
    );

    this.filteredExercises = this.exercisesFilterCtrl.valueChanges.pipe(
      startWith(''),
      map((search) => this.filterOptions(search, this.foodItems))
    );
  }

  filterOptions(search: string, options: string[]): string[] {
    const filterValue = search.toLowerCase();
    return options.filter(option => option.toLowerCase().includes(filterValue));
  }

  initializeForm(): void {
    this.editForm = this.fb.group({
      height: this.fb.control('', [
        Validators.required,
        Validators.min(50),
        Validators.max(300)
      ]),
      weight: this.fb.control('', [
        Validators.required,
        Validators.min(20),
        Validators.max(300)
      ]),
      age: new FormControl({ value: this.age, disabled: true }),
      gender: new FormControl({ value: this.userData.gender, disabled: true }),
      lifestyle: this.fb.control('', Validators.required)
    });

    this.activityForm = this.fb.group({
      date: ['', [Validators.required, this.futureDateValidator]],
      meals: this.fb.array([this.createMeal()]),
      exercises: this.fb.array([this.createExercise()]),
      totalCalories: [0],         // To store total calories consumed
      totalCaloriesBurnt: [0]     // To store total calories burnt
    });


  }

  createMeal(): FormGroup {
    return this.fb.group({
      type: ['', Validators.required],          // Changed from mealType to type
      food: ['', Validators.required],
      quantity: [0, [Validators.required, Validators.min(1)]],
      calories: [{ value: 0, disabled: true }]
    });
  }

  createExercise(): FormGroup {
    return this.fb.group({
      type: ['', Validators.required],           // Changed from timeOfDay to type
      exercise: ['', Validators.required],
      durationMinutes: [0, [Validators.required, Validators.min(1)]], // Changed from duration to durationMinutes
      caloriesBurnt: [{ value: 0, disabled: true }]
    });
  }

  futureDateValidator(control: any): { [key: string]: boolean } | null {
    const currentDate = new Date();
    if (new Date(control.value) > currentDate) {
      return { futureDate: true };
    }
    return null;
  }

  calculateAge(): void {
    const birthDateValue = this.userData.dateOfBirth;

    if (birthDateValue) {
      const today = new Date();
      const birthDate = new Date(birthDateValue);
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();

      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }

      this.age = age;
    }
  }

  loadActivity(): void {
    if (!this.userData?.id) {
      console.error('User ID is missing');
      return;
    }

    this.patientService.getActivities(this.userData.id).subscribe({
      next: (data: any) => {
        this.dailyActivities = data?.data.map((activity: any) => ({
          ...activity
        })).sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());
      },
      error: (error) => {
        console.error('Error loading data:', error);
      }
    });
  }

  loadDetails(): void {
    if (!this.userData?.id) {
      console.error('User ID is missing');
      return;
    }

    this.patientService.getPatientInfo(this.userData.id).subscribe({
      next: (data: any) => {
        if (data) {
          // Patch the form with the retrieved user data
          this.editForm.patchValue({
            weight: data.weight || '', // Use empty string if data is not available
            height: data.height || '',
            age: data.age || '',
            gender: data.gender || '',
            lifestyle: data.lifestyle || ''
          });
        } else {
          console.warn('No data found for the user.');
        }
      },
      error: (error) => {
        console.error('Error loading data:', error);
      }
    });
  }

  openDailyActivityModal(isEditMode: boolean, activity: any = null): void {
    this.isEditMode = isEditMode;


    if (isEditMode && activity) {
      this.selectedActivity = activity;
      this.activityForm.patchValue(activity); // Populate the form with existing data
    } else {
      this.selectedActivity = null;
      this.activityForm.reset(); // Clear the form for a new entry
    }

    // Initialize with one meal and one exercise by default
    this.addMeal();
    this.addExercise();

    const modal = new bootstrap.Modal(document.getElementById('activityModal')!);
    modal.show();
  }

  openUserDetailModal(): void {
    const modal = new bootstrap.Modal(document.getElementById('editDetailsModal')!);
    modal.show();
  }

  deleteActivity(activity: any): void {
    this.patientService.deleteActivity(this.userData.id, activity.id).subscribe({
      next: (response) => {
        console.log(response.message); // Success message from API
        this.loadActivity(); // Reload the list after successful deletion
      },
      error: (error) => {
        console.error('Error deleting clinic:', error); // Handle errors
      }
    });
  }

  saveActivity(): void {
    this.activityForm.markAllAsTouched();
    if (this.activityForm.invalid) return;

    const activityData = this.activityForm.value;

    if (this.isEditMode) {
      // Update existing medical activity
      activityData.id = this.selectedActivity?.id; // Attach the existing activity ID for update
      this.patientService
        .saveActivity(this.userData.id, activityData)
        .subscribe({
          next: (response) => {
            this.loadActivity();
          },
          error: (error) => {
            console.error('Error updating medical activity:', error);
          },
        });
    } else {
      // Add new medical activity
      this.patientService
        .saveActivity(this.userData.id, activityData)
        .subscribe({
          next: (response) => {
            this.loadActivity();
          },
          error: (error) => {
            console.error('Error adding medical activity:', error);
          },
        });
    }

    // Close the modal

    bootstrap.Modal.getInstance(document.getElementById('activityModal')!)?.hide();
  }


  saveDetail(): void {
    this.editForm.markAllAsTouched();
    if (this.editForm.invalid) return;

    const detailData = this.editForm.value;

    this.patientService
      .updatePatientInfo(this.userData.id, detailData)
      .subscribe({
        next: (response) => {
          this.loadActivity();
        },
        error: (error) => {
          console.error('Error updating data:', error);
        },
      });

    bootstrap.Modal.getInstance(document.getElementById('activityModal')!)?.hide();
  }


  addMealControls(index: number): void {
    this.activityForm.addControl('mealType' + index, new FormControl(''));
    this.activityForm.addControl('food' + index, new FormControl(''));
    this.activityForm.addControl('quantity' + index, new FormControl(''));
  }

  addExerciseControls(index: number): void {
    this.activityForm.addControl('timeOfDay' + index, new FormControl(''));
    this.activityForm.addControl('exercise' + index, new FormControl(''));
    this.activityForm.addControl('duration' + index, new FormControl(''));
  }

  addMeal(): void {
    this.mealsArray.push(this.createMeal());
  }

  removeMeal(index: number): void {
    this.mealsArray.removeAt(index);
  }

  addExercise(): void {
    this.exercisesArray.push(this.createExercise());
  }

  removeExercise(index: number): void {
    this.exercisesArray.removeAt(index);
  }

  get mealsArray(): FormArray {
    return this.activityForm.get('meals') as FormArray;
  }

  get exercisesArray(): FormArray {
    return this.activityForm.get('exercises') as FormArray;
  }


  calculateCaloriesConsumed(): void {
    // Ensure food items are loaded before calculation
    if (!this.foodItems || this.foodItems.length === 0) {
      this.foodItems = this.databaseService.getFoodItems();
    }

    let totalCalories = 0;
    this.mealsArray.controls.forEach((mealGroup: AbstractControl, index) => {
      const foodName = mealGroup.get('food')?.value;
      const quantity = mealGroup.get('quantity')?.value;

      // Find the food object from the loaded list
      const food = this.foodItems.find((item: any) => item.name === foodName);

      // Calculate calories for the current meal
      const calories = food && quantity ? (food.calories * quantity) / 100 : 0;

      // Update the individual meal calories in the form control
      mealGroup.patchValue({ calories });

      // Add to the total
      totalCalories += calories;
    });

    // Update total calories in the main form
    this.activityForm.patchValue({ totalCalories });
  }

  calculateCaloriesBurnt(): void {
    // Ensure exercise items are loaded before calculation
    if (!this.exerciseItems || this.exerciseItems.length === 0) {
      this.exerciseItems = this.databaseService.getExercises();
    }

    let totalCaloriesBurnt = 0;
    this.exercisesArray.controls.forEach((exerciseGroup: AbstractControl, index) => {
      const exerciseName = exerciseGroup.get('exercise')?.value;
      const duration = exerciseGroup.get('duration')?.value;

      // Find the exercise object from the loaded list
      const exercise = this.exerciseItems.find((item: any) => item.name === exerciseName);

      // Calculate calories burnt for the current exercise
      const caloriesBurnt = exercise && duration ? exercise.calories * duration : 0;

      // Update the individual exercise calories burnt in the form control
      exerciseGroup.patchValue({ caloriesBurnt });

      // Add to the total
      totalCaloriesBurnt += caloriesBurnt;
    });

    // Update total calories burnt in the main form
    this.activityForm.patchValue({ totalCaloriesBurnt });
  }

  getComment(totalGainLoss: number): string {
    if (totalGainLoss < 0) {
      return 'Great job! Keep it up!';
    } else if (totalGainLoss > 0) {
      return 'You need to burn more calories!';
    } else {
      return 'Maintain your current routine!';
    }
  }

  calculateBMI(): void {
    // Get the values from the form
    const weight = this.editForm.get('weight')?.value;
    const height = this.editForm.get('height')?.value;

    // Ensure the values are present and valid numbers
    if (height && weight && !isNaN(height) && !isNaN(weight)) {
      // Convert height from centimeters to meters
      const heightInMeters = height / 100;

      // Calculate BMI using the standard formula
      const bmi = weight / (heightInMeters * heightInMeters);

      // Update the form with the calculated BMI
      this.bmi=  bmi.toFixed(2);

    } else {
      console.warn('Height or weight is invalid');
    }
  }
}
