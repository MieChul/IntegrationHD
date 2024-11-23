import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Modal } from 'bootstrap';

interface PatientCompliance {
  dosageForm: string;
  drugName: string;
  strength: string;
  frequency: string;
  compliancePer: number;
  pillCount: number;
  reminder?: Reminder;
  medicineInfo?: MedicineInfo;
}

interface Reminder {
  frequency: number;
  times: string[];
  howOften: string;
  specificDays?: string[];
  customDates?: Date[];
  instruction?: string;
  dosageForm: string;
  drugName: string;
  strength: string;
}

interface MedicineInfo {
  purchaseDate: Date;
  unitsPurchased: number;
  pillThreshold: number;
}

interface ComplianceReport {
  date: Date;
  time: string;
  confirmed: boolean;
  dosageForm: string;
  drugName: string;
  strength: string;
}

@Component({
  selector: 'app-patient-compliance',
  templateUrl: './patient-compliance.component.html',
  styleUrls: ['./patient-compliance.component.scss']
})
export class PatientComplianceComponent implements OnInit {
  patientCompliances: PatientCompliance[] = [];
  complianceReports: ComplianceReport[] = [];
  reminderForm!: FormGroup;
  medicineInfoForm!: FormGroup;
  specificDays: boolean = false;
  customDays: boolean = false;
  reminderTimes: any[] = [];
  days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  currentReminder: Reminder | null = null;
  pillReminder: PatientCompliance | null = null;
  addMedicineForm!: FormGroup;
  editIndex: number | null = null;

  @ViewChild('reminderModal') reminderModal!: ElementRef;
  @ViewChild('medicineInfoModal') medicineInfoModal!: ElementRef;
  @ViewChild('complianceReportModal') complianceReportModal!: ElementRef;
  @ViewChild('reminderPopupModal') reminderPopupModal!: ElementRef;
  @ViewChild('addMedicineModal') addMedicineModal!: ElementRef;
  @ViewChild('pillReminderPopupModal') pillReminderPopupModal!: ElementRef;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.reminderForm = this.fb.group({
      frequency: [''],
      times: this.fb.array([]),
      howOften: [''],
      specificDays: [''],
      customDates: [''],
      instruction: [''],
      dosageForm: [''],
      drugName: [''],
      strength: ['']
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
      frequency: [''],
    });

    this.loadDummyData();
    this.startPillReminderCheck();
  }

  get timesArray(): FormArray {
    return this.reminderForm.get('times') as FormArray;
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
      const newCompliance: PatientCompliance = {
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

  editMedicine(compliance: PatientCompliance): void {
    this.editIndex = this.patientCompliances.indexOf(compliance);
    this.addMedicineForm.patchValue(compliance);
    const modal = new Modal(this.addMedicineModal.nativeElement);
    modal.show();
  }

  deleteMedicine(compliance: PatientCompliance): void {
    const index = this.patientCompliances.indexOf(compliance);
    if (index > -1) {
      this.patientCompliances.splice(index, 1);
    }
  }

  updateComplianceStatus(): void {
    this.patientCompliances.forEach(compliance => {
      const reports = this.complianceReports.filter(report => report.drugName === compliance.drugName);
      const confirmedReports = reports.filter(report => report.confirmed).length;
      compliance.compliancePer = reports.length > 0 ? (confirmedReports / reports.length) * 100 : 100;
    });
  }

  updatePillCount(): void {
    this.patientCompliances.forEach(compliance => {
      if (compliance.medicineInfo) {
        const confirmedReports = this.complianceReports.filter(report => report.drugName === compliance.drugName && report.confirmed).length;
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

  setReminder(compliance: PatientCompliance): void {
    this.reminderForm.reset();
    this.reminderForm.patchValue({
      dosageForm: compliance.dosageForm,
      drugName: compliance.drugName,
      strength: compliance.strength,
      frequency: compliance.reminder?.frequency || '',
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

  viewCompliance(compliance: PatientCompliance): void {
    const filteredReports = this.complianceReports.filter(report => report.drugName === compliance.drugName);
    const modal = new Modal(this.complianceReportModal.nativeElement);
    modal.show();
  }

  viewMedicineInfo(compliance: PatientCompliance): void {
    this.medicineInfoForm.reset();
    if (compliance.medicineInfo) {
      this.medicineInfoForm.patchValue(compliance.medicineInfo);
    }
    const modal = new Modal(this.medicineInfoModal.nativeElement);
    modal.show();
  }

  saveReminder(): void {
    const selectedCompliance = this.patientCompliances.find(c => c.reminder === undefined);
    if (selectedCompliance) {
      selectedCompliance.reminder = this.reminderForm.value;
    }

    this.schedulePushNotifications(selectedCompliance!);
    const modal = Modal.getInstance(this.reminderModal.nativeElement);
    if (modal) {
      modal.hide();
    }
  }

  saveMedicineInfo(): void {
    const selectedCompliance = this.patientCompliances.find(c => c.medicineInfo === undefined);
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
    const timesArray = this.reminderForm.get('times') as FormArray;

    timesArray.clear();
    for (let i = 0; i < frequency; i++) {
      timesArray.push(this.fb.control(''));
    }
  }

  onHowOftenChange(event: any): void {
    const value = event.target.value;
    this.specificDays = (value === 'specificDays');
    this.customDays = (value === 'customDays');
  }

  schedulePushNotifications(compliance: PatientCompliance): void {
    if (compliance?.reminder) {
      compliance.reminder.times.forEach((time, index) => {
        const notificationTime = this.calculateNotificationTime(time, compliance.reminder!.howOften);

        const now = new Date();
        const delay = notificationTime.getTime() - now.getTime();

        if (delay > 0) {
          setTimeout(() => {
            this.showReminderPopup(compliance.reminder!);
          }, delay);
        }
      });
    }
  }

  showReminderPopup(reminder: Reminder): void {
    this.currentReminder = reminder;
    const modal = new Modal(this.reminderPopupModal.nativeElement);
    modal.show();
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
    const [hours, minutes] = time.split(':').map(Number);
    const notificationTime = new Date();
    notificationTime.setHours(hours, minutes, 0, 0);

    if (howOften === 'alternateDay') {
      notificationTime.setDate(notificationTime.getDate() + 1);
    }

    return notificationTime;
  }

  handleNotificationClick(reminder: Reminder, confirmed: boolean): void {
    const report: ComplianceReport = {
      date: new Date(),
      time: reminder.times[0],
      confirmed,
      dosageForm: reminder.dosageForm,
      drugName: reminder.drugName,
      strength: reminder.strength,
    };
    this.complianceReports.push(report);
    this.updateComplianceStatus();
    this.updatePillCount();
  }

  loadDummyData(): void {
    this.patientCompliances = [
      { dosageForm: 'Tablet', drugName: 'Paracetamol', strength: '500mg', frequency: 'Twice a day', compliancePer: 100, pillCount: 15 },
      { dosageForm: 'Injection', drugName: 'Insulin', strength: '10 IU', frequency: 'Once a day', compliancePer: 100, pillCount: 15 }
    ];
  }

  sortTable(column: keyof PatientCompliance): void {
    this.patientCompliances.sort((a, b) => {
      const aValue = a[column] ?? ''; // Use nullish coalescing to default to an empty string if undefined
      const bValue = b[column] ?? ''; // Same for b

      if (aValue < bValue) {
        return -1;
      } else if (aValue > bValue) {
        return 1;
      } else {
        return 0;
      }
    });
  }
}
