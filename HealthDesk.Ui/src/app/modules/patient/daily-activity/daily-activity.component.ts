import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Modal } from 'bootstrap';

interface FoodDetail {
  mealType: string;
  name: string;
  calories: number;
}

interface ExerciseDetail {
  timeOfDay: string;
  name: string;
  caloriesBurnt: number;
}

interface DailyActivity {
  date: Date;
  foodDetails: FoodDetail[];
  totalCalories: number;
  exerciseDetails: ExerciseDetail[];
  caloriesBurnt: number;
  totalGainLoss: number;
  comment: string;
}

@Component({
  selector: 'app-daily-activity',
  templateUrl: './daily-activity.component.html',
  styleUrls: ['./daily-activity.component.scss']
})
export class DailyActivityComponent implements OnInit {
  dailyActivities: DailyActivity[] = [];
  activityForm!: FormGroup;
  editForm!: FormGroup;
  isEditMode: boolean = false;
  selectedActivity!: DailyActivity;
  editIndex: number | null = null;

  weight!: number;
  height!: number;
  age!: number;
  gender!: string;
  occupation!: string;
  lifestyle!: string;
  bmi!: number;

  foodItems: FoodDetail[] = [
    { name: 'Rice', calories: 130 , mealType:''},
    { name: 'Chapati', calories: 70 , mealType:''},
    { name: 'Dal', calories: 120 , mealType:''},
    { name: 'Chicken Curry', calories: 210 , mealType:''},
    { name: 'Paneer', calories: 290 , mealType:''},
    { name: 'Roti', calories: 80 , mealType:''},
    { name: 'Idli', calories: 58 , mealType:''},
    { name: 'Dosa', calories: 168 , mealType:''},
    { name: 'Samosa', calories: 262 , mealType:''},
    { name: 'Gulab Jamun', calories: 150 , mealType:''}
  ];

  exerciseItems: ExerciseDetail[] = [
    { name: 'Running', caloriesBurnt: 10,timeOfDay:''},
    { name: 'Cycling', caloriesBurnt: 15,timeOfDay:''},
    { name: 'Swimming', caloriesBurnt: 20,timeOfDay:''},
    { name: 'Yoga', caloriesBurnt: 4 ,timeOfDay:''},
    { name: 'Weight Lifting', caloriesBurnt: 6 ,timeOfDay:''},
    { name: 'Walking', caloriesBurnt: 5 ,timeOfDay:''},
    { name: 'Skipping', caloriesBurnt: 12 ,timeOfDay:''},
    { name: 'Dancing', caloriesBurnt: 7 ,timeOfDay:''},
    { name: 'Aerobics', caloriesBurnt: 9 ,timeOfDay:''},
    { name: 'Basketball', caloriesBurnt: 10 ,timeOfDay:''}
  ];


  meals: string[] = ['Breakfast', 'Lunch', 'Dinner'];
  exercises: string[] = ['Exercise'];
  
  @ViewChild('activityModal') activityModal!: ElementRef;
  @ViewChild('editDetailsModal') editDetailsModal!: ElementRef;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activityForm = this.fb.group({
      date: [''],
    });

    this.editForm = this.fb.group({
      weight: [this.weight],
      height: [this.height],
      age: [this.age],
      gender: [this.gender],
      occupation: [this.occupation],
      lifestyle: [this.lifestyle]
    });

    // Initialize default form controls for meals and exercises
    this.meals.forEach((meal, index) => {
      this.addMealControls(index);
    });

    this.exercises.forEach((exercise, index) => {
      this.addExerciseControls(index);
    });

    this.loadDummyData();
    this.calculateBMI();
  }

  loadDummyData(): void {
    this.dailyActivities = [
        {
            date: new Date('2024-08-01'),
            foodDetails: [
                { mealType: 'Breakfast', name: 'Rice', calories: 200 },
                { mealType: 'Lunch', name: 'Dal', calories: 150 },
            ],
            totalCalories: 350,
            exerciseDetails: [
                { timeOfDay: 'Morning', name: 'Running', caloriesBurnt: 200 },
                { timeOfDay: 'Evening', name: 'Yoga', caloriesBurnt: 100 },
            ],
            caloriesBurnt: 300,
            totalGainLoss: 350 - 300,
            comment: 'Great job! Keep it up!',
        },
        {
            date: new Date('2024-08-02'),
            foodDetails: [
                { mealType: 'Lunch', name: 'Chapati', calories: 150 },
                { mealType: 'Dinner', name: 'Paneer', calories: 250 },
            ],
            totalCalories: 400,
            exerciseDetails: [
                { timeOfDay: 'Morning', name: 'Cycling', caloriesBurnt: 300 },
                { timeOfDay: 'Afternoon', name: 'Swimming', caloriesBurnt: 200 },
            ],
            caloriesBurnt: 500,
            totalGainLoss: 400 - 500,
            comment: 'You are on the right track!',
        },
        {
            date: new Date('2024-08-03'),
            foodDetails: [
                { mealType: 'Breakfast', name: 'Dosa', calories: 200 },
                { mealType: 'Lunch', name: 'Samosa', calories: 300 },
            ],
            totalCalories: 500,
            exerciseDetails: [
                { timeOfDay: 'Afternoon', name: 'Walking', caloriesBurnt: 150 },
            ],
            caloriesBurnt: 150,
            totalGainLoss: 500 - 150,
            comment: 'You need to burn more calories! Consider more intense exercises.',
        },
        {
            date: new Date('2024-08-04'),
            foodDetails: [
                { mealType: 'Breakfast', name: 'Idli', calories: 120 },
                { mealType: 'Lunch', name: 'Paneer', calories: 200 },
                { mealType: 'Dinner', name: 'Chapati', calories: 150 },
            ],
            totalCalories: 470,
            exerciseDetails: [
                { timeOfDay: 'Morning', name: 'Running', caloriesBurnt: 300 },
                { timeOfDay: 'Evening', name: 'Weight Lifting', caloriesBurnt: 100 },
            ],
            caloriesBurnt: 400,
            totalGainLoss: 470 - 400,
            comment: 'Good effort! Keep working towards your goal!',
        },
        {
            date: new Date('2024-08-05'),
            foodDetails: [
                { mealType: 'Lunch', name: 'Roti', calories: 180 },
                { mealType: 'Dinner', name: 'Chicken Curry', calories: 250 },
            ],
            totalCalories: 430,
            exerciseDetails: [
                { timeOfDay: 'Morning', name: 'Skipping', caloriesBurnt: 350 },
                { timeOfDay: 'Evening', name: 'Yoga', caloriesBurnt: 100 },
            ],
            caloriesBurnt: 450,
            totalGainLoss: 430 - 450,
            comment: 'Excellent balance! You’re making great progress!',
        },
        {
            date: new Date('2024-08-06'),
            foodDetails: [
                { mealType: 'Lunch', name: 'Rice', calories: 220 },
                { mealType: 'Dinner', name: 'Gulab Jamun', calories: 150 },
            ],
            totalCalories: 370,
            exerciseDetails: [
                { timeOfDay: 'Afternoon', name: 'Swimming', caloriesBurnt: 300 },
            ],
            caloriesBurnt: 300,
            totalGainLoss: 370 - 300,
            comment: 'Almost there! Try to include a bit more exercise next time.',
        },
        {
            date: new Date('2024-08-07'),
            foodDetails: [
                { mealType: 'Breakfast', name: 'Paneer', calories: 200 },
                { mealType: 'Lunch', name: 'Dal', calories: 150 },
            ],
            totalCalories: 350,
            exerciseDetails: [
                { timeOfDay: 'Morning', name: 'Aerobics', caloriesBurnt: 250 },
                { timeOfDay: 'Evening', name: 'Dancing', caloriesBurnt: 150 },
            ],
            caloriesBurnt: 400,
            totalGainLoss: 350 - 400,
            comment: 'Fantastic! You’re ahead of your goal!',
        }
    ];
}

addDailyActivity(): void {
  this.activityForm.reset();
  this.isEditMode = false;
  this.editIndex = null;

  // Clear existing form controls for meals and exercises
  this.meals = [];
  this.exercises = [];
  this.activityForm = this.fb.group({
      date: [''],
  });

  // Initialize with one meal and one exercise by default
  this.addMeal();
  this.addExercise();

  const modal = new Modal(this.activityModal.nativeElement);
  modal.show();
}
  openEditPopup(): void {
    const modal = new Modal(this.editDetailsModal.nativeElement);
    modal.show();
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
    const index = this.meals.length;
    this.meals.push('Meal ' + (index + 1));
    this.addMealControls(index);
  }

  removeMeal(index: number): void {
    this.meals.splice(index, 1);
    this.activityForm.removeControl('mealType' + index);
    this.activityForm.removeControl('food' + index);
    this.activityForm.removeControl('quantity' + index);
  }

  addExercise(): void {
    const index = this.exercises.length;
    this.exercises.push('Exercise ' + (index + 1));
    this.addExerciseControls(index);
  }

  removeExercise(index: number): void {
    this.exercises.splice(index, 1);
    this.activityForm.removeControl('timeOfDay' + index);
    this.activityForm.removeControl('exercise' + index);
    this.activityForm.removeControl('duration' + index);
  }

  calculateCaloriesConsumed(): void {
    let totalCalories = 0;
    this.meals.forEach((meal, index) => {
      const food = this.foodItems.find(item => item.name === this.activityForm.get('food' + index)?.value);
      const quantity = this.activityForm.get('quantity' + index)?.value;
      if (food && quantity) {
        totalCalories += (food.calories * quantity) / 100;
      }
    });
    this.activityForm.patchValue({ totalCalories });
  }

  calculateCaloriesBurnt(): void {
    let totalCaloriesBurnt = 0;
    this.exercises.forEach((exercise, index) => {
      const exerciseItem = this.exerciseItems.find(item => item.name === this.activityForm.get('exercise' + index)?.value);
      const duration = this.activityForm.get('duration' + index)?.value;
      if (exerciseItem && duration) {
        totalCaloriesBurnt += exerciseItem.caloriesBurnt * duration;
      }
    });
    this.activityForm.patchValue({ totalCaloriesBurnt });
  }

  calculateFoodCalories(index: number): number {
    const food = this.foodItems.find(item => item.name === this.activityForm.get('food' + index)?.value);
    const quantity = this.activityForm.get('quantity' + index)?.value;
    return food && quantity ? (food.calories * quantity) / 100 : 0;
  }

  calculateExerciseCalories(index: number): number {
    const exercise = this.exerciseItems.find(item => item.name === this.activityForm.get('exercise' + index)?.value);
    const duration = this.activityForm.get('duration' + index)?.value;
    return exercise && duration ? exercise.caloriesBurnt * duration : 0;
  }

  saveActivity(): void {
    const formData = this.activityForm.value;
    const foodDetails = this.meals.map((meal, i) => ({
      mealType: this.activityForm.get('mealType' + i)?.value,
      name: this.activityForm.get('food' + i)?.value,
      calories: this.calculateFoodCalories(i)
    }));
    const exerciseDetails = this.exercises.map((exercise, j) => ({
      timeOfDay: this.activityForm.get('timeOfDay' + j)?.value,
      name: this.activityForm.get('exercise' + j)?.value,
      caloriesBurnt: this.calculateExerciseCalories(j)
    }));

    const totalCalories = foodDetails.reduce((acc, item) => acc + item.calories, 0);
    const caloriesBurnt = exerciseDetails.reduce((acc, item) => acc + item.caloriesBurnt, 0);

    const activity: DailyActivity = {
      date: formData.date,
      foodDetails,
      totalCalories,
      exerciseDetails,
      caloriesBurnt,
      totalGainLoss: totalCalories - caloriesBurnt,
      comment: this.getComment(totalCalories - caloriesBurnt)
    };

    if (this.isEditMode && this.editIndex !== null) {
      this.dailyActivities[this.editIndex] = activity;
    } else {
      this.dailyActivities.push(activity);
    }

    const modal = Modal.getInstance(this.activityModal.nativeElement);
    if (modal) {
      modal.hide();
    }
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

  editActivity(activity: DailyActivity): void {
    this.isEditMode = true;
    this.editIndex = this.dailyActivities.indexOf(activity);
    this.activityForm.patchValue(activity);

    // Ensure the form controls are added when editing
    this.meals.forEach((meal, index) => {
      if (!this.activityForm.contains('food' + index)) {
        this.addMealControls(index);
      }
    });

    this.exercises.forEach((exercise, index) => {
      if (!this.activityForm.contains('exercise' + index)) {
        this.addExerciseControls(index);
      }
    });

    const modal = new Modal(this.activityModal.nativeElement);
    modal.show();
  }

  deleteActivity(activity: DailyActivity): void {
    const index = this.dailyActivities.indexOf(activity);
    if (index > -1) {
      this.dailyActivities.splice(index, 1);
    }
  }

  calculateBMI(): void {
    if (this.height && this.weight) {
      const heightInMeters = this.height / 100;
      this.bmi = this.weight / (heightInMeters * heightInMeters);
    }
  }
  
  saveDetails(): void {
    const formData = this.editForm.value;
    this.weight = formData.weight;
    this.height = formData.height;
    this.age = formData.age;
    this.gender = formData.gender;
    this.occupation = formData.occupation;
    this.lifestyle = formData.lifestyle;

    this.calculateBMI();

    const modal = Modal.getInstance(this.editDetailsModal.nativeElement);
    if (modal) {
      modal.hide();
    }
  }
}
