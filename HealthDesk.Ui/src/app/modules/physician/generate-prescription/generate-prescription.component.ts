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
    // Validate form
    this.prescriptionForm.markAllAsTouched();
    if (this.prescriptionForm.invalid) {
      return Promise.reject('Form is invalid');
    }

    // Initialize jsPDF
    const doc = new jsPDF({ orientation: 'p', unit: 'mm', format: 'a4' });
    const pageHeight = doc.internal.pageSize.getHeight();
    const pageWidth = doc.internal.pageSize.getWidth();

    // Layout constants
    const headerHeight = 45;
    const footerHeight = 40;
    const bottomMargin = 20;
    let startY = headerHeight + 15;
    const userDisplay = this.userData.username || 'User';

    // Date formatting helper
    const formatDate = (date: Date): string => {
      const dd = String(date.getDate()).padStart(2, '0');
      const mm = String(date.getMonth() + 1).padStart(2, '0');
      const yyyy = date.getFullYear();
      return `${dd}/${mm}/${yyyy}`;
    };

    // Add header and footer to current page
    const addHeaderAndFooter = (): void => {
      const useHeader = !!this.prescriptionForm.get('useHeader')?.value;

      // Header image
      if (useHeader && this.headerImg) {
        try { doc.addImage(this.headerImg, 'PNG', 10, 10, pageWidth - 20, 30); } catch { }
      }

      // Separator below header
      doc.setDrawColor(0).line(5, headerHeight, pageWidth - 5, headerHeight);

      // Footer image
      if (this.footerImg) {
        try { doc.addImage(this.footerImg, 'PNG', 10, pageHeight - footerHeight, pageWidth - 20, 30); } catch { }
      }

      // "Generated using..." text
      const now = new Date();
      const dateStr = now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: '2-digit' });
      const timeStr = now.toTimeString().slice(0, 5);
      doc.setFont('helvetica', 'normal').setFontSize(6);
      doc.text(
        `Generated using HealthDesk by ${userDisplay} on ${dateStr} at ${timeStr}`,
        14,
        pageHeight - 8
      );

      // Reset content start
      startY = headerHeight + 15;
    };

    // Insert page break if needed
    const checkPageBreak = (blockHeight: number): void => {
      if (startY + blockHeight > pageHeight - footerHeight - bottomMargin) {
        doc.addPage();
        addHeaderAndFooter();
      }
    };

    // First page header/footer
    addHeaderAndFooter();

    // --------------------
    // 1. Patient Info
    // --------------------
    const name = this.prescriptionForm.get('name')?.value || '';
    const age = this.calculateAge(this.patientRecord?.dateOfBirth) || '';
    const gender = this.prescriptionForm.get('gender')?.value || '';
    const date = formatDate(new Date());

    checkPageBreak(18);
    doc.setFontSize(10).setFont('helvetica', 'bold');
    doc.text('Barcode:', 14, startY);
    doc.setFont('helvetica', 'normal').text('', 38, startY); // Placeholder for barcode if needed

    doc.setFont('helvetica', 'bold').text('Date:', pageWidth - 70, startY, { align: 'left' });
    doc.setFont('helvetica', 'normal').text(date, pageWidth - 28, startY, { align: 'right' });

    startY += 6;

    doc.setFont('helvetica', 'bold').text("Patient's Name:", 14, startY);
    doc.setFont('helvetica', 'normal').text(name, 48, startY);

    startY += 6;
    doc.setFont('helvetica', 'bold').text('Age:', 14, startY);
    doc.setFont('helvetica', 'normal').text(age.toString(), 30, startY);

    doc.setFont('helvetica', 'bold').text('Gender:', pageWidth - 70, startY, { align: 'left' });
    doc.setFont('helvetica', 'normal').text(gender, pageWidth - 35, startY, { align: 'right' });

    startY += 6;
    doc.setFont('helvetica', 'bold').text('OPD Registration:', 14, startY);
    doc.setFont('helvetica', 'normal').text('', 55, startY); // Placeholder

    startY += 8;

    // --------------------
    // 2. Chief Complaints
    // --------------------
    const complaintCtrls = (this.prescriptionForm.get('complaints') as FormArray).controls;
    const complaintStrings = complaintCtrls
      .filter(c => (c.value.text || '').trim())
      .map((c, i) => `${i + 1}. ${c.value.text.trim()} (${c.value.duration || ''} days)`);
    if (complaintStrings.length) {
      const complaintText = `${complaintStrings.join(', ')}`;
      const wrapped = doc.splitTextToSize(complaintText, pageWidth - 28);
      const complaintHeight = wrapped.length * 6;
      checkPageBreak(complaintHeight);
      doc.setFont('helvetica', 'bold').text('Chief Complaints:', 14, startY);
      doc.setFont('helvetica', 'normal').text(wrapped, 50, startY);
      startY += complaintHeight + 5;
    }

     // --------------------
    // 3. History
    // --------------------
    const significientHistory = this.prescriptionForm.get('pastHistory')?.value?.trim();
    if (significientHistory) {
      doc.setFont('helvetica', 'bold').text('Significant history:', 14, startY);
      const localLines = doc.splitTextToSize(`${significientHistory}`, pageWidth - 28);
      const localHeight = localLines.length * 6;
      checkPageBreak(localHeight);
      doc.setFont('helvetica', 'normal').text(localLines, 50, startY);
      startY += localHeight + 5;
    }

    // --------------------
    // 4. Vitals
    // --------------------
    doc.setFont('helvetica', 'bold').text('Vital Signs:', 14, startY);
    const vitalsLines = [
      `Pulse (per min): ${this.prescriptionForm.get('pulseRate')?.value || ''}`,
      `Respiratory rate (per min): ${this.prescriptionForm.get('respiratoryRate')?.value || ''}`,
      `Blood pressure (mm Hg): ${this.prescriptionForm.get('bloodPressure')?.value || ''}`,
      `Temperature: ${this.prescriptionForm.get('temperature')?.value || ''}`
    ];
    const vitalsHeight = vitalsLines.length * 6;
    checkPageBreak(vitalsHeight);
    doc.setFontSize(10);
    vitalsLines.forEach((line, i) => {
      doc.text(line, 40, startY + i * 6);
    });
    startY += vitalsHeight + 5;

    // --------------------
    // 5. Local Examination
    // --------------------
    const localExam = this.prescriptionForm.get('localExamination')?.value?.trim();
    if (localExam) {
      doc.setFont('helvetica', 'bold').text('Local examination:', 14, startY);
      const localLines = doc.splitTextToSize(`${localExam}`, pageWidth - 28);
      const localHeight = localLines.length * 6;
      checkPageBreak(localHeight);
      doc.setFont('helvetica', 'normal').text(localLines, 50, startY);
      startY += localHeight + 5;
    }


    // --------------------
    // 6. Physical Examination
    // --------------------
    const systemCtrls = (this.prescriptionForm.get('systems') as FormArray).controls;
    const systemStrings = systemCtrls
      .filter(c => (c.value.name || '').trim())
      .map((c, i) => `${i + 1}. ${c.value.name.trim()}: ${c.value.findings || ''}`);
    if (systemStrings.length) {
      doc.setFont('helvetica', 'bold').text('Physical Examination:', 14, startY);
      const sysText = `${systemStrings.join(', ')}`;
      const sysLines = doc.splitTextToSize(sysText, pageWidth - 28);
      const sysHeight = sysLines.length * 6;
      checkPageBreak(sysHeight);
       doc.setFont('helvetica', 'normal').text(sysLines, 50, startY);
      startY += sysHeight + 5;
    }

    // --------------------
    // 7. Provisional Diagnosis
    // --------------------
    const diag = this.prescriptionForm.get('pastHistory')?.value?.trim();
    if (diag) {
      doc.setFont('helvetica', 'bold').text('Provisional Diagnosis:', 14, startY);
      const diagLine = `${diag}`;
      const diagHeight = doc.splitTextToSize(diagLine, pageWidth - 28).length * 6;
      checkPageBreak(diagHeight);
      doc.setFont('helvetica', 'normal').text(diagLine, 55, startY);
      startY += diagHeight + 5;
    }

    // --------------------
    // 8. Investigations
    // --------------------
    if (this.selectedProfiles?.length) {
      doc.setFont('helvetica', 'bold').text('Investigations:', 14, startY);
      const invText = `${this.selectedProfiles.join(', ')}`;
      const invLines = doc.splitTextToSize(invText, pageWidth - 28);
      const invHeight = invLines.length * 6;
      checkPageBreak(invHeight);
      doc.setFont('helvetica', 'normal').text(invLines, 40, startY);
      startY += invHeight + 5;
    }

    // --------------------
    // 9. Prescription (Rx) Table
    // --------------------
    const rxArray = this.prescriptionForm.get('rx') as FormArray;
    const rxBody = rxArray.controls.map((c, i) => [
      i + 1,
      c.value.dosageForm || '',
      c.value.drugName || '',
      c.value.strength || '',
      c.value.times || '',
      c.value.duration || '',
      c.value.instruction || ''
    ]);
    if (rxBody.length) {
      checkPageBreak(10 + rxBody.length * 8);
      doc.setFont('helvetica', 'bold').text('Prescription (Rx):', 14, startY);
      startY += 5;
      (doc as any).autoTable({
        head: [['Sr.', 'Form', 'Drug', 'Strength', 'Freq', 'Dur', 'Instr']],
        body: rxBody,
        startY,
        styles: { font: 'helvetica', fontSize: 8, lineColor: [0, 0, 0], lineWidth: 0.1 },
        headStyles: { fillColor: [255, 255, 255], textColor: [0, 0, 0], fontStyle: 'bold' }
      });
      startY = (doc as any).autoTable.previous.finalY + 5;
    }

    // --------------------
    // 10. Other Instructions & Follow-Up
    // --------------------
    const otherInst = this.prescriptionForm.get('otherInstructions')?.value?.trim();
    if (otherInst) {
      doc.setFont('helvetica', 'bold').text('Other Instructions:', 14, startY);
      const oiLines = doc.splitTextToSize(`${otherInst}`, pageWidth - 28);
      checkPageBreak(oiLines.length * 6);
      doc.setFont('helvetica', 'normal').text(oiLines, 50, startY);
      startY += oiLines.length * 6 + 5;
    }

    const followUp = this.prescriptionForm.get('nextFollowUp')?.value;
    if (followUp) {
      doc.setFont('helvetica', 'bold').text('Next Follow-up:', 14, startY);
      const fuDate = new Date(followUp);
      const fuLine = `${String(fuDate.getDate()).padStart(2, '0')}/${String(fuDate.getMonth() + 1).padStart(2, '0')}/${fuDate.getFullYear()}`;
      checkPageBreak(6);
     doc.setFont('helvetica', 'normal').text(fuLine, 50, startY);
      startY += 20;
    }

    // --------------------
    // 11. Signature Section
    // --------------------
    checkPageBreak(10);
    doc.setFont('helvetica', 'bold').text("Physician's Signature and Stamp", 14, startY);
    startY += 10;

    // Output PDF
    const pdfBlob = doc.output('blob');
    window.open(URL.createObjectURL(pdfBlob), '_blank');
    return pdfBlob;
  }


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
