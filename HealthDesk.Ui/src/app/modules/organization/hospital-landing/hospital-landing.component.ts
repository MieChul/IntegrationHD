import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Modal } from 'bootstrap';

interface Physician {
  name: string;
  qualification: string;
  speciality: string;
  opdTiming: string;
  comment: string;
}

interface Service {
  name: string;
  specification: string;
  comment: string;
}

@Component({
  selector: 'app-hospital-landing',
  templateUrl: './hospital-landing.component.html',
  styleUrls: ['./hospital-landing.component.scss']
})
export class HospitalLandingComponent implements OnInit, AfterViewInit {
  @ViewChild('physicianModal') physicianModal!: any;
  @ViewChild('serviceModal') serviceModal!: any;

  selectedTab: string = 'physicianList';

  // Data arrays
  physicians: Physician[] = [];
  services: Service[] = [];

  // Filtered arrays for display
  filteredPhysicians: Physician[] = [];
  filteredServices: Service[] = [];

  // Search texts
  physicianSearchText: string = '';
  serviceSearchText: string = '';

  // Forms
  physicianForm!: FormGroup;
  serviceForm!: FormGroup;

  // Modal references
  physicianModalRef!: NgbModalRef;
  serviceModalRef!: NgbModalRef;

  // Flags
  isEditPhysician: boolean = false;
  isEditService: boolean = false;

  constructor(private fb: FormBuilder, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.initForms();
    this.loadDummyData();
  }

  ngAfterViewInit(): void {
    this.filterPhysicians();
    this.filterServices();
  }

  selectTab(tab: string): void {
    this.selectedTab = tab;
  }

  initForms(): void {
    this.physicianForm = this.fb.group({
      name: [''],
      qualification: [''],
      speciality: [''],
      opdTiming: [''],
      comment: ['']
    });

    this.serviceForm = this.fb.group({
      name: [''],
      specification: [''],
      comment: ['']
    });
  }

  loadDummyData(): void {
    // Dummy data for physicians
    this.physicians = [
      {
        name: 'Dr. A. Sharma',
        qualification: 'MBBS, MD',
        speciality: 'Cardiology',
        opdTiming: 'Mon-Fri 10 AM - 2 PM',
        comment: 'Expert in heart diseases'
      },
      {
        name: 'Dr. S. Gupta',
        qualification: 'MBBS, MS',
        speciality: 'Orthopedics',
        opdTiming: 'Mon-Sat 9 AM - 1 PM',
        comment: 'Specializes in bone surgery'
      },
      {
        name: 'Dr. R. Singh',
        qualification: 'MBBS, DCH',
        speciality: 'Pediatrics',
        opdTiming: 'Mon-Fri 11 AM - 4 PM',
        comment: 'Child specialist'
      },
      {
        name: 'Dr. K. Verma',
        qualification: 'MBBS, MD',
        speciality: 'Dermatology',
        opdTiming: 'Tue-Thu 12 PM - 5 PM',
        comment: 'Skin specialist'
      },
      {
        name: 'Dr. L. Patel',
        qualification: 'MBBS, MD',
        speciality: 'Neurology',
        opdTiming: 'Mon-Fri 9 AM - 12 PM',
        comment: 'Expert in neurological disorders'
      },
      {
        name: 'Dr. M. Das',
        qualification: 'MBBS, MS',
        speciality: 'ENT',
        opdTiming: 'Wed-Sat 2 PM - 6 PM',
        comment: 'Ear, Nose, Throat specialist'
      }
    ];

    // Dummy data for services
    this.services = [
      {
        name: 'Emergency Services',
        specification: '24/7 Emergency Care',
        comment: 'Immediate care for critical patients'
      },
      {
        name: 'Radiology',
        specification: 'X-Ray, MRI, CT Scan',
        comment: 'Advanced imaging services'
      },
      {
        name: 'Laboratory Services',
        specification: 'Blood Tests, Biopsy',
        comment: 'Accurate diagnostic tests'
      },
      {
        name: 'Physiotherapy',
        specification: 'Rehabilitation and Therapy',
        comment: 'Post-surgery recovery'
      },
      {
        name: 'Pharmacy',
        specification: 'In-house Pharmacy',
        comment: 'All medicines available'
      },
      {
        name: 'Ambulance Services',
        specification: 'Advanced Life Support Ambulances',
        comment: 'Quick patient transport'
      }
    ];

    this.filterPhysicians();
    this.filterServices();
  }

  // Physician Methods

  openPhysicianDialog(physician?: Physician): void {
    this.isEditPhysician = !!physician;
    this.physicianForm.reset();

    if (physician) {
      this.physicianForm.patchValue(physician);
    }

    const modal = new Modal(this.physicianModal.nativeElement);
    modal.show();
  }

  closePhysicianDialog(): void {
    const modal = new Modal(this.physicianModal.nativeElement);
    modal.hide();
  }

  savePhysician(): void {
    const formValues = this.physicianForm.value;

    const physician: Physician = {
      name: formValues.name,
      qualification: formValues.qualification,
      speciality: formValues.speciality,
      opdTiming: formValues.opdTiming,
      comment: formValues.comment
    };

    if (this.isEditPhysician) {
      const index = this.physicians.findIndex(
        p => p.name === physician.name
      );
      if (index !== -1) {
        this.physicians[index] = physician;
      }
    } else {
      this.physicians.push(physician);
    }

    this.filterPhysicians();
    this.closePhysicianDialog();
  }

  deletePhysician(physician: Physician): void {
    if (confirm('Are you sure you want to delete this physician?')) {
      this.physicians = this.physicians.filter(p => p !== physician);
      this.filterPhysicians();
    }
  }

  filterPhysicians(): void {
    if (this.physicianSearchText) {
      this.filteredPhysicians = this.physicians.filter(p =>
        p.name
          .toLowerCase()
          .includes(this.physicianSearchText.toLowerCase())
      );
    } else {
      this.filteredPhysicians = [...this.physicians];
    }
  }

  sortPhysicianTable(column: keyof Physician): void {
    this.filteredPhysicians.sort((a, b) =>
      a[column] > b[column] ? 1 : -1
    );
  }

  // Service Methods

  openServiceDialog(service?: Service): void {
    this.isEditService = !!service;
    this.serviceForm.reset();

    if (service) {
      this.serviceForm.patchValue(service);
    }

    const modal = new Modal(this.serviceModal.nativeElement);
    modal.show();
  }

  closeServiceDialog(): void {
    const modal = new Modal(this.serviceModal.nativeElement);
    modal.hide();
  }

  saveService(): void {
    const formValues = this.serviceForm.value;

    const service: Service = {
      name: formValues.name,
      specification: formValues.specification,
      comment: formValues.comment
    };

    if (this.isEditService) {
      const index = this.services.findIndex(
        s => s.name === service.name
      );
      if (index !== -1) {
        this.services[index] = service;
      }
    } else {
      this.services.push(service);
    }

    this.filterServices();
    this.closeServiceDialog();
  }

  deleteService(service: Service): void {
    if (confirm('Are you sure you want to delete this service?')) {
      this.services = this.services.filter(s => s !== service);
      this.filterServices();
    }
  }

  filterServices(): void {
    if (this.serviceSearchText) {
      this.filteredServices = this.services.filter(s =>
        s.name
          .toLowerCase()
          .includes(this.serviceSearchText.toLowerCase())
      );
    } else {
      this.filteredServices = [...this.services];
    }
  }

  sortServiceTable(column: keyof Service): void {
    this.filteredServices.sort((a, b) =>
      a[column] > b[column] ? 1 : -1
    );
  }
}
