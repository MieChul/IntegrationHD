import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-rate',
  templateUrl: './rate.component.html',
  styleUrls: ['./rate.component.scss']
})
export class RateComponent implements OnInit {
  @ViewChild('reviewModal') reviewModal!: ElementRef;

  searchName: string = '';
  searchLocation: string = '';
  sortOrder: string = 'highest';
  doctors: any[] = [];
  selectedDoctor: any = null;
  reviewForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.reviewForm = this.fb.group({
      rating: [''],
      comment: ['']
    });

    // Mock data
    this.doctors = [
      { name: 'Dr. Ganesh', location: 'Mumbai', degree: 'MD', rating: 4.7, reviews: [{author: 'Mithul', comment: 'Great doctor!'}] },
      { name: 'Dr. Ajay', location: 'Thane', degree: 'MBBS', rating: 4.5, reviews: [{author: 'Mithul', comment: 'Very professional.'}] },
      { name: 'Dr. Mithul', location: 'Tulip', degree: 'MD', rating: 4.5, reviews: [{author: 'Mithul', comment: 'Great doctor!'}] },
      { name: 'Dr. Manoj', location: 'Los Angeles', degree: 'MBBS', rating: 3, reviews: [{author: 'Mithul', comment: 'Very professional.'}] },
      { name: 'Dr. John Doe', location: 'New York', degree: 'MD', rating: 4.5, reviews: [{author: 'Mithul', comment: 'Great doctor!'}] },
      { name: 'Dr. Jane Smith', location: 'Los Angeles', degree: 'MBBS', rating: 4.7, reviews: [{author: 'Mithul', comment: 'Very professional.'}] }
 
    ];
  }

  filteredDoctors(): any[] {
    let filtered = this.doctors.filter(doctor =>
      doctor.name.toLowerCase().includes(this.searchName.toLowerCase()) &&
      doctor.location.toLowerCase().includes(this.searchLocation.toLowerCase())
    );

    if (this.sortOrder === 'highest') {
      filtered = filtered.sort((a, b) => b.rating - a.rating);
    } else {
      filtered = filtered.sort((a, b) => a.rating - b.rating);
    }

    return filtered;
  }

  openReviewModal(doctor: any): void {
    this.selectedDoctor = doctor;
    const reviewModal = new Modal(this.reviewModal.nativeElement);
    reviewModal.show();
  }

  submitReview(): void {
    if (this.selectedDoctor) {
      this.selectedDoctor.reviews.push(this.reviewForm.value);
      this.reviewForm.reset();
      const reviewModal = new Modal(this.reviewModal.nativeElement);
      reviewModal.show();
    }
  }

  setRating(star: number): void {
    this.reviewForm.get('rating')?.setValue(star);
  }
}
