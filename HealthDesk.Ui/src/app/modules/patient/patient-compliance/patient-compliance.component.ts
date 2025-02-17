import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Modal } from 'bootstrap';
import { PatientService } from '../../services/patient.service';
import { AccountService } from '../../services/account.service';
import { SortingService } from '../../../shared/services/sorting.service';
import { FilteringService } from '../../../shared/services/filter.service';
import { DatabaseService } from '../../../shared/services/database.service';
import { map, Observable, startWith } from 'rxjs';


@Component({
  selector: 'app-patient-compliance',
  templateUrl: './patient-compliance.component.html',
  styleUrls: ['./patient-compliance.component.scss']
})
export class PatientComplianceComponent implements OnInit {
  patientCompliances: any = [];
  complianceReports: any = [];
  reminderForm!: FormGroup;
  medicineInfoForm!: FormGroup;
  specificDays: boolean = false;
  customDays: boolean = false;
  reminderTimes: any[] = [];
  days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  currentReminder: any = {};
  pillReminder: any = {};
  addMedicineForm!: FormGroup;
  editIndex: number | null = null;
  filteredPatientCompliances: any = [];
  searchValue = '';
  userData: any = [];
  drugs: any = [];
  dosageForms: any = [];
  strengthUnits: any = [];
  drugFilterCtrl = new FormControl();
  dosageFormFilterCtrl = new FormControl();
  strengthUnitFilterCtrl = new FormControl();
  timePickers: any[] = [];
  sortDirection: { [key: string]: 'asc' | 'desc' } = {};

  filteredDrugs!: Observable<string[]>;
  filteredDosageForms!: Observable<string[]>;
  filteredStrengthUnits!: Observable<string[]>;

  @ViewChild('reminderModal') reminderModal!: ElementRef;
  @ViewChild('medicineInfoModal') medicineInfoModal!: ElementRef;
  @ViewChild('complianceReportModal') complianceReportModal!: ElementRef;
  @ViewChild('reminderPopupModal') reminderPopupModal!: ElementRef;
  @ViewChild('addMedicineModal') addMedicineModal!: ElementRef;
  @ViewChild('pillReminderPopupModal') pillReminderPopupModal!: ElementRef;

  constructor(
    private fb: FormBuilder,
    private patientService: PatientService,
    private accountService: AccountService,
    private sortingService: SortingService,
    private filteringService: FilteringService
  ) { }

  ngOnInit(): void {
    this.initForm();

    this.accountService.getUserData().subscribe({
      next: async (data) => {
        this.userData = data;
        this.loadCompliance();
        this.startPillReminderCheck();
      },
      error: (err) => console.error('Error fetching user data:', err)
    });

  }

  initForm() {
    this.reminderForm = this.fb.group({
      frequency: [''],
      selectedTime: [''],
      times: this.fb.array([]),
      howOften: [''],
      specificDays: [''],
      customDates: [''],
      instruction: [''],
      dosageForm: [''],
      drugName: [''],
      strength: [''],
      strengthUnit: ['']
    });

    this.medicineInfoForm = this.fb.group({
      purchaseDate: [''],
      unitsPurchased: [''],
      pillThreshold: ['']
    });
  }


  updateComplianceStatus(): void {
    
  }

  updatePillCount(): void {
    
  }

  startPillReminderCheck(): void {
  
  }

  showPillPopup(): void {
    const modal = new Modal(this.pillReminderPopupModal.nativeElement);
    modal.show();
  }

  setReminder(compliance: any): void {
    this.reminderForm.reset();
    this.reminderForm.patchValue(compliance);
    const modal = new Modal(this.reminderModal.nativeElement);
    modal.show();
  }

  viewCompliance(compliance: any): void {
    const filteredReports = this.complianceReports.filter((report: any) => report.drugName === compliance.drugName);
    const modal = new Modal(this.complianceReportModal.nativeElement);
    modal.show();
  }

  viewMedicineInfo(compliance: any): void {
    this.medicineInfoForm.reset();
    if (compliance.medicineInfo) {
      this.medicineInfoForm.patchValue(compliance.medicineInfo);
    }
    const modal = new Modal(this.medicineInfoModal.nativeElement);
    modal.show();
  }

  saveReminder(): void {
    //save remainder

    // Ensure modal instance exists before closing
    const modalInstance = Modal.getInstance(this.reminderModal.nativeElement);
    if (modalInstance) modalInstance.hide();
  }

  showReminderPopup(reminder: any): void {
    this.currentReminder = reminder;
    setTimeout(() => {
      if (this.reminderPopupModal) {
        const modal = new Modal(this.reminderPopupModal.nativeElement);
        modal.show();
      }
    }, 200);
  }
  
  saveMedicineInfo(): void {
   //save medifineinfo
    this.updatePillCount();
    const modal = new Modal(this.medicineInfoModal.nativeElement);
    if (modal) {
      modal.hide();
    }
  }




  schedulePushNotifications(compliance: any): void {
    //schedule notification as per remainder records
  }


  confirmIntake(confirmed: boolean): void {
    
    this.updateComplianceStatus();
    this.updatePillCount();
    const modal = Modal.getInstance(this.reminderPopupModal.nativeElement);
    if (modal) {
      modal.hide();
    }
  }




  loadCompliance(): void {
    this.patientService.getCurrentTreatments(this.userData.id).subscribe({
      next: (compliance: any) => {
        this.patientCompliances = compliance.data.filter((t: any) => !t.endDate).sort((a: any, b: any) => new Date(b.dateOfDiagnosis).getTime() - new Date(a.dateOfDiagnosis).getTime());
        this.filteredPatientCompliances = [...this.patientCompliances];
      }
    });
  }

  applyFilters(): void {
    this.filteredPatientCompliances = this.filteringService.filter(
      this.patientCompliances,
      {
        treatmentDrug: this.searchValue
      },
      []
    );
  }

  sortTable(column: string): void {
    // Toggle the sort direction
    this.sortDirection[column] = this.sortDirection[column] === 'asc' ? 'desc' : 'asc';
    const direction = this.sortDirection[column];

    // Use the sorting service to sort the data
    this.filteredPatientCompliances = this.sortingService.sort(this.filteredPatientCompliances, column, direction);
  }
}
