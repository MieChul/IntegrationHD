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
    private filteringService: FilteringService,
    private databaseService: DatabaseService
  ) { }

  ngOnInit(): void {
    this.initForm();

    this.accountService.getUserData().subscribe({
      next: async (data) => {
        this.userData = data;
        this.dosageForms = await this.databaseService.getForms();
        this.drugs = await this.databaseService.getDrugs();
        this.strengthUnits = await this.databaseService.getStrengths();
        this.initializeSearch();
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

    this.addMedicineForm = this.fb.group({
      dosageForm: [''],
      drugName: [''],
      strength: [''],
      strengthUnit: [''],
      frequency: [''],
      selectedTime: ['']
    });
  }

  get timesArray(): FormArray {
    return this.reminderForm.get('times') as FormArray;
  }

  initializeSearch(): void {


    this.filteredDrugs = this.drugFilterCtrl.valueChanges.pipe(
      startWith(''),
      map((search) => this.filterOptions(search, this.drugs))
    );

    this.filteredDosageForms = this.dosageFormFilterCtrl.valueChanges.pipe(
      startWith(''),
      map((search) => this.filterOptions(search, this.dosageForms))
    );

    this.filteredStrengthUnits = this.strengthUnitFilterCtrl.valueChanges.pipe(
      startWith(''),
      map((search) => this.filterOptions(search, this.strengthUnits))
    );
  }

  filterOptions(search: string, options: string[]): string[] {
    const filterValue = search.toLowerCase();
    return options.filter(option => option.toLowerCase().includes(filterValue));
  }


  addMedicine(): void {
    this.addMedicineForm.reset();
    this.editIndex = null;
    const modal = new Modal(this.addMedicineModal.nativeElement);
    modal.show();
  }

  saveMedicine(): void {
    const medicineData = this.addMedicineForm.value;

    if (this.editIndex !== null) {
      this.patientCompliances[this.editIndex] = {
        ...this.patientCompliances[this.editIndex],
        ...medicineData,
      };
    } else {
      const newCompliance = {
        ...medicineData,
        compliancePer: 100,
        pillCount: 0,
      };
      this.patientCompliances.push(newCompliance);
    }

    this.updateComplianceStatus();
    this.updatePillCount();
    const modal = Modal.getInstance(this.addMedicineModal.nativeElement);
    if (modal) {
      modal.hide();
    }
  }

  editMedicine(compliance: any): void {
    this.editIndex = this.patientCompliances.indexOf(compliance);
    this.addMedicineForm.patchValue(compliance);
    const modal = new Modal(this.addMedicineModal.nativeElement);
    modal.show();
  }

  deleteMedicine(compliance: any): void {
    const index = this.patientCompliances.indexOf(compliance);
    if (index > -1) {
      this.patientCompliances.splice(index, 1);
    }
  }

  updateComplianceStatus(): void {
    this.patientCompliances.forEach((compliance: any) => {
      const reports = this.complianceReports.filter((report: any) => report.drugName === compliance.drugName);
      const confirmedReports = reports.filter((report: any) => report.confirmed).length;
      compliance.compliancePer = reports.length > 0 ? (confirmedReports / reports.length) * 100 : 100;
    });
  }

  updatePillCount(): void {
    this.patientCompliances.forEach((compliance: any) => {
      if (compliance.medicineInfo) {
        const confirmedReports = this.complianceReports.filter((report: any) => report.confirmed).length;
        compliance.pillCount = compliance.medicineInfo.unitsPurchased - confirmedReports;

        if (compliance.pillCount <= compliance.medicineInfo.pillThreshold) {
          this.pillReminder = compliance;
        } else {
          this.pillReminder = null;
        }
      } else {
        compliance.pillCount = 0;
      }
    });
  }

  startPillReminderCheck(): void {
    setInterval(() => {
      if (this.pillReminder && this.pillReminder.pillCount <= this.pillReminder.medicineInfo?.pillThreshold!) {
        this.showPillPopup();
      }
    }, 300000); // 5 minutes interval
  }

  showPillPopup(): void {
    const modal = new Modal(this.pillReminderPopupModal.nativeElement);
    modal.show();
  }

  setReminder(compliance: any): void {
    this.reminderForm.reset();
    this.reminderForm.patchValue({
      dosageForm: compliance.dosageForm,
      drugName: compliance.drugName,
      strength: compliance.strength,
      strengthUnit: compliance.strengthUnit,
      frequency: compliance.reminder?.frequency || '',
      selectedTime: compliance.reminder?.selectedTime || '',
      times: compliance.reminder?.times || [],
      howOften: compliance.reminder?.howOften || '',
      specificDays: compliance.reminder?.specificDays || '',
      customDates: compliance.reminder?.customDates || '',
      instruction: compliance.reminder?.instruction || ''
    });
    this.reminderTimes = Array(compliance.frequency).fill('');
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
    if (!this.reminderForm.valid) return;

    const selectedCompliance = this.patientCompliances.find((c: any) => !c.reminder);
    if (selectedCompliance) {
      selectedCompliance.reminder = this.reminderForm.value;
      this.schedulePushNotifications(selectedCompliance);
    }

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
    const selectedCompliance = this.patientCompliances.find((c: any) => c.medicineInfo === undefined);
    if (selectedCompliance) {
      selectedCompliance.medicineInfo = this.medicineInfoForm.value;
      selectedCompliance.pillCount += selectedCompliance.medicineInfo?.unitsPurchased ?? 0;
    }
    this.updatePillCount();
    const modal = new Modal(this.medicineInfoModal.nativeElement);
    if (modal) {
      modal.hide();
    }
  }

  updateReminderRows(): void {
    const frequency = this.reminderForm.get('frequency')?.value;
    const timesArray = this.reminderForm.get('selectedTime')?.value;

  }
  onHowOftenChange(event: any): void {
    const value = event.value;
    this.specificDays = (value === 'specificDays');
    this.customDays = (value === 'customDays');

    const formGroup = this.reminderForm;

    if (this.specificDays) {
      // Add form controls for each day checkbox dynamically
      this.days.forEach(day => {
        if (!formGroup.contains(`day-${day}`)) {
          formGroup.addControl(`day-${day}`, this.fb.control(false));
        }
      });
    } else {
      // Remove day controls if switching away
      this.days.forEach(day => {
        if (formGroup.contains(`day-${day}`)) {
          formGroup.removeControl(`day-${day}`);
        }
      });
    }

    if (this.customDays) {
      // Ensure customDates is added when 'customDays' is selected
      if (!formGroup.contains('customDates')) {
        formGroup.addControl('customDates', this.fb.control('')); // Default empty
      }
    } else {
      // Remove customDates if switching away
      if (formGroup.contains('customDates')) {
        formGroup.removeControl('customDates');
      }
    }
  }



  schedulePushNotifications(compliance: any): void {
    if (compliance?.reminder) {
      const notificationTime = this.calculateNotificationTime(compliance.reminder?.selectedTime, compliance.reminder!.howOften);

      const now = new Date();
      const delay = notificationTime.getTime() - now.getTime();

      if (delay > 0) {
        setTimeout(() => {
          this.showReminderPopup(compliance.reminder!);
        }, delay);
      }
    }
  }


  confirmIntake(confirmed: boolean): void {
    if (this.currentReminder) {
      this.handleNotificationClick(this.currentReminder, confirmed);
      this.currentReminder = null;
    }

    const modal = Modal.getInstance(this.reminderPopupModal.nativeElement);
    if (modal) {
      modal.hide();
    }
  }

  calculateNotificationTime(time: string, howOften: string): Date {
    const timeParts = time.match(/(\d+):(\d+)\s?(AM|PM)/i);
    if (!timeParts) return new Date(NaN); // Invalid time format

    let hours = parseInt(timeParts[1], 10);
    const minutes = parseInt(timeParts[2], 10);
    const period = timeParts[3].toUpperCase(); // AM or PM

    // Convert 12-hour time to 24-hour time
    if (period === 'PM' && hours !== 12) {
      hours += 12;
    } else if (period === 'AM' && hours === 12) {
      hours = 0; // Midnight case
    }

    const notificationTime = new Date();
    notificationTime.setHours(hours, minutes, 0, 0);

    // Handle alternate-day logic
    if (howOften === 'alternateDay') {
      notificationTime.setDate(notificationTime.getDate() + 1);
    }

    return notificationTime;
  }


  handleNotificationClick(reminder: any, confirmed: boolean): void {
    const report: any = {
      date: new Date(),
      time: reminder.times[0],
      confirmed,
      dosageForm: reminder.dosageForm,
      drugName: reminder.drugName,
      strength: reminder.strength,
      strengthUnit: reminder.strengthUnit,
    };
    this.complianceReports.push(report);
    this.updateComplianceStatus();
    this.updatePillCount();
  }

  loadCompliance(): void {
    this.patientService.getCompliance(this.userData.Id).subscribe({
      next: (compliance: any) => {
        this.patientCompliances = compliance.data;
        this.filteredPatientCompliances = [...this.patientCompliances];
      }
    });
  }

  applyFilters(): void {
    this.filteredPatientCompliances = this.filteringService.filter(
      this.patientCompliances,
      {
        drugName: this.searchValue
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
