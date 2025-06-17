import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as bootstrap from 'bootstrap';
import { AccountService } from '../../services/account.service';
import { PatientService } from '../../services/patient.service';
import { FilteringService } from '../../../shared/services/filter.service';
import { Router } from '@angular/router';
import { map, Observable, startWith } from 'rxjs';
import { DatabaseService } from '../../../shared/services/database.service';

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
  servicesOffered: any[] = [];
  filteredEntities: any[] = [];
  selectedEntity: any = null;
  userReview: any = null;
  reviewForm!: FormGroup;
  filterForm!: FormGroup;
  userData: any;
  filteredPhysicians: any[] = [];
  filteredHospitals: any[] = [];
  filteredLaboratories: any[] = [];
  filteredPharmacies: any[] = [];
  physicians: any[] = [];
  hospitals: any[] = [];
  pharmacies: any[] = [];
  laboratories: any[] = [];
  selectedDetails: any = null;
  detailsType: string = '';
  specialities: any[] = [];
  specialityFilterCtrl = new FormControl();
  servicesOfferedCtrl = new FormControl();
  filteredSpecialities!: Observable<string[]>;
  filteredServicesOffered!: Observable<string[]>;

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private patientService: PatientService,
    private filteringService: FilteringService,
    private router: Router,
    private databaseService: DatabaseService
  ) { }

  async ngOnInit() {
    this.initializeForm();
    this.accountService.getUserData().subscribe({
      next: async (data) => {
        this.userData = data;
        await this.loadEntities();
        this.specialities = await this.databaseService.getSpecialities();
        this.servicesOffered = await this.databaseService.getHospitalServcies();
        this.filteredSpecialities = this.specialityFilterCtrl.valueChanges.pipe(
          startWith(''),
          map((search) => this.filterOptions(search, this.specialities))
        );

        this.filteredServicesOffered = this.servicesOfferedCtrl.valueChanges.pipe(
          startWith(''),
          map((search) => this.filterOptions(search, this.servicesOffered))
        );
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
      location: [''],
      speciality: [''],
      from: [''],
      to: [''],
      physician: [''],
      testName: [''],
      pharmacy: [''],
      service: [''],
      drugName: ['']
    });

    this.filterForm.valueChanges.subscribe(() => {
      if (this.currentTab === 'physician') {
        this.applyFiltersPhysician();
      } else if (this.currentTab === 'hospital') {
        this.applyFiltersHospitals();
      } else if (this.currentTab === 'laboratory') {
        this.applyFiltersLaboratory();
      } else if (this.currentTab === 'pharmacy') {
        this.applyFiltersPharma();
      }
    });
  }


  filterOptions(search: string, options: string[]): string[] {
    const filterValue = search.toLowerCase();
    return options.filter(option => option.toLowerCase().includes(filterValue));
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

        this.physicians = this.entities.filter(e => e.entityType === 'physician');
        this.hospitals = this.entities.filter(e => e.entityType === 'hospital');
        this.laboratories = this.entities.filter(e => e.entityType === 'laboratory');
        this.pharmacies = this.entities.filter(e => e.entityType === 'pharmacy');

        // Assign filtered copies for display
        this.filteredPhysicians = [...this.physicians];
        this.filteredHospitals = [...this.hospitals];
        this.filteredLaboratories = [...this.laboratories];
        this.filteredPharmacies = [...this.pharmacies];
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
    if (this.currentTab === 'physician') {
      this.applyFiltersPhysician();
    } else if (this.currentTab === 'hospital') {
      this.applyFiltersHospitals();
    } else if (this.currentTab === 'laboratory') {
      this.applyFiltersLaboratory();
    } else if (this.currentTab === 'pharmacy') {
      this.applyFiltersPharma();
    }
  }

  applyFiltersPhysician(): void {
    const { location, speciality, from, to } = this.filterForm.value;

    this.filteredPhysicians = this.physicians.filter(p => {
      let matches = true;

      if (location) matches = matches && p.location?.toLowerCase().includes(location.toLowerCase());
      if (speciality) matches = matches && p.speciality?.toLowerCase().includes(speciality.toLowerCase());

      // Parse p.timing to get from and to times
      const timingMatch = p.timing?.match(/^(.+?)\s*-\s*(.+)$/);
      if (timingMatch) {
        const [_, timeFrom, timeTo] = timingMatch;
        const physicianFrom = this.filteringService['parseDateTime'](timeFrom);
        const physicianTo = this.filteringService['parseDateTime'](timeTo);

        const selectedFrom = from ? this.filteringService['parseDateTime'](from) : null;
        const selectedTo = to ? this.filteringService['parseDateTime'](to) : null;

        if (selectedFrom && (physicianFrom < selectedFrom)) matches = false;
        if (selectedTo && (physicianTo > selectedTo)) matches = false;
      }

      return matches;
    });
  }


  applyFiltersHospitals(): void {
    this.filteredHospitals = this.filteringService.filter(
      this.hospitals.map(h => ({
        ...h,
        serviceNames: h.services?.map((s: any) => s.name).join(', ') || '',
        physicianNames: h.physicians?.map((p: any) => `${p.firstName} ${p.lastName}`.trim()).join(', ') || ''
      })),
      {
        location: this.filterForm.value.location,
        serviceNames: this.filterForm.value.service,
        physicianNames: this.filterForm.value.physician
      }
    );

  }

  applyFiltersPharma(): void {
    this.filteredPharmacies = this.filteringService.filter(
      this.pharmacies.map(p => ({
        ...p,
        drugNames: p.drugName?.map((d: any) => d.brandName).join(', ') || ''
      })),
      {
        location: this.filterForm.value.location,
        drugNames: this.filterForm.value.drugName
      }
    );
  }

  applyFiltersLaboratory(): void {
    this.filteredLaboratories = this.filteringService.filter(
      this.laboratories.map(lab => ({
        ...lab,
        testNames: lab.testname?.map((t: any) => t.name).join(', ') || ''
      })),
      {
        location: this.filterForm.value.location,
        testNames: this.filterForm.value.testName
      }
    );
  }

  /**
   * Sorts entities by rating in ascending or descending order
   */
  sortByRating(): void {
    if (this.currentTab === 'physician') {
      this.filteredPhysicians.sort((a, b) =>
        this.sortOrder === 'highest' ? b.rating - a.rating : a.rating - b.rating
      );
    } else if (this.currentTab === 'hospital') {
      this.filteredHospitals.sort((a, b) =>
        this.sortOrder === 'highest' ? b.rating - a.rating : a.rating - b.rating
      );
    } else if (this.currentTab === 'laboratory') {
      this.filteredLaboratories.sort((a, b) =>
        this.sortOrder === 'highest' ? b.rating - a.rating : a.rating - b.rating
      );
    } else if (this.currentTab === 'pharmacy') {
      this.filteredPharmacies.sort((a, b) =>
        this.sortOrder === 'highest' ? b.rating - a.rating : a.rating - b.rating
      );
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

  openDetailsModal(entity: any, type: string): void {
    this.selectedDetails = entity;
    this.detailsType = type;
    const modalEl = document.getElementById('detailsModal');
    const modal = new bootstrap.Modal(modalEl!);
    modal.show();
  }
}
