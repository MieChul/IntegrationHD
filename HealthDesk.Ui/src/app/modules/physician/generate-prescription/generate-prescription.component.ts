import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Router } from '@angular/router';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../../services/account.service';
import { PhysicianService } from '../../services/physician.service';
import { catchError, firstValueFrom, from, map, Observable, of, startWith } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DatabaseService } from '../../../shared/services/database.service';
import * as bootstrap from 'bootstrap';
import { PatientService } from '../../services/patient.service';

@Component({
  selector: 'app-generate-prescription',
  templateUrl: './generate-prescription.component.html',
  styleUrls: ['./generate-prescription.component.scss']
})
export class GeneratePrescriptionComponent implements OnInit {
  dropdownSettings = {
    singleSelection: false,
    idField: 'id',
    textField: 'name',
    enableCheckAll: false,
    disabled: false,
  };
  selectedProfiles: any;
  customInvestigations: { name: string }[] = [];
  finalInvestigations!: FormArray;
  selectedProfilesControl = new FormControl([]);

  forms: string[] = [];
  drugs: string[] = [];
  strengths: string[] = [];
  frequencies: string[] = [];
  durations: string[] = [];
  bodySystems: string[] = [];
  investigations: string[] = [];
  brands: string[] = [];
  filteredInvestigations!: Observable<string[]>;
  investigationFilterCtrl = new FormControl();
  profileDatas: string[] = [];
  filteredFroms!: Observable<string[]>;
  filteredDrugs!: Observable<string[]>;
  filteredStrengths!: Observable<string[]>;
  filteredFrequencies!: Observable<string[]>;
  filteredDurations!: Observable<string[]>;
  filteredBodySystems!: Observable<string[]>;
  filteredProfileDatas!: Observable<string[]>;
  fromFilterCtrl = new FormControl();
  drugFilterCtrl = new FormControl();
  strengthFilterCtrl = new FormControl();
  frequencyFilterCtrl = new FormControl();
  durationFilterCtrl = new FormControl();
  systemFilterCtrl = new FormControl();
  profileDatasFilterCtrl = new FormControl();
  brandFilterCtrl = new FormControl();
  filteredBrands!: Observable<string[]>;

  signature: string | ArrayBuffer | null = null;
  stamp: string | ArrayBuffer | null = null;
  selectedProfile: string = '';
  profiles: any = [];
  currentTabIndex = 0;
  prescriptionForm: FormGroup = new FormGroup({});
  patientRecord: any;
  headerImg: string = '';
  footerImg: string = '';
  userData: any;

  constructor(private router: Router, private accountService: AccountService, private physicianService: PhysicianService, private http: HttpClient, private fb: FormBuilder, private databaseService: DatabaseService, private patientService: PatientService) {
    const navigation = this.router.getCurrentNavigation();
    this.patientRecord = navigation?.extras.state?.['patient'] ?? '';
  }

  ngOnInit(): void {
    this.initializeForm();
    this.accountService.getUserData().subscribe({
      next: (data) => {
        this.userData = data;
        this.physicianService.getDefaultPrescriptionHeaderFooter(this.userData.id).subscribe({
          next: async (response: any) => {
            // this.headerImg = await this.fetchImageAsBase64(response.data.header);
            // this.footerImg = await this.fetchImageAsBase64(response.data.footer);
            this.drugs = await this.databaseService.getDrugs();
            this.frequencies = await this.databaseService.getFrequencies();
            this.durations = await this.databaseService.getDurations();
            this.bodySystems = await this.databaseService.getSystems();
            this.investigations = await this.databaseService.getInvestigations();
            this.brands = await this.databaseService.getDrugBrands();
            await this.loadProfiles();
            await this.initializeSearch();
          },
          error: (err) => console.error('Error fetching header/footer:', err),
        });
      },
      error: (err) => console.error('Error fetching user data:', err)
    });
  }

  initializeForm(): void {
    this.prescriptionForm = this.fb.group({
      name: [this.patientRecord?.firstName + ' ' + this.patientRecord?.middleName + ' ' + this.patientRecord?.lastName || ''],
      age: [this.calculateAge(this.patientRecord?.dateOfBirth) || '0'],
      gender: [this.patientRecord?.gender || ''],
      pastHistory: [''],
      complaints: this.fb.array([this.createComplaint()]),
      temperature: [''], // Valid range for body temperature
      pulseRate: [''], // Valid range for pulse rate
      bloodPressure: [''], // Valid BP format: e.g., 120/80
      respiratoryRate: [''], // Normal respiratory rate range
      systems: this.fb.array([this.createSystem()]),
      localExamination: [''],
      investigations: [''],
      rx: this.fb.array([this.createRx()]),
      date: [''],
      opd: [''],
      otherInstructions: [''],
      nextFollowUp: ['', [this.futureDateValidator]],
      useHeader: [true],
      finalInvestigations: this.fb.array([])
    });
  }

  initializeSearch(): void {
    this.filteredBodySystems = this.systemFilterCtrl.valueChanges.pipe(
      startWith(''),
      map((search) => this.filterOptions(search, this.bodySystems))
    );

    this.filteredDrugs = this.drugFilterCtrl.valueChanges.pipe(
      startWith(''),
      map((search) => this.filterOptions(search, this.drugs))
    );

    this.filteredDurations = this.durationFilterCtrl.valueChanges.pipe(
      startWith(''),
      map((search) => this.filterOptions(search, this.durations))
    );

    this.filteredFroms = this.fromFilterCtrl.valueChanges.pipe(
      startWith(''),
      map((search) => this.filterOptions(search, this.forms))
    );

    this.filteredFrequencies = this.frequencyFilterCtrl.valueChanges.pipe(
      startWith(''),
      map((search) => this.filterOptions(search, this.frequencies))
    );

    this.filteredStrengths = this.strengthFilterCtrl.valueChanges.pipe(
      startWith(''),
      map((search) => this.filterOptions(search, this.strengths))
    );

    this.filteredProfileDatas = this.profileDatasFilterCtrl.valueChanges.pipe(
      startWith(''),
      map((search) => this.filterOptions(search, this.profileDatas))
    );

    this.filteredInvestigations = this.investigationFilterCtrl.valueChanges.pipe(
      startWith(''),
      map((search) => this.filterOptions(search, this.investigations))
    );

    this.filteredBrands = this.brandFilterCtrl.valueChanges.pipe(
      startWith(''),
      map((search) => this.filterOptions(search, this.brands))
    );
  }

  futureDateValidator(control: AbstractControl): { [key: string]: boolean } | null {
    if (!control.value) return null; // Allow empty values

    const selectedDate = new Date(control.value);
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); // Normalize to start of the day

    return selectedDate < currentDate ? { pastDate: true } : null;
  }

  filterOptions(search: string, options: string[]): string[] {
    const filterValue = search.toLowerCase();
    return options.filter(option => option.toLowerCase().includes(filterValue));
  }



  createComplaint(): FormGroup {
    return this.fb.group({
      text: [''],
      duration: ['']
    });
  }

  createSystem(): FormGroup {
    return this.fb.group({
      name: [''],
      findings: ['']
    });
  }

  createRx(): FormGroup {
    return this.fb.group({
      brand: [''],
      dosageForm: [''],
      drugName: [''],
      strength: [''],
      times: [''],
      duration: [''],
      instruction: ['']
    });
  }

  loadProfiles(): void {
    this.physicianService.getProfiles(this.userData.id)
      .pipe(
        catchError((error) => {
          console.error('Error fetching profiles:', error);
          return of([]); // Return an empty array in case of error
        })
      )
      .subscribe((profiles: any) => {
        this.profiles = profiles.data || [];
        this.profileDatas = this.profiles.map((p: any) => p.name);
      });
  }

  get finalInvestigationsFormArray(): FormArray {
    return this.prescriptionForm.get('finalInvestigations') as FormArray;
  }

  get complaints(): FormArray {
    return this.prescriptionForm.get('complaints') as FormArray;
  }

  get systems(): FormArray {
    return this.prescriptionForm.get('systems') as FormArray;
  }

  get rx(): FormArray {
    return this.prescriptionForm.get('rx') as FormArray;
  }

  calculateAge(dateOfBirth: string): number {
    const dob = new Date(dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const monthDifference = today.getMonth() - dob.getMonth();

    // Adjust age if the birthday hasn't occurred yet this year
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < dob.getDate())) {
      age--;
    }

    return age;
  }


  fetchImageAsBase64(imageUrl: string): Promise<string> {
    return firstValueFrom(
      this.http.get(imageUrl, { responseType: 'blob' }) // Fetch image as a Blob
    ).then((blob) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(blob); // Convert Blob to Base64
      });
    });
  }

  addComplaint() {
    this.complaints.push(this.createComplaint());
  }

  removeComplaint(index: number) {
    this.complaints.removeAt(index);
  }

  addSystem() {
    this.systems.push(this.createSystem());
  }

  removeSystem(index: number) {
    this.systems.removeAt(index);
  }

  addRx() {
    this.rx.push(this.createRx());
  }

  removeRx(index: number) {
    this.rx.removeAt(index);
  }

  nextTab() {
    if (this.currentTabIndex < 3) {
      this.currentTabIndex++;
    }
  }

  previousTab() {
    if (this.currentTabIndex > 0) {
      this.currentTabIndex--;
    }
  }

  async generatePDF(): Promise<Blob> {
    this.prescriptionForm.markAllAsTouched();
    if (this.prescriptionForm.invalid) return Promise.reject('Form is invalid');

    const doc = new jsPDF('p', 'mm', 'a4');
    const pageHeight = doc.internal.pageSize.height;
    const pageWidth = doc.internal.pageSize.width;

    const headerHeight = 45;
    const footerHeight = 40;
    const marginBottom = 20;
    let startY = 60;
    const userDisplay = this.userData.username || 'User';

    const addHeaderAndFooter = () => {
      // Add header image (fixed position)
      const useHeader = this.prescriptionForm.get('useHeader')?.value;
      if (useHeader) {
        try {
          if (this.headerImg) {
            doc.addImage(this.headerImg, 'PNG', 10, 10, 190, 30);
          }
        } catch (error) {
          console.error('Error adding header image:', error);
        }
        doc.setDrawColor(0);
        doc.line(5, headerHeight, pageWidth - 5, headerHeight);
        // Add footer image
        try {
          if (this.footerImg) {
            doc.addImage(
              this.footerImg,
              'PNG',
              10,
              pageHeight - 40,
              190,
              30
            );
          }
        } catch (error) {
          console.error('Error adding footer image:', error);
        }
      }
      const now = new Date();
      const dateStr = now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: '2-digit' });
      const timeStr = now.toTimeString().slice(0, 5);
      doc.setFont('Times');
      doc.setFontSize(6);
      doc.text(
        `Generated using HealthDesk by ${userDisplay} on ${dateStr} at ${timeStr}`,
        14,
        pageHeight - 8
      );
      // Reset startY for content
      startY = headerHeight + 15;
    };


    const checkAndAddNewPage = (tableHeight: number) => {
      if (startY + tableHeight > pageHeight - footerHeight - marginBottom) {
        doc.addPage();
        addHeaderAndFooter();
      }
    };

    addHeaderAndFooter();

    const formatDate = (date: string): string => {
      if (!date) return '';
      const d = date ? new Date(date) : new Date();
      const day = d.getDate().toString().padStart(2, '0');
      const month = (d.getMonth() + 1).toString().padStart(2, '0');
      const year = d.getFullYear();
      return `${day}/${month}/${year}`;
    };
    // Add header and footer to the first page
    const formattedDate = formatDate(new Date().toISOString());
    // Add Date on top-right
    doc.setFontSize(10);
    doc.text(`Barcode: `, 14, headerHeight + 10);
    doc.text(`Date: ${formattedDate || '_________________'}`, pageWidth - 40, headerHeight + 10);
    doc.text(`Patient\'s name: ${this.prescriptionForm.get('name')?.value || ''}`, 14, headerHeight + 17);
    doc.text(`Age: ${this.calculateAge(this.patientRecord?.dateOfBirth) || ''}`, 14, headerHeight + 24);
    doc.text(`Gender: ${this.prescriptionForm.get('gender')?.value || ''}`, 60, headerHeight + 24);
    doc.text(`OPD Registration: ${''}`, 14, headerHeight + 31);

    startY = headerHeight + 37;

    const complaintsArray = this.prescriptionForm.get('complaints') as FormArray;

    const chiefComplaints = complaintsArray.controls.map((control, index) => {
      const complaint = control.value; // Access the value of each FormGroup in the FormArray
      return [
        index + 1,             // Serial number
        complaint.text || '',  // Complaint text
        complaint.duration || '' // Complaint duration
      ];
    }) || [['', '', '']];

    // Approximate table height
    var approxHeight = (chiefComplaints.length * 10) + 10;
    // Check height for Chief Complaints table
    checkAndAddNewPage(approxHeight);
    doc.setFontSize(10);
    const complaints = (this.prescriptionForm.get('complaints') as FormArray).controls;
  const complaintsHeight = complaints.length * 6 + 8;
  doc.text('Chief Complaints:', 14, startY);
  complaints.forEach((ctrl, idx) => {
    const { text, duration } = ctrl.value;
    startY += 6;
    doc.setFontSize(9).text(`${idx+1}. ${text || ''} (${duration || ''})`, 18, startY);
  });

    checkAndAddNewPage(20);
    doc.setFontSize(10);
    doc.text('Vitals:', 14, startY + 5);
    doc.text(`Pulse (per minute): ${this.prescriptionForm.get('pulseRate')?.value || ''}`, 50, startY);
    doc.text(`Respiratory rate (per minute): ${this.prescriptionForm.get('respiratoryRate')?.value || ''}`, 50, startY + 5);
    doc.text(`Blood pressure (mm Hg):  ${this.prescriptionForm.get('bloodPressure')?.value || ''}`, 50, startY + 10);
    doc.text(`Temperature: ${this.prescriptionForm.get('temperature')?.value || ''}`, 50, startY + 15);


    startY = startY + 25;
    checkAndAddNewPage(15);
    doc.setFontSize(10);
    doc.text(`Local examination: ${this.prescriptionForm.get('localExamination')?.value || ''}`, 14, startY);

    const invText = `Investigations: ${this.selectedProfiles.join(', ')}`;
    const invLines = doc.splitTextToSize(invText, pageWidth - 28);
    const invHeight = invLines.length * 6 + 6;
    checkAndAddNewPage(invHeight);
    doc.setFontSize(10).text(invLines, 14, startY);
    startY += invHeight;

    // Systemic Table
    const systemsArray = this.prescriptionForm.get('systems') as FormArray;

    const systemicData = systemsArray.controls.map((control, index) => {
      const system = control.value; // Access the value of each FormGroup in the FormArray
      return [
        index + 1,            // Serial number
        system.name || '',    // System name
        system.findings || '' // System findings
      ];
    }) || [['', '', '']];

    var approxHt = (systemicData.length * 10) + 10;
    checkAndAddNewPage(approxHt);
    doc.setFontSize(10);
    const systems = (this.prescriptionForm.get('systems') as FormArray).controls;
    const physHeight = systems.length * 6 + 8;
    doc.text('Physical Examination:', 14, startY);
    systems.forEach((ctrl, idx) => {
      const { name, findings } = ctrl.value;
      startY += 6;
      doc.setFontSize(9).text(`${idx+1}. ${name || ''}: ${findings || ''}`, 18, startY);
    });
    startY += 10;
    checkAndAddNewPage(10);
    doc.setFontSize(10);
    doc.text(`Provisional Diagnosis: ${this.prescriptionForm.get('pastHistory')?.value || ''}`, 14, startY);

    startY = startY + 7;
    // Rx Details Table
    const rxArray = this.prescriptionForm.get('rx') as FormArray;

    const rxData = rxArray.controls.map((control, index) => {
      const medication = control.value; // Access the value of each FormGroup in the FormArray
      return [
        index + 1,                   // Serial number
        medication.dosageForm || '', // Dosage Form
        medication.drugName || '',   // Drug Name
        medication.strength || '',   // Strength
        medication.times || '',      // Frequency
        medication.duration || '',   // Duration
        medication.instruction || '' // Instruction
      ];
    }) || [['', '', '', '', '', '', '', '']];

    var approx = (rxData.length * 10) + 10;
    checkAndAddNewPage(approx);
    doc.setFontSize(10);
    doc.text('Prescription (Rx):', 14, startY);
    startY += 2;
    // Approximate height for Rx details
    autoTable(doc, {
      head: [['Sr.', 'Dosage Form', 'Drug Name', 'Strength', 'Frequency', 'Duration', 'Instruction']],
      headStyles: {
        fillColor: [255, 255, 255], // Transparent white header (plain)
        textColor: [0, 0, 0],       // Black text color for header
        fontStyle: 'normal'         // Plain font style
      },
      body: rxData,
      styles: {
        font: 'Times',
        fontSize: 8, lineColor: [0, 0, 0], lineWidth: 0.1
      },
      startY: startY
    });
    startY = (doc as any).autoTable.previous.finalY + 7;
    checkAndAddNewPage(15);
    doc.setFontSize(10);

    doc.text(`Other Instructions: ${this.prescriptionForm.get('otherInstructions')?.value || ''}`, 14, startY);
    const nextFollowUpValue = this.prescriptionForm.get('nextFollowUp')?.value;
    const date = new Date(nextFollowUpValue);

    // Get day, month, and year with leading zeros if needed
    const day = String(date.getDate()).padStart(2, '0') || '';
    const month = String(date.getMonth() + 1).padStart(2, '0') || '';
    const year = date.getFullYear() || '';
    doc.text(`Next Follow-up: ${day}/${month}/${year}`, 14, startY + 5);
    startY = startY + 15;
    checkAndAddNewPage(25);
    doc.setFontSize(10);
    // Physician Signature and Stamp Table
    const signatureData = [['Physician Signature', 'Stamp']];
    // Approximate height for signature section
    autoTable(doc, {
      body: signatureData,
      theme: 'plain',
      styles: {
        font: 'Times',
        fontSize: 6, lineColor: [0, 0, 0], lineWidth: 0.1
      },
      columnStyles: {
        0: { cellWidth: 90 }, // Signature (larger for space)
        1: { cellWidth: 90 }   // Stamp
      },
      didParseCell: (data) => {
        if (data.row.index === 0) {
          data.cell.styles.minCellHeight = 20; // Apply larger row height for signature and stamp
        }
      },
      startY: startY
    });

    const pdfBlob = doc.output('blob');
    const illness = complaintsArray.controls
      .map(control => control.value.text) // Extract the `text` value from each FormGroup
      .join(', ');
    const pdfUrl = URL.createObjectURL(pdfBlob);
    window.open(pdfUrl, '_blank'); // ✅ Open the PDF in a new tab
    return pdfBlob;
  };

  openConfirmModal() {
    const modalRef = new bootstrap.Modal(document.getElementById('confirmSaveModal')!);
    modalRef.show();
  }

  async savePDF() {
    try {
      const pdfBlob = await this.generatePDF(); // ✅ Call generatePDF first

      const physicianId = this.userData.id;
      const patientId = this.patientRecord.userId;
      const complaintsArray = this.prescriptionForm.get('complaints') as FormArray;
      const illness = complaintsArray.controls.map(control => control.value.text).join(', ');

      from(this.physicianService.uploadPrescription({ pdfBlob, physicianId, patientId, illness }))
        .subscribe({
          next: (response: any) => {
            const treatmentData = this.prepareTreatmentData();
            this.patientService
              .saveCurrentTreatmentRx(this.patientRecord.userId, treatmentData)
              .subscribe({
                next: (response) => {
                  this.gotToHome();
                },
                error: (error) => {
                  console.error('Error adding medical treatments:', error);
                },
              });
          },
          error: (error) => {
            console.error('Error uploading prescription:', error);
          },
        });
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  }


  prepareTreatmentData(): any[] {
    const rxArray = this.prescriptionForm.get('rx') as FormArray;
    // You can get start date from a control, but here we use the current date
    const startDate = new Date();

    return rxArray.controls.map((control: AbstractControl) => {
      const group = control as FormGroup;
      const rxValue = group.value;
      // Optional: calculate EndDate based on duration if provided (assuming duration is in days)
      let endDate: Date | null = null;
      if (rxValue.duration) {
        endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + Number(rxValue.duration));
      }
      return {
        id: null, // or assign an id if available
        brand: rxValue.brand,
        treatmentDrug: rxValue.drugName,  // mapping your 'drugName' to TreatmentDrug
        dosageForm: rxValue.dosageForm,
        strengthUnit: rxValue.strength,
        frequency: rxValue.times,
        startDate: startDate,
        comment: rxValue.instruction  // mapping 'instruction' to Comment
      };
    });
  }


  // Trigger on investigation value change
  onInvestigationValueChange(selectedInvestigation: string, index: number): void {
    // Add new investigation
    if (selectedInvestigation && !this.selectedProfiles.includes(selectedInvestigation)) {
      this.selectedProfiles.push(selectedInvestigation);
    }
  }





  addInvestigation(name: string = ''): void {
    this.finalInvestigationsFormArray.push(
      this.fb.group({
        name: [name, Validators.required], // Add validation if needed
      })
    );
  }

  removeInvestigation(index: number): void {
    const oldInvestigationName = this.finalInvestigationsFormArray.at(index)?.get('name')?.value;

    // Remove old investigation from selectedProfiles if exists
    const oldIndex = this.selectedProfiles.indexOf(oldInvestigationName);
    if (oldIndex !== -1) {
      this.selectedProfiles.splice(oldIndex, 1);
    }
    this.finalInvestigationsFormArray.removeAt(index);
  }

  updateFinalInvestigations(selectedProfiles: any[]): void {
    // Clear current investigations
    this.finalInvestigationsFormArray.clear();

    // Add investigations from selected profiles
    for (const profile of selectedProfiles) {
      for (const investigation of profile.investigations) {
        this.addInvestigation(investigation.name);
      }
    }

    // Add custom investigations
    for (const customInv of this.customInvestigations) {
      this.addInvestigation(customInv.name);
    }
  }

  onProfileSelectionChange(selectedProfiles: string[]): void {

    // Find selected profiles from this.profiles
    const selectedProfileObjects = this.profiles.filter((profile: any) => selectedProfiles.includes(profile.name));

    // Extract investigations from the selected profiles
    let selectedInvestigations: any[] = [];
    selectedProfileObjects.forEach((profile: any) => {
      selectedInvestigations = [...selectedInvestigations, ...profile.investigations];
    });

    // Remove duplicate investigations by name
    const uniqueInvestigations = selectedInvestigations.filter(
      (inv, index, self) => index === self.findIndex(t => t.name === inv.name)
    );

    // Add investigations to the FormArray
    this.selectedProfiles = uniqueInvestigations
      .map(inv => inv.name);
  }

  addCustomInvestigation(): void {
    // Add a new custom investigation directly to the FormArray
    this.finalInvestigationsFormArray.push(
      this.fb.group({
        name: ['', Validators.required], // Start with an empty name
      })
    );
  }

  updateCustomInvestigations(): void {
    // Ensure custom investigations remain distinct from profile-based investigations
    const profileInvestigationNames = new Set(
      this.selectedProfiles.flatMap((profile: any) =>
        profile.investigations.map((inv: any) => inv.name)
      )
    );

    this.customInvestigations = this.finalInvestigationsFormArray.controls
      .map((control) => control.value.name)
      .filter((name) => !profileInvestigationNames.has(name))
      .map((name) => ({ name }));
  }

  async onRxDrugChange(index: number): Promise<void> {
    const rxArray = this.prescriptionForm.get('rx') as FormArray;
    const rxGroup = rxArray.at(index) as FormGroup;

    // Disable dependent dropdowns while loading new data
    rxGroup.get('dosageForm')?.disable();
    rxGroup.get('strength')?.disable();

    // Clear any previously loaded data if you are storing these locally
    // For example: this.rxDosageForms[index] = [];
    //              this.rxStrengths[index] = [];

    // Get the selected drug from the rx group
    const selectedDrug = rxGroup.get('drugName')?.value;

    if (selectedDrug) {
      // Fetch new dosage forms for the selected drug
      this.forms = await this.databaseService.getForms(selectedDrug);
    }

    // Reset the dosageForm and strength values
    rxGroup.patchValue({ dosageForm: '', strength: '' });

    // Enable dosageForm dropdown if dosage forms are available
    if (this.forms.length > 0) {
      rxGroup.get('dosageForm')?.enable();
    }
  }

  // Called when the dosage form in a specific rx item changes
  async onRxDosageFormChange(index: number): Promise<void> {
    const rxArray = this.prescriptionForm.get('rx') as FormArray;
    const rxGroup = rxArray.at(index) as FormGroup;

    // Disable the strength control while fetching new data
    rxGroup.get('strength')?.disable();

    // Retrieve the selected drug and dosage form values
    const selectedDrug = rxGroup.get('drugName')?.value;
    const selectedDosageForm = rxGroup.get('dosageForm')?.value;
    if (selectedDrug && selectedDosageForm) {
      // Fetch available strengths for the selected drug and dosage form
      this.strengths = await this.databaseService.getStrengths(selectedDrug, selectedDosageForm);
    }

    // Reset the strength field
    rxGroup.patchValue({ strength: '' });

    // Enable strength dropdown if strengths are available
    if (this.strengths.length > 0) {
      rxGroup.get('strength')?.enable();
    }
  }


  gotToHome() {
    this.router.navigate(['/physician/patient-record']);
  }
}
