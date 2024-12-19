import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Modal } from 'bootstrap';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import * as bootstrap from 'bootstrap';

interface Physician {
  id: string;
  firstName: string;
  middleName?: string;
  lastName: string;
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
  selectedPhysicianId: string = '';
  registeredPhysicians: Physician[] = [
    {
      id: '1',
      firstName: 'Dr. John',
      middleName: 'A',
      lastName: 'Doe',
      qualification: 'MBBS, MD',
      speciality: 'Cardiology',
      opdTiming: 'Mon-Fri 10 AM - 2 PM',
      comment: 'Expert in heart diseases'
    },
    {
      id: '2',
      firstName: 'Dr. Jane',
      middleName: 'B',
      lastName: 'Smith',
      qualification: 'MBBS',
      speciality: 'Pediatrics',
      opdTiming: 'Mon-Wed 9 AM - 12 PM',
      comment: 'Child specialist'
    }
  ];



  // Filtered arrays for display
  filteredPhysicians: Physician[] = [];
  filteredServices: Service[] = [];

  // Search texts
  physicianSearchText: string = '';
  serviceSearchText: string = '';
  specialitySearchText: string = '';
  opdSearchText: string = '';

  // Forms
  physicianForm!: FormGroup;
  serviceForm!: FormGroup;

  // Modal references
  physicianModalRef!: NgbModalRef;
  serviceModalRef!: NgbModalRef;

  // Flags
  manualEntryEnabled: boolean = false;
  isEditPhysician: boolean = false;
  isEditService: boolean = false;

  constructor(private fb: FormBuilder, private modalService: NgbModal) { }

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
      physicianSelect: [''],
      firstName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z][a-zA-Z '-]{1,49}$/)]],
      middleName: ['', [Validators.pattern(/^[a-zA-Z][a-zA-Z '-]{1,49}$/)]], // Optional
      lastName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z][a-zA-Z '-]{1,49}$/)]],
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
    this.physicians = [
      {
        id: '3',
        firstName: 'Arjun',
        middleName: 'Kumar',
        lastName: 'Sharma',
        qualification: 'MBBS, MD',
        speciality: 'Cardiology',
        opdTiming: 'Mon-Fri 10 AM - 2 PM',
        comment: 'Expert in heart diseases'
      },
      {
        id: '4',
        firstName: 'Sanjay',
        middleName: '',
        lastName: 'Gupta',
        qualification: 'MBBS, MS',
        speciality: 'Orthopedics',
        opdTiming: 'Mon-Sat 9 AM - 1 PM',
        comment: 'Specializes in bone surgery'
      }
    ];

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

    const modal = new bootstrap.Modal(document.getElementById('physicianModal')!);
    modal.show();
  }

  closePhysicianDialog(): void {
    const modal = new Modal(this.physicianModal.nativeElement);
    modal.hide();
  }

  savePhysician(): void {
    const formValues = this.physicianForm.value;

    const physician: Physician = {
      id: formValues.id,
      firstName: formValues.firstName,
      middleName: formValues.middleName || '', // Optional
      lastName: formValues.lastName,
      qualification: formValues.qualification,
      speciality: formValues.speciality,
      opdTiming: formValues.opdTiming,
      comment: formValues.comment
    };

    if (this.isEditPhysician) {
      const index = this.physicians.findIndex(
        p => p.firstName === physician.firstName && p.lastName === physician.lastName
      );
      if (index !== -1) {
        this.physicians[index] = physician;
      }
    } else {
      this.physicians.push(physician);
    }

    this.filterPhysicians();
    this.manualEntryEnabled = false;
  }

  deletePhysician(physician: Physician): void {
    if (confirm('Are you sure you want to delete this physician?')) {
      this.physicians = this.physicians.filter(p => p !== physician);
      this.filterPhysicians();
    }
  }

  filterPhysicians(): void {
    this.filteredPhysicians = this.physicians.filter(physician => {
      const matchesName = this.physicianSearchText
        ? physician.firstName.toLowerCase().includes(this.physicianSearchText.toLowerCase()) ||
        physician.lastName.toLowerCase().includes(this.physicianSearchText.toLowerCase())
        : true;

      const matchesSpeciality = this.specialitySearchText
        ? physician.speciality.toLowerCase().includes(this.specialitySearchText.toLowerCase())
        : true;

      const matchesOpdTiming = this.opdSearchText
        ? physician.opdTiming.toLowerCase().includes(this.opdSearchText.toLowerCase())
        : true;

      return matchesName && matchesSpeciality && matchesOpdTiming;
    });
  }

  sortPhysicianTable(column: keyof Physician): void {
    this.filteredPhysicians.sort((a, b) =>
      (a[column] || '').toLowerCase() > (b[column] || '').toLowerCase() ? 1 : -1
    );
  }

  exportToExcel(): void {
    // Define the headers matching the HTML table
    const headers = [
      'First Name',
      'Middle Name',
      'Last Name',
      'Qualification',
      'Speciality',
      'OPD Days & Time',
      'Comment'
    ];

    // Map the data to include headers
    const dataToExport = this.filteredPhysicians.map(physician => ({
      'First Name': physician.firstName,
      'Middle Name': physician.middleName || '-', // Use '-' if middle name is missing
      'Last Name': physician.lastName,
      'Qualification': physician.qualification,
      'Speciality': physician.speciality,
      'OPD Days & Time': physician.opdTiming,
      'Comment': physician.comment
    }));

    // Add headers as the first row
    const worksheet = XLSX.utils.json_to_sheet(dataToExport, { header: headers });

    // Create a new workbook and append the worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Physicians');

    // Write workbook to an Excel file
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

    // Save the file
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, `Physicians_${new Date().toISOString()}.xlsx`);
  }

  // Service Methods

  openServiceDialog(service?: Service): void {
    this.isEditService = !!service;
    this.serviceForm.reset();

    if (service) {
      this.serviceForm.patchValue(service);
    }

    const modal = new bootstrap.Modal(document.getElementById('serviceModal')!);
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
      const index = this.services.findIndex(s => s.name === service.name);
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
        s.name.toLowerCase().includes(this.serviceSearchText.toLowerCase())
      );
    } else {
      this.filteredServices = [...this.services];
    }
  }

  sortServiceTable(column: keyof Service): void {
    this.filteredServices.sort((a, b) =>
      (a[column] || '').toLowerCase() > (b[column] || '').toLowerCase() ? 1 : -1
    );
  }

  onPhysicianSelect(event: Event): void {
    const target = event.target as HTMLSelectElement; // Cast to HTMLSelectElement
    const value = target.value;

    if (value === 'manual') {
      this.manualEntryEnabled = true;
      this.physicianForm.reset(); // Reset the form for manual entry
    } else if (value) {
      this.manualEntryEnabled = false;
      const selectedPhysician = this.registeredPhysicians.find(p => p.id === value);
      if (selectedPhysician) {
        this.physicianForm.patchValue(selectedPhysician); // Autofill the form
      }
    } else {
      this.manualEntryEnabled = false;
      this.physicianForm.reset(); // Reset if no selection
    }
  }
}
