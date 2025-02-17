import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Router } from '@angular/router';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../../services/account.service';
import { PhysicianService } from '../../services/physician.service';
import { catchError, firstValueFrom, from, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DatabaseService } from '../../../shared/services/database.service';

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
  dosageForms: string[] = [];
  drugNames: string[] = [];
  strengths: string[] = [];
  times: string[] = [];
  durations: string[] = [];
  systemsDd: string[] = [];
  investigationdd: string[] = [];
  signature: string | ArrayBuffer | null = null;
  stamp: string | ArrayBuffer | null = null;
  selectedProfile: string = '';
  profiles: any = [];
  investigations: string[] = [];
  currentTabIndex = 0;
  prescriptionForm: FormGroup = new FormGroup({});
  patientRecord: any;
  headerImg: string = '';
  footerImg: string = '';
  userData: any;

  constructor(private router: Router, private accountService: AccountService, private physicianService: PhysicianService, private http: HttpClient, private fb: FormBuilder, private databaseService: DatabaseService) {
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
            this.headerImg = await this.fetchImageAsBase64(response.data.header);
            this.footerImg = await this.fetchImageAsBase64(response.data.footer);
            //this.dosageForms = await this.databaseService.getForms();
            this.drugNames = await this.databaseService.getDrugs();
            //this.strengths = await this.databaseService.getStrengths();
            this.times = await this.databaseService.getFrequencies();
            this.durations = await this.databaseService.getDurations();
            this.systemsDd = await this.databaseService.getSystems();
            this.investigationdd = await this.databaseService.getInvestigations();
            await this.loadProfiles();
          },
          error: (err) => console.error('Error fetching header/footer:', err),
        });
      },
      error: (err) => console.error('Error fetching user data:', err)
    });
  }

  initializeForm(): void {
    this.prescriptionForm = this.fb.group({
      name: [this.patientRecord?.name || ''],
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
      nextFollowUp: [''],
      useHeader: [true],
      finalInvestigations: this.fb.array([])
    });
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
    const diff = Date.now() - dob.getTime();
    const ageDate = new Date(diff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
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

  async generatePDF() {
    const doc = new jsPDF('p', 'mm', 'a4');
    const pageHeight = doc.internal.pageSize.height;
    const pageWidth = doc.internal.pageSize.width;
    const headerHeight = 45;
    const footerHeight = 30;
    const marginBottom = 20;
    let startY = 60;
    const storedHeader = localStorage.getItem('prescription_header_default');


    const loadImage = (src: string): Promise<HTMLImageElement> => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = src;
      });
    };

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
      doc.setFontSize(6);
      doc.setFont('Times');
      doc.setDrawColor(0, 0, 0);  // Set black color
      doc.line(5, headerHeight, 200, headerHeight);  // Separator after header
      startY = 60;
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
    doc.text(`Date: ${formattedDate || '_________________'}`, pageWidth - 40, headerHeight + 10);

    // General Details Table (Patient Information, Age, OPD)
    const generalDetails = [
      ['Patient\'s name', this.prescriptionForm.get('name')?.value || '', 'OPD registration', this.prescriptionForm.get('opd')?.value || ''],
      ['Age', this.prescriptionForm.get('age')?.value || '', 'Gender', this.prescriptionForm.get('gender')?.value || '']
    ];

    let result = autoTable(doc, {
      startY: startY,
      theme: 'plain',
      styles: {
        font: 'Times',
        fontSize: 6, lineColor: [0, 0, 0], lineWidth: 0.1, cellPadding: { top: 2, right: 5, bottom: 2, left: 5 }
      },
      columnStyles: {
        0: { cellWidth: 30 },  // Column for 'Patient\'s name', 'Age', 'OPD registration'
        1: { cellWidth: 61 }, // Column for patient name value and OPD value
        2: { cellWidth: 30 },  // Column for 'Gender' (hardcoded text)
        3: { cellWidth: 61 }   // Column for gender value (UI-provided)
      },
      body: generalDetails
    });

    startY = (doc as any).autoTable.previous.finalY + 5;

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
    var approxHeight = (chiefComplaints.length * 10) + 6;
    // Check height for Chief Complaints table
    checkAndAddNewPage(approxHeight);
    doc.text('Chief Complaints:', 14, startY);
    startY += 2;

    autoTable(doc, {
      head: [['Sr.', 'Complaint', 'Duration']],
      body: chiefComplaints,
      headStyles: {
        fillColor: [255, 255, 255], // Transparent white header (plain)
        textColor: [0, 0, 0],       // Black text color for header
        fontStyle: 'normal'         // Plain font style
      },
      startY: startY,
      styles: {
        font: 'Times',
        fontSize: 6, lineColor: [0, 0, 0], lineWidth: 0.1
      }
    });
    startY = (doc as any).autoTable.previous.finalY + 5;


    const vitalsInfo = [
      [`Pulse (per minute): ${this.prescriptionForm.get('pulseRate')?.value || ''}`, `Respiratory rate (per minute): ${this.prescriptionForm.get('respiratoryRate')?.value || ''}`],
      [`Blood pressure (mm Hg): ${this.prescriptionForm.get('bloodPressure')?.value.bloodPressure || ''}`, `Temperature: ${this.prescriptionForm.get('temperature')?.value || ''}`]
    ];

    // Approximate height for vitals info
    checkAndAddNewPage(27);
    // Vitals Info Table
    doc.text('Vitals:', 14, startY);
    startY += 2;
    autoTable(doc, {
      startY: startY,
      theme: 'plain',
      styles: {
        font: 'Times',
        fontSize: 6, lineColor: [0, 0, 0], lineWidth: 0.1
      },
      body: vitalsInfo
    });
    startY = (doc as any).autoTable.previous.finalY + 5;

    // Local Examination Table
    const localExamination = [
      [`Local examination`, `${this.prescriptionForm.get('localExamination')?.value || ''}`],
      [`Investigations`, this.prescriptionForm.get('finalInvestigations')?.value?.map((inv: any) => inv.name).join(', ') || ''],
    ];
    checkAndAddNewPage(15);
    doc.text('Local Examination:', 14, startY);
    startY += 2;
    // Approximate height
    autoTable(doc, {
      startY: startY,
      theme: 'plain',
      styles: {
        font: 'Times',
        fontSize: 6, lineColor: [0, 0, 0], lineWidth: 0.1
      },
      columnStyles: {
        0: { cellWidth: 30 },
        1: { cellWidth: 152 }
      },
      body: localExamination
    });

    startY = (doc as any).autoTable.previous.finalY + 5;

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

    var approxHt = (systemicData.length * 10) + 6;
    checkAndAddNewPage(approxHt);
    doc.text('Physical Examination:', 14, startY);
    startY += 2;
    // Approximate height
    autoTable(doc, {
      head: [['Sr.', 'System', 'Findings']],
      body: systemicData,
      headStyles: {
        fillColor: [255, 255, 255], // Transparent white header (plain)
        textColor: [0, 0, 0],       // Black text color for header
        fontStyle: 'normal'         // Plain font style
      },
      styles: {
        font: 'Times',
        fontSize: 6, lineColor: [0, 0, 0], lineWidth: 0.1
      },
      startY: startY
    });

    startY = (doc as any).autoTable.previous.finalY + 5;
    // Diagnosis Table
    const diagnosisData = [
      ['Provisional Diagnosis', `${this.prescriptionForm.get('pastHistory')?.value || ''}`]
    ];
    checkAndAddNewPage(15);
    // Approximate height
    autoTable(doc, {
      body: diagnosisData,
      styles: {
        font: 'Times',
        fontSize: 6, lineColor: [0, 0, 0], lineWidth: 0.1
      },
      startY: startY
    });
    startY = (doc as any).autoTable.previous.finalY + 5;
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

    var approx = (rxData.length * 10) + 6;
    checkAndAddNewPage(approx);
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
        fontSize: 6, lineColor: [0, 0, 0], lineWidth: 0.1
      },
      startY: startY
    });
    startY = (doc as any).autoTable.previous.finalY + 5;

    // Other Instructions Table
    const instructionsData = [
      ['Other Instructions', this.prescriptionForm.get('otherInstructions')?.value || ''],
      ['Next Follow-up', formatDate(this.prescriptionForm.get('nextFollowUp')?.value) || '']
    ];
    checkAndAddNewPage(25);
    // Approximate height
    autoTable(doc, {
      body: instructionsData,
      startY: startY,
      theme: 'plain',
      columnStyles: {
        0: { cellWidth: 30 }, // Hardcoded text
        1: { cellWidth: 152 } // Value from UI
      },
      styles: {
        font: 'Times',
        fontSize: 6, lineColor: [0, 0, 0], lineWidth: 0.1
      }
    });
    startY = (doc as any).autoTable.previous.finalY + 5;
    checkAndAddNewPage(35);
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
    const physicianId = this.userData.id;
    const patientId = this.patientRecord.userId;
    const illness = complaintsArray.controls
      .map(control => control.value.text) // Extract the `text` value from each FormGroup
      .join(', ');

    from(this.physicianService.uploadPrescription({ pdfBlob, physicianId, patientId, illness }))
      .subscribe({
        next: (response: any) => {
          const pdfUrl = URL.createObjectURL(pdfBlob);
          // API returns the generated PDF URL
          window.open(pdfUrl, '_blank'); // Open the PDF in a new tab
          console.log('Prescription generated and opened.');
        },
        error: (error) => {
          console.error('Error uploading prescription:', error);
        },
      });;
  };


  // Trigger on investigation value change
  onInvestigationValueChange(): void {
    this.updateCustomInvestigations(); // Keep custom investigations in sync
  }


  navigateToAddProfile() {
    // Store the current prescription in state
    this.router.navigate(['/physician/add-profile'], { state: { prescription: this.prescriptionForm.value, patient: this.patientRecord } });
  }

  addInvestigation(name: string = ''): void {
    this.finalInvestigationsFormArray.push(
      this.fb.group({
        name: [name, Validators.required], // Add validation if needed
      })
    );
  }

  removeInvestigation(index: number): void {
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

  onProfileSelectionChange(selectedProfiles: any[]): void {
    this.selectedProfiles = selectedProfiles;

    // Clear current investigations in the FormArray
    this.finalInvestigationsFormArray.clear();

    // Add investigations from selected profiles
    for (const profile of this.selectedProfiles) {
      for (const investigation of profile.investigations) {
        this.finalInvestigationsFormArray.push(
          this.fb.group({
            name: [investigation.name, Validators.required], // Add validation as needed
          })
        );
      }
    }

    // Add custom investigations to the FormArray
    for (const customInv of this.customInvestigations) {
      this.finalInvestigationsFormArray.push(
        this.fb.group({
          name: [customInv.name, Validators.required], // Add validation as needed
        })
      );
    }
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

}
