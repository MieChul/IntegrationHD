import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Modal } from 'bootstrap';
import { openDB } from 'idb';

@Component({
  selector: 'app-rate',
  templateUrl: './rate.component.html',
  styleUrls: ['./rate.component.scss'],
})
export class RateComponent implements OnInit {
  @ViewChild('reviewModal') reviewModal!: ElementRef;

  currentTab: string = 'physician';
  searchCriteria: any = { location: '', speciality: '', time: '', testName: '', drugName: '', service: '', physician: '' };
  sortOrder: string = 'highest';
  entities: any[] = [];
  selectedEntity: any = null;
  userReview: any = null;
  reviewForm!: FormGroup;

  constructor(private fb: FormBuilder,  private router: Router) {}

  async ngOnInit() {
    this.reviewForm = this.fb.group({
      rating: [''],
      comment: [''],
    });

    await this.initializeDatabase();
    this.loadEntities();
  }

  async initializeDatabase(): Promise<void> {
    const db = await openDB('RatingDB', 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('ratings')) {
          db.createObjectStore('ratings', { keyPath: 'id', autoIncrement: true });
        }
      },
    });

    const transaction = db.transaction('ratings', 'readwrite');
    const store = transaction.objectStore('ratings');

    if ((await store.count()) === 0) {
      const data = [
        // Physicians
        {
          type: 'physician',
          name: 'Dr. Ganesh',
          location: 'Mumbai',
          speciality: 'Cardiology',
          timing: '10 AM - 5 PM',
          rating: 0,
          reviews: [
            { user: 'User1', comment: 'Excellent doctor!', rating: 5 },
            { user: 'User2', comment: 'Very helpful and kind.', rating: 4 },
            { user: 'User3', comment: 'Explains everything clearly.', rating: 5 },
          ],
        },
        {
          type: 'physician',
          name: 'Dr. Anita',
          location: 'Delhi',
          speciality: 'Orthopedics',
          timing: '9 AM - 3 PM',
          rating: 0,
          reviews: [
            { user: 'User4', comment: 'Very professional.', rating: 4 },
            { user: 'User5', comment: 'Caring and attentive.', rating: 5 },
          ],
        },
        {
          type: 'physician',
          name: 'Dr. Ramesh',
          location: 'Chennai',
          speciality: 'Dermatology',
          timing: '11 AM - 6 PM',
          rating: 0,
          reviews: [
            { user: 'User6', comment: 'Highly recommended.', rating: 5 },
            { user: 'User7', comment: 'Solved my skin issues.', rating: 5 },
          ],
        },
        {
          type: 'physician',
          name: 'Dr. Priya',
          location: 'Bangalore',
          speciality: 'Neurology',
          timing: '8 AM - 2 PM',
          rating: 0,
          reviews: [
            { user: 'User8', comment: 'Very patient and understanding.', rating: 5 },
            { user: 'User9', comment: 'Knowledgeable and polite.', rating: 4 },
          ],
        },
        {
          type: 'physician',
          name: 'Dr. Kumar',
          location: 'Hyderabad',
          speciality: 'Gastroenterology',
          timing: '10 AM - 4 PM',
          rating: 0,
          reviews: [
            { user: 'User10', comment: 'Great experience.', rating: 4 },
            { user: 'User11', comment: 'Solved long-standing issues.', rating: 5 },
          ],
        },
      
        // Hospitals
        {
          type: 'hospital',
          name: 'City Hospital',
          location: 'Bangalore',
          physicians: [{ name: 'Dr. Ganesh', speciality: 'Cardiology' }, { name: 'Dr. Anita', speciality: 'Orthopedics' }],
          services: ['Cardiology', 'Orthopedics'],
          rating: 0,
          reviews: [
            { user: 'User12', comment: 'Great facility!', rating: 4 },
            { user: 'User13', comment: 'Amazing staff and services.', rating: 5 },
          ],
        },
        {
          type: 'hospital',
          name: 'Green Valley Hospital',
          location: 'Mumbai',
          physicians: [{ name: 'Dr. Priya', speciality: 'Neurology' }, { name: 'Dr. Kumar', speciality: 'Gastroenterology' }],
          services: ['Neurology', 'Gastroenterology'],
          rating: 0,
          reviews: [
            { user: 'User14', comment: 'Excellent care.', rating: 5 },
            { user: 'User15', comment: 'Well-organized and clean.', rating: 4 },
          ],
        },
        {
          type: 'hospital',
          name: 'Sunshine Hospital',
          location: 'Delhi',
          physicians: [{ name: 'Dr. Anita', speciality: 'Orthopedics' }, { name: 'Dr. Ramesh', speciality: 'Dermatology' }],
          services: ['Orthopedics', 'Dermatology'],
          rating: 0,
          reviews: [
            { user: 'User16', comment: 'Staff was very kind.', rating: 4 },
            { user: 'User17', comment: 'Top-notch facilities.', rating: 5 },
          ],
        },
        {
          type: 'hospital',
          name: 'Global Hospital',
          location: 'Hyderabad',
          physicians: [{ name: 'Dr. Kumar', speciality: 'Gastroenterology' }],
          services: ['Gastroenterology'],
          rating: 0,
          reviews: [
            { user: 'User18', comment: 'Efficient and caring.', rating: 4 },
            { user: 'User19', comment: 'Highly recommended.', rating: 5 },
          ],
        },
      
        // Laboratories
        {
          type: 'laboratory',
          name: 'PathLab',
          location: 'Pune',
          testName: 'Blood Test',
          rating: 0,
          reviews: [
            { user: 'User20', comment: 'Quick results.', rating: 4 },
            { user: 'User21', comment: 'Affordable pricing.', rating: 5 },
          ],
        },
        {
          type: 'laboratory',
          name: 'HealthCheck Lab',
          location: 'Hyderabad',
          testName: 'X-Ray',
          rating: 0,
          reviews: [
            { user: 'User22', comment: 'Professional service.', rating: 5 },
            { user: 'User23', comment: 'Prompt and efficient.', rating: 4 },
          ],
        },
        {
          type: 'laboratory',
          name: 'Prime Lab',
          location: 'Mumbai',
          testName: 'MRI Scan',
          rating: 0,
          reviews: [
            { user: 'User24', comment: 'Very accurate.', rating: 5 },
            { user: 'User25', comment: 'Friendly staff.', rating: 4 },
          ],
        },
        {
          type: 'laboratory',
          name: 'Wellness Lab',
          location: 'Delhi',
          testName: 'CT Scan',
          rating: 0,
          reviews: [
            { user: 'User26', comment: 'Convenient location.', rating: 4 },
            { user: 'User27', comment: 'Excellent staff.', rating: 5 },
          ],
        },
      
        // Pharmacies
        {
          type: 'pharmacy',
          name: 'MediStore',
          location: 'Delhi',
          drugName: 'Paracetamol',
          rating: 0,
          reviews: [
            { user: 'User28', comment: 'Affordable medicines.', rating: 5 },
            { user: 'User29', comment: 'Always stocked.', rating: 4 },
          ],
        },
        {
          type: 'pharmacy',
          name: 'HealthPlus',
          location: 'Chennai',
          drugName: 'Ibuprofen',
          rating: 0,
          reviews: [
            { user: 'User30', comment: 'Convenient and well-stocked.', rating: 4 },
            { user: 'User31', comment: 'Friendly staff.', rating: 5 },
          ],
        },
        {
          type: 'pharmacy',
          name: 'LifeCare Pharmacy',
          location: 'Hyderabad',
          drugName: 'Cough Syrup',
          rating: 0,
          reviews: [
            { user: 'User32', comment: 'Easy to find items.', rating: 5 },
            { user: 'User33', comment: 'Quick service.', rating: 4 },
          ],
        },
        {
          type: 'pharmacy',
          name: 'WellCare Pharmacy',
          location: 'Pune',
          drugName: 'Vitamin D',
          rating: 0,
          reviews: [
            { user: 'User34', comment: 'Affordable prices.', rating: 5 },
            { user: 'User35', comment: 'Very helpful staff.', rating: 4 },
          ],
        },
      ];
      
 

      for (const item of data) {
        item.rating = this.calculateAverageRating(item.reviews); // Set average rating on initialization
        await store.add(item);
      }
    }
  }

  calculateAverageRating(reviews: any[]): number {
    if (reviews.length === 0) return 0;
    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    return total / reviews.length;
  }

  async loadEntities(): Promise<void> {
    const db = await openDB('RatingDB', 1);
    const transaction = db.transaction('ratings', 'readonly');
    const store = transaction.objectStore('ratings');

    let allEntities = await store.getAll();
    allEntities = allEntities.filter((entity) => entity.type === this.currentTab);

    for (const entity of allEntities) {
      entity.rating = this.calculateAverageRating(entity.reviews); // Ensure ratings are updated dynamically
    }

    if (this.sortOrder === 'highest') {
      allEntities.sort((a, b) => b.rating - a.rating);
    } else {
      allEntities.sort((a, b) => a.rating - b.rating);
    }

    this.entities = allEntities;
  }

  getOtherReviews(): any[] {
    if (!this.selectedEntity) return [];
    return this.selectedEntity.reviews.filter((review: any) => review.user !== 'Current User');
  }

  filteredEntities(): any[] {
    return this.entities.filter((entity) => {
      const criteria = this.searchCriteria;

      if (this.currentTab === 'physician') {
        return (
          (!criteria.location || entity.location.toLowerCase().includes(criteria.location.toLowerCase())) &&
          (!criteria.speciality || entity.speciality.toLowerCase().includes(criteria.speciality.toLowerCase())) &&
          (!criteria.time || entity.timing.toLowerCase().includes(criteria.time.toLowerCase()))
        );
      } else if (this.currentTab === 'hospital') {
        return (
          (!criteria.location || entity.location.toLowerCase().includes(criteria.location.toLowerCase())) &&
          (!criteria.service || entity.services.some((service: string) => service.toLowerCase().includes(criteria.service.toLowerCase()))) &&
          (!criteria.physician || entity.physicians.some((physician: any) => physician.name.toLowerCase().includes(criteria.physician.toLowerCase())))
        );
      } else if (this.currentTab === 'laboratory') {
        return (
          (!criteria.location || entity.location.toLowerCase().includes(criteria.location.toLowerCase())) &&
          (!criteria.testName || entity.testName.toLowerCase().includes(criteria.testName.toLowerCase()))
        );
      } else if (this.currentTab === 'pharmacy') {
        return (
          (!criteria.location || entity.location.toLowerCase().includes(criteria.location.toLowerCase())) &&
          (!criteria.drugName || entity.drugName.toLowerCase().includes(criteria.drugName.toLowerCase()))
        );
      }

      return false; // Default fallback
    });
  }

  openReviewModal(entity: any): void {
    this.selectedEntity = entity;
    this.userReview = entity.reviews.find((review: any) => review.user === 'Current User');
    const reviewModal = new Modal(this.reviewModal.nativeElement);
    reviewModal.show();
  }

  submitReview(): void {
    if (this.selectedEntity) {
      const existingReviewIndex = this.selectedEntity.reviews.findIndex((r: any) => r.user === 'Current User');
      const newReview = this.reviewForm.value;

      if (existingReviewIndex !== -1) {
        this.selectedEntity.reviews[existingReviewIndex] = { ...newReview, user: 'Current User' };
      } else {
        this.selectedEntity.reviews.push({ ...newReview, user: 'Current User' });
      }

      this.selectedEntity.rating = this.calculateAverageRating(this.selectedEntity.reviews);

      this.reviewForm.reset();
      const reviewModal = new Modal(this.reviewModal.nativeElement);
      reviewModal.hide();
    }
  }

  setRating(star: number): void {
    this.reviewForm.get('rating')?.setValue(star);
  }

  async switchTab(tab: string): Promise<void> {
    this.currentTab = tab;
    this.searchCriteria = { location: '', speciality: '', time: '', testName: '', drugName: '', service: '', physician: '' };
    await this.loadEntities();
  }

  onSortChange(): void {
    if (this.sortOrder === 'highest') {
      this.entities.sort((a, b) => b.rating - a.rating);
    } else if (this.sortOrder === 'lowest') {
      this.entities.sort((a, b) => a.rating - b.rating);
    }
  }

  redirectToAppointments(): void {
    this.router.navigate(['patient/appointments']);
  }
}
