import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as bootstrap from 'bootstrap';
import { AccountService } from '../../services/account.service';
import { PatientService } from '../../services/patient.service';
import { FilteringService } from '../../../shared/services/filter.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rate',
  templateUrl: './rate.component.html',
  styleUrls: ['./rate.component.scss'],
})
export class RateComponent implements OnInit {
  @ViewChild('reviewModal') reviewModal!: ElementRef;

  currentTab: string = 'physician';
  sortOrder: string = 'highest';
  entities: any[] = [];
  filteredEntities: any[] = [];
  selectedEntity: any = null;
  userReview: any = null;
  reviewForm!: FormGroup;
  filterForm!: FormGroup;
  userData: any;

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private patientService: PatientService,
    private filteringService: FilteringService,
    private router: Router
  ) {}

  async ngOnInit() {
    this.initializeForm();
    this.accountService.getUserData().subscribe({
      next: async (data) => {
        this.userData = data;
        await this.loadEntities();
      },
      error: (err) => console.error('Error fetching user data:', err)
    });
  }

  /**
   * Initializes filter and review forms
   */
  initializeForm(): void {
    this.reviewForm = this.fb.group({
      rating: ['', Validators.required],
      comment: [''],
    });

    this.filterForm = this.fb.group({
      location: this.fb.control(''),
      speciality: this.fb.control(''),
      timing: this.fb.control(''),
      physician: this.fb.control(''),
      testName: this.fb.control(''),
      pharmacy: this.fb.control('')
    });

    this.filterForm.valueChanges.subscribe(() => {
      this.applyFilters();
    });
  }

  /**
   * Sets the rating in the review form
   */
  setRating(rating: number): void {
    this.reviewForm.get('rating')?.setValue(rating);
  }

  /**
   * Loads entities from the backend
   */
  async loadEntities(): Promise<void> {
    if (!this.userData?.id) {
      console.error('User ID is missing');
      return;
    }

    this.patientService.getEntities().subscribe({
      next: (data: any) => {
        this.entities = data.map((entity: any) => ({
          ...entity,
          reviews: entity.reviews || []
        })).sort((a: any, b: any) => b.rating - a.rating);

        this.applyFilters();
      },
      error: (error) => {
        console.error('Error loading entities:', error);
      }
    });
  }

  /**
   * Opens the review modal and populates form with existing user review if available
   */
  openReviewModal(entity: any): void {
    this.selectedEntity = entity;
    this.userReview = entity.reviews.find((r: any) => r.userId === this.userData.id) || null;

    this.reviewForm.patchValue({
      rating: this.userReview?.rating || '',
      comment: this.userReview?.comment || ''
    });

    const modal = new bootstrap.Modal(this.reviewModal.nativeElement);
    modal.show();
  }

  /**
   * Submits a new review or updates the existing review
   */
  submitReview(): void {
    if (!this.selectedEntity) {
      console.error('No entity selected for review');
      return;
    }

    const review = {
      userId: this.userData.id,
      entityId: this.selectedEntity.entityId,
      entityType: this.selectedEntity.entityType,
      rating: this.reviewForm.value.rating,
      comment: this.reviewForm.value.comment
    };

    this.patientService.addOrUpdateReview(review).subscribe({
      next: () => {
        this.loadEntities();
      },
      error: (error) => {
        console.error('Error submitting review:', error);
      }
    });
  }

  /**
   * Switches between different tabs (Physician, Hospital, Laboratory, Pharmacy)
   */
  async switchTab(tab: string): Promise<void> {
    this.currentTab = tab;
    this.filterForm.reset();
    await this.loadEntities();
  }

  /**
   * Handles sorting by rating
   */
  onSortChange(): void {
    this.sortByRating();
  }

  /**
   * Redirects to the appointments page
   */
  redirectToAppointments(): void {
    this.router.navigate(['patient/appointments']);
  }

  /**
   * Applies filters based on selected tab and form inputs
   */
  applyFilters(): void {
    const filters: any = {};

    if (this.currentTab === 'physician') {
      filters.location = this.filterForm.value.location;
      filters.speciality = this.filterForm.value.speciality;
      filters.timing = this.filterForm.value.timing;
    } else if (this.currentTab === 'hospital') {
      filters.location = this.filterForm.value.location;
      filters.service = this.filterForm.value.service;
      filters.physician = this.filterForm.value.physician;
    } else if (this.currentTab === 'laboratory') {
      filters.location = this.filterForm.value.location;
      filters.testName = this.filterForm.value.testName;
    } else if (this.currentTab === 'pharmacy') {
      filters.location = this.filterForm.value.location;
      filters.pharmacy = this.filterForm.value.pharmacy;
    }

    this.filteredEntities = this.filteringService.filter(this.entities, filters);

    this.sortByRating();
  }

  /**
   * Sorts entities by rating in ascending or descending order
   */
  sortByRating(): void {
    if (this.sortOrder === 'highest') {
      this.filteredEntities.sort((a, b) => b.rating - a.rating);
    } else {
      this.filteredEntities.sort((a, b) => a.rating - b.rating);
    }
  }

  bookAppointment(entityId: string, clinicName: string): void {
    this.router.navigate(['patient/appointments'], {
      queryParams: {
        entityId: entityId,
        clinicName: clinicName
      }
    });
  }
}
