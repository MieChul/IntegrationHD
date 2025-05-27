import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
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
  exercises: string[] = [];
  userData: any;
  foodItems: any;
  exerciseItems: any;
  bmi: any;

  foodItemsFilterCtrl = new FormControl();
  exercisesFilterCtrl = new FormControl();

  filteredFoodItems!: Observable<{ name: string; calories: number }[]>;
  filteredExercises!: Observable<{ name: string; calories: number }[]>;

  @ViewChild('activityModal') activityModal!: ElementRef;
  @ViewChild('editDetailsModal') editDetailsModal!: ElementRef;

  constructor(private fb: FormBuilder, private accountService: AccountService, private databaseService: DatabaseService, private patientService: PatientService, private sortingService: SortingService, private filteringService: FilteringService) { }

  ngOnInit(): void {
    this.accountService.getUserData().subscribe({
      next: async (data) => {
        this.userData = data;
        this.initializeForm();
        this.foodItems = await this.databaseService.getFoodItems();
        this.exerciseItems = await this.databaseService.getExercises();
        await this.loadActivity();
        await this.loadDetails();
        await this.initializeSearch();
      },
      error: (err) => console.error('Error fetching user data:', err)
    });
  }


  initializeSearch(): void {
    this.filteredFoodItems = this.foodItemsFilterCtrl.valueChanges.pipe(
      startWith(''),
      map((search) => this.filterOptions(search, this.foodItems))
    );

    this.filteredExercises = this.exercisesFilterCtrl.valueChanges.pipe(
      startWith(''),
      map((search) => this.filterOptions(search, this.exerciseItems))
    );
  }


  filterOptions(search: string, options: { name: string; calories: number }[]): { name: string; calories: number }[] {
    const filterValue = search.toLowerCase();
    return options.filter(option => option.name.toLowerCase().includes(filterValue));
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
      age: new FormControl({ value: '', disabled: true }),
      gender: new FormControl({ value: this.userData.gender, disabled: true }),
      lifeStyle: this.fb.control('', Validators.required)
    });

    this.activityForm = this.fb.group({
      id: [''],
      date: ['', [Validators.required, this.futureDateValidator]],
      meals: this.fb.array([this.createMeal()]),
      exercises: this.fb.array([this.createExercise()]),
      totalCalories: [0],
      totalCaloriesBurnt: [0]
    }, { validators: this.atLeastOneMealOrExerciseValidator });
  }

  atLeastOneMealOrExerciseValidator(formGroup: AbstractControl): ValidationErrors | null {
    const meals = (formGroup.get('meals') as FormArray)?.length || 0;
    const exercises = (formGroup.get('exercises') as FormArray)?.length || 0;

    return meals === 0 && exercises === 0
      ? { atLeastOneRequired: true }
      : null;
  }


  createMeal(meal?: any): FormGroup {
    const group = this.fb.group({
      id: [meal?.id || null],
      type: [meal?.type || '', Validators.required],
      foodItems: this.fb.array(
        meal?.foodItems?.length
          ? meal.foodItems.map((item: any) => this.createFoodItem(item))
          : [this.createFoodItem()]
      )
    }, { validators: [this.atLeastOneFoodItemValidator()] });

    return group;
  }

  createFoodItem(item?: any): FormGroup {
    return this.fb.group({
      id: [item?.id || null],
      name: [item?.name || '', Validators.required],
      quantity: [item?.quantity ?? '', [Validators.required, Validators.min(1)]],
      calories: [{ value: item?.calories ?? '' }]
    });
  }


  get mealsArray(): FormArray {
    return this.activityForm.get('meals') as FormArray;
  }

  getFoodItemsArray(mealIndex: number): FormArray {
    return this.mealsArray.at(mealIndex).get('foodItems') as FormArray;
  }

  addFoodItem(mealIndex: number): void {
    this.getFoodItemsArray(mealIndex).push(this.createFoodItem());
  }

  removeFoodItem(mealIndex: number, foodIndex: number): void {
    this.getFoodItemsArray(mealIndex).removeAt(foodIndex);
  }


  futureDateValidator(control: any): { [key: string]: boolean } | null {
    const currentDate = new Date();
    if (new Date(control.value) > currentDate) {
      return { futureDate: true };
    }
    return null;
  }

  loadActivity(): void {
    if (!this.userData?.id) {
      console.error('User ID is missing');
      return;
    }

    this.patientService.getActivities(this.userData.id).subscribe({
      next: (data: any) => {
        this.dailyActivities = data?.data
          .map((activity: any) => {
            const foodDetails = activity.meals?.flatMap((meal: any) =>
              meal.foodItems?.map((item: any) => ({
                mealType: meal.type,
                name: item.name,
                calories: item.calories
              })) || []
            ) || [];

            const exerciseDetails = activity.exercises?.flatMap((exercise: any) =>
              exercise.exerciseItems?.map((item: any) => ({
                timeOfDay: exercise.type,
                name: item.name,
                caloriesBurnt: item.calories
              })) || []
            ) || [];

            const totalCalories = activity.totalCalories || 0;
            const totalCaloriesBurnt = activity.totalCaloriesBurnt || 0;
            const totalGainLoss = Math.round(totalCalories - totalCaloriesBurnt);

            return {
              ...activity,
              foodDetails,
              exerciseDetails,
              totalGainLoss
            };
          })
          .sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());
      },
      error: (error) => {
        console.error('Error loading data:', error);
      }
    });
  }

  loadDetails(): void {
    if (!this.userData?.id) return;

    this.patientService.getPatientInfo(this.userData.id).subscribe({
      next: (profile: any) => {
        if (profile) {
          this.editForm.patchValue({
            weight: profile.data.weight || '',
            height: profile.data.height || '',
            age: profile.data.age || '',
            gender: profile.data.gender || '',
            lifeStyle: profile.data.lifeStyle || ''
          });
          this.calculateBMI();
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
    this.selectedActivity = isEditMode ? activity : null;

    const mealsArray = this.activityForm.get('meals') as FormArray;
    const exercisesArray = this.activityForm.get('exercises') as FormArray;

    mealsArray.clear();
    exercisesArray.clear();

    if (isEditMode && activity) {
      this.activityForm.patchValue({
        id: activity.id,
        date: activity.date,
        totalCalories: activity.totalCalories,
        totalCaloriesBurnt: activity.totalCaloriesBurnt
      });

      this.fillFormArray(mealsArray, activity.meals, this.createMeal.bind(this));
      this.fillFormArray(exercisesArray, activity.exercises, this.createExercise.bind(this));
      this.calculateCaloriesBurnt();
      this.calculateCaloriesConsumed();
    } else {
      this.activityForm.reset();
      if (mealsArray.length === 0) mealsArray.push(this.createMeal());
      if (exercisesArray.length === 0) exercisesArray.push(this.createExercise());
      this.calculateCaloriesBurnt();
      this.calculateCaloriesConsumed();
    }
    new bootstrap.Modal(document.getElementById('activityModal')!).show();
  }

  private fillFormArray(formArray: FormArray, items: any[], createFn: (data?: any) => FormGroup): void {
    if (items?.length) {
      items.forEach(item => formArray.push(createFn(item)));
    }
  }

  openUserDetailModal(): void {
    const modal = new bootstrap.Modal(document.getElementById('editDetailsModal')!);
    modal.show();
  }

  deleteActivity(activity: any): void {
    this.patientService.deleteActivity(this.userData.id, activity.id).subscribe({
      next: (response) => {
        console.log(response.message);
        this.loadActivity();
      },
      error: (error) => {
        console.error('Error deleting clinic:', error);
      }
    });
  }

  saveActivity(): void {
    this.activityForm.markAllAsTouched();
    if (this.activityForm.invalid) return;
    this.patientService
      .saveActivity(this.userData.id, this.activityForm.value)
      .subscribe({
        next: (response) => {
          this.loadActivity();
        },
        error: (error) => {
          console.error('Error updating medical activity:', error);
        },
      });
  }


  saveDetail(): void {
    this.editForm.markAllAsTouched();
    if (this.editForm.invalid) return;

    const detailData = this.editForm.value;

    this.patientService
      .updatePatientInfo(this.userData.id, detailData)
      .subscribe({
        next: (response) => {
          this.loadDetails();
        },
        error: (error) => {
          console.error('Error updating data:', error);
        },
      });

    bootstrap.Modal.getInstance(document.getElementById('activityModal')!)?.hide();
  }

  addMeal(): void {
    this.mealsArray.push(this.createMeal());
  }

  removeMeal(index: number): void {
    this.mealsArray.removeAt(index);
  }


  calculateCaloriesConsumed(): void {
    let totalCalories = 0;

    this.mealsArray.controls.forEach((mealGroup: AbstractControl, mealIndex: number) => {
      const foodItemsArray = this.getFoodItemsArray(mealIndex);

      foodItemsArray.controls.forEach((foodGroup: AbstractControl) => {
        const foodName = foodGroup.get('name')?.value;
        const quantity = foodGroup.get('quantity')?.value ?? 0;
        const food = this.foodItems.find((item: any) => item.name === foodName);

        const calories = food && quantity ? (food.calories * quantity) / 100 : 0;
        foodGroup.get('calories')?.setValue(calories, { emitEvent: false });

        totalCalories += calories;
      });
    });

    this.activityForm.get('totalCalories')?.setValue(totalCalories, { emitEvent: false });
  }


  calculateCaloriesBurnt(): void {
    let totalCaloriesBurnt = 0;

    this.exercisesArray.controls.forEach((exerciseGroup: AbstractControl, exerciseIndex: number) => {
      const exerciseItemsArray = this.getExerciseItems(exerciseIndex);

      exerciseItemsArray.controls.forEach((exerciseItemGroup: AbstractControl) => {
        const exerciseName = exerciseItemGroup.get('name')?.value;
        const duration = exerciseItemGroup.get('quantity')?.value ?? 0;
        const exercise = this.exerciseItems.find((item: any) => item.name === exerciseName);

        const caloriesBurnt = exercise && duration ? exercise.calories * duration : 0;
        exerciseItemGroup.get('calories')?.setValue(caloriesBurnt, { emitEvent: false });
        totalCaloriesBurnt += caloriesBurnt;
      });
    });
    this.activityForm.get('totalCaloriesBurnt')?.setValue(totalCaloriesBurnt, { emitEvent: false });
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

  groupBy(array: any[], key: string): { key: string, items: any[] }[] {
    return array.reduce((result, current) => {
      const groupKey = current[key] || 'Unknown';
      const existing = result.find((g: any) => g.key === groupKey);
      if (existing) {
        existing.items.push(current);
      } else {
        result.push({ key: groupKey, items: [current] });
      }
      return result;
    }, []);
  }


  calculateBMI(): void {
    const weight = this.editForm.get('weight')?.value;
    const height = this.editForm.get('height')?.value;

    if (height && weight && !isNaN(height) && !isNaN(weight)) {
      const heightInMeters = height / 100;

      const bmi = weight / (heightInMeters * heightInMeters);

      this.bmi = bmi.toFixed(2);

    } else {
      console.warn('Height or weight is invalid');
    }
  }

  createExercise(exercise?: any): FormGroup {
    const group = this.fb.group({
      id: [exercise?.id || null],
      type: [exercise?.type || '', Validators.required],
      exerciseItems: this.fb.array(
        exercise?.exerciseItems?.length
          ? exercise.exerciseItems.map((item: any) => this.createExerciseItem(item))
          : [this.createExerciseItem()]
      )
    }, { validators: [this.atLeastOneExerciseItemValidator()] });

    return group;
  }

  atLeastOneFoodItemValidator(): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const foodItems = (group.get('foodItems') as FormArray)?.controls;
      const hasValidItem = foodItems?.some(item => item.valid);
      return hasValidItem ? null : { noFoodItems: true };
    };
  }

  atLeastOneExerciseItemValidator(): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const exerciseItems = (group.get('exerciseItems') as FormArray)?.controls;
      const hasValidItem = exerciseItems?.some(item => item.valid);
      return hasValidItem ? null : { noExerciseItems: true };
    };
  }

  createExerciseItem(item?: any): FormGroup {
    return this.fb.group({
      id: [item?.id || null],
      name: [item?.name || '', Validators.required],
      quantity: [item?.quantity ?? '', [Validators.required, Validators.min(1)]],
      calories: [{ value: item?.calories ?? '' }]
    });
  }

  addExercise(): void {
    this.exercisesArray.push(this.createExercise());
  }

  removeExercise(index: number): void {
    this.exercisesArray.removeAt(index);
  }

  addExerciseItem(exerciseIndex: number): void {
    this.getExerciseItems(exerciseIndex).push(this.createExerciseItem());
  }

  removeExerciseItem(exerciseIndex: number, itemIndex: number): void {
    this.getExerciseItems(exerciseIndex).removeAt(itemIndex);
  }

  get exercisesArray(): FormArray {
    return this.activityForm.get('exercises') as FormArray;
  }

  getExerciseItems(index: number): FormArray {
    return this.exercisesArray.at(index).get('exerciseItems') as FormArray;
  }
}
