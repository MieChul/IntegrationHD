import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Router } from '@angular/router';
import { Tooltip } from 'bootstrap';
import { PhysicianService } from '../../services/physician.service';
import { AccountService } from '../../services/account.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { forkJoin, of } from 'rxjs';
import { switchMap, tap, catchError, map } from 'rxjs/operators';
import { Color } from '@angular-material-components/color-picker';
import { NotificationService } from '../../../shared/services/notification.service';
import { ValidationService } from '../../../shared/services/validator.service';
import { MatMenuTrigger } from '@angular/material/menu';


@Component({
  selector: 'app-customize-prescription',
  templateUrl: './customize-prescription.component.html',
  styleUrls: ['./customize-prescription.component.scss']
})
export class CustomizePrescriptionComponent implements OnInit {
  isPickerOpen = false;
  prescriptionForm!: FormGroup;
  isEditMode: boolean = false;
  prescriptionId: string = '';
  clinics: any[] = [];
  logoPreviewUrl: string | null = null;
  fonts = ['Arial', 'Courier New', 'Georgia', 'Times New Roman', 'Verdana'];
  selectedColor: string = '#ffffff'; // Default color
  userData: any;
  clinicPhoneFontColor: string = '#000000';
  constructor(private route: ActivatedRoute, private router: Router, private physicianService: PhysicianService, private accountService: AccountService,
    private fb: FormBuilder, private notificationService: NotificationService, private validationService: ValidationService) { }

  @ViewChild('pickerTrigger') pickerTrigger!: MatMenuTrigger;
  @ViewChild('colorInput') colorInput!: ElementRef<HTMLInputElement>;

  ngOnInit() {
    this.initializeForm();
    this.loadDataSequentially();

  }

  onColorChange(hex: string, controlName: string): void {
    this.prescriptionForm.patchValue({ [controlName]: hex });
  }

  loadDataSequentially(): void {
    this.accountService
      .getUserData()
      .pipe(
        tap((data) => {
          this.userData = data;
        }),
        switchMap(() => this.route.queryParams),
        switchMap((params) => {
          if (params['id']) {
            this.prescriptionId = params['id'];
            this.isEditMode = true;
            return this.physicianService.loadPrescription(
              this.userData.id,
              this.prescriptionId
            );
          } else if (params['templateId']) {
            this.prescriptionForm.patchValue({
              templateId: params['templateId']
            });
            return of(null); // No prescription to load
          }
          return of(null);
        }),
        tap((prescription) => {
          if (prescription) {
            this.populateForm(prescription.data);
          }
        }),
        switchMap(() =>
          forkJoin([
            this.physicianService.getClinics(this.userData.id).pipe(
              map((response: any) => response.data || []) // Extract `data` property
            ),
            this.physicianService.getUserDetails(this.userData.id).pipe(
              map((response: any) => response.data || []) // Extract `data` property
            ),
          ])
        ),
        tap(([clinics, userDetails]) => {
          this.clinics = clinics;
          this.populateUserDetails(userDetails);
        }),
        catchError((error) => {
          console.error('Error loading data:', error);
          return of(null);
        })
      )
      .subscribe();
  }

  initializeForm(): void {
    this.prescriptionForm = this.fb.group({
      id: [''],
      templateId: 0,
      templateName: ['', [Validators.required, Validators.pattern(/^[A-Za-z0-9 ]+$/)]],
      clinicName: [''],
      clinicNameFontType: ['Arial'],
      clinicNameFontSize: ['medium'],
      clinicNameFontColor: ['#000000'],
      clinicAddress: [
        '',
        [Validators.required, Validators.maxLength(100)],
      ],
      clinicAddressFontType: ['Arial'],
      clinicAddressFontSize: ['medium'],
      clinicAddressFontColor: ['#000000'],
      clinicPhone: [
        '',
        [Validators.required, Validators.pattern('^[6-9][0-9]{9}$')],
      ],
      clinicPhoneFontType: ['Arial'],
      clinicPhoneFontSize: ['medium'],
      clinicPhoneFontColor: ['#000000'],
      physicianName: [
        '',
        [
          Validators.pattern(/^[a-zA-Z0-9.,' ]+$/),
          Validators.maxLength(25),
        ],
      ],
      physicianNameFontType: ['Arial'],
      physicianNameFontSize: ['medium'],
      physicianNameFontColor: ['#000000'],
      clinicTimings: [
        '',
        [Validators.required],
      ],
      clinicTimingsFontType: ['Arial'],
      clinicTimingsFontSize: ['medium'],
      clinicTimingsFontColor: ['#000000'],
      mrcNumber: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9\s.\-\/\\]{2,50}$/)]],
      mrcNumberFontType: ['Arial'],
      mrcNumberFontSize: ['medium'],
      mrcNumberFontColor: ['#000000'],
      qualification: [
        '',
        [
          Validators.pattern(/^[a-zA-Z0-9.,' ]+$/),
          Validators.maxLength(50),
        ],
      ],
      qualificationFontType: ['Arial'],
      qualificationFontSize: ['medium'],
      qualificationFontColor: [new Color(0, 0, 0)],
      footerText: ['', [Validators.maxLength(200)]],
      footerTextFontType: ['Arial'],
      footerTextFontSize: ['medium'],
      footerTextFontColor: [new Color(0, 0, 0)],
      isDefault: [false],
      logoImage: [''],
      headerImage: [''],
      footerImage: ['']
    });
  }

  populateForm(prescription: any): void {
    if (!prescription) return;

    this.logoPreviewUrl = prescription.logoUrl;
    this.prescriptionForm.patchValue({
      id: prescription.id,
      templateId: prescription.templateId,
      templateName: prescription.templateName,
      clinicName: prescription.clinicName,
      clinicNameFontType: prescription.clinicNameFontType,
      clinicNameFontSize: prescription.clinicNameFontSize,
      clinicNameFontColor: prescription.clinicNameFontColor || '#000000',
      clinicAddress: prescription.clinicAddress,
      clinicAddressFontType: prescription.clinicAddressFontType,
      clinicAddressFontSize: prescription.clinicAddressFontSize,
      clinicAddressFontColor: prescription.clinicAddressFontColor || '#000000',
      clinicPhone: prescription.clinicPhone,
      clinicPhoneFontType: prescription.clinicPhoneFontType,
      clinicPhoneFontSize: prescription.clinicPhoneFontSize,
      clinicPhoneFontColor: prescription.clinicPhoneFontColor || '#000000',
      physicianName: prescription.physicianName,
      physicianNameFontType: prescription.physicianNameFontType,
      physicianNameFontSize: prescription.physicianNameFontSize,
      physicianNameFontColor: prescription.physicianNameFontColor || '#000000',
      clinicTimings: prescription.clinicTimings,
      clinicTimingsFontType: prescription.clinicTimingsFontType,
      clinicTimingsFontSize: prescription.clinicTimingsFontSize,
      clinicTimingsFontColor: prescription.clinicTimingsFontColor || '#000000',
      mrcNumber: prescription.mrcNumber,
      mrcNumberFontType: prescription.mrcNumberFontType,
      mrcNumberFontSize: prescription.mrcNumberFontSize,
      mrcNumberFontColor: prescription.mrcNumberFontColor || '#000000',
      qualification: prescription.qualification,
      qualificationFontType: prescription.qualificationFontType,
      qualificationFontSize: prescription.qualificationFontSize,
      qualificationFontColor: prescription.qualificationFontColor || '#000000',
      footerText: prescription.footerText,
      footerTextFontType: prescription.footerTextFontType,
      footerTextFontSize: prescription.footerTextFontSize,
      footerTextFontColor: prescription.footerTextFontColor || '#000000',
      isDefault: prescription.isDefault,
      logoUrl: prescription.logoUrl,
      footerImageUrl: prescription.footerImageUrl,
      headerImageUrl: prescription.headerImageUrl
    });
  }

  populateUserDetails(userDetails: any): void {
    if (this.logoPreviewUrl)
      this.loadImageFromUrl(this.logoPreviewUrl ?? '', 'logo');
    if (!userDetails) return;

    this.prescriptionForm.patchValue({
      clinicPhone: userDetails.phoneNumber,
      physicianName: userDetails.fullName,
      mrcNumber: userDetails.mrcNumber,
    });
  }

  onClinicChange(clinic: any): void {
    if (!clinic) return;

    this.prescriptionForm.patchValue({
      clinicAddress: [
        clinic.flatNumber,
        clinic.building,
        clinic.area,
        clinic.city,
        clinic.state,
        clinic.pinCode
      ].filter(value => value).join(', '),  // Remove null/undefined and join with comma

      clinicTimings: clinic.clinicSlots?.length
        ? `${clinic.clinicSlots
          .map((slot: any) => `${slot.name}: ${slot.timingFrom} to ${slot.timingTo}`)
          .join(', ')} | Days: ${clinic.days?.filter((day: any) => day).join(', ')}`
        : '' // If no slots, set empty string
    });
  }


  onFileChange(event: any, type: string): void {
    const file = event.target.files[0];

    if (!file) return;

    if (!this.validationService.validateImage(file)) {
      return
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (type === 'logo') {
        this.logoPreviewUrl = reader.result as string;
        this.prescriptionForm.patchValue({ logoImage: reader.result });
      }
    };
    reader.readAsDataURL(file);
  }

  triggerFileInput(elementId: string) {
    document.getElementById(elementId)?.click();
  }

  getFontSize(size: string): number {
    switch (size) {
      case 'small':
        return 10;
      case 'medium':
        return 15;
      case 'large':
        return 20;
      default:
        return 15;
    }
  }

  previewHeader(isSave: boolean = false): Promise<void> {
    return new Promise((resolve, reject) => {
      this.prescriptionForm.markAllAsTouched(); // Mark all fields as touched
      if (this.prescriptionForm.invalid) {
        console.error('Form is invalid. Please correct the errors.');
        reject('Form is invalid');
        return;
      }
      const canvasHeader = document.createElement('canvas');
      const canvasFooter = document.createElement('canvas');

      // Set dimensions for both header and footer
      canvasHeader.width = 750;
      canvasHeader.height = 250;
      canvasFooter.width = 750;
      canvasFooter.height = 150;

      const ctxHeader = canvasHeader.getContext('2d');
      const ctxFooter = canvasFooter.getContext('2d');

      if (!ctxHeader || !ctxFooter) {
        console.error('Unable to create canvas context.');
        return;
      }

      // Clear canvases
      ctxHeader.clearRect(0, 0, canvasHeader.width, canvasHeader.height);
      ctxFooter.clearRect(0, 0, canvasFooter.width, canvasFooter.height);

      Promise.all([
        this.drawHeaderTemplate(ctxHeader, this.prescriptionForm.get('templateId')?.value).then(() =>
          this.saveCanvasAsImageHeader(canvasHeader)
        ),
        this.drawFooterTemplate(ctxFooter, this.prescriptionForm.get('footerText')?.value).then(() =>
          this.saveCanvasAsImageFooter(canvasFooter)
        ),
      ])
        .then(() => {
          if (!isSave)
            this.generatePDF({});
          resolve();
        })
        .catch((error) => {
          console.error('Error while generating header/footer:', error);
          reject(error); // Reject the promise on error
        });
    });
  }

  drawFooterTemplate(ctx: CanvasRenderingContext2D, footerText: string): Promise<void> {
    return new Promise((resolve) => {
      ctx.font = `${this.getFontSize(this.prescriptionForm.get('footerTextFontSize')?.value)}px ${this.prescriptionForm.get('footerTextFontType')?.value
        }`;
      ctx.fillStyle = this.prescriptionForm.get('footerTextFontColor')?.value;

      // Calculate the center alignment for the footerText
      const footerTextWidth = ctx.measureText(footerText).width;
      const footerTextX = (750 - footerTextWidth) / 2; // Assuming canvas width is 750px

      // Draw the footerText centered horizontally
      ctx.fillText(footerText, footerTextX, 100); // Centered at y = 100
      resolve();
    });
  }

  drawHeaderTemplate(ctx: CanvasRenderingContext2D, templateType: number): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        ctx.fillStyle = '#FFFFFF';


        // Handle template-specific logic
        switch (Number(templateType)) {
          case 1: // Template 1
            await this.drawLogo(ctx, 10);
            this.drawClinicDetails(ctx, 200);
            this.drawPhysicianDetails(ctx, 550);
            break;

          case 2: // Template 2
            await this.drawLogo(ctx, 350);
            this.drawClinicDetails(ctx, 10);
            this.drawPhysicianDetails(ctx, 550);
            break;

          case 3: // Template 3
            await this.drawLogo(ctx, 550);
            this.drawClinicDetails(ctx, 10);
            this.drawPhysicianDetails(ctx, 350);
            break;

          case 4:
            this.drawClinicDetails(ctx, 10, true);
            this.drawPhysicianDetails(ctx, 500, true);
            break;

          default:
            console.error('Invalid template type');
            break;
        }
        resolve();
      } catch (error) {
        console.error('Error in drawHeaderTemplate:', error);
        reject(error);
      }
    });
  }

  private async drawLogo(ctx: CanvasRenderingContext2D, startX: number, isType4: boolean = false): Promise<void> {

    const storedLogo = this.prescriptionForm.get('logoImage')?.value;
    if (!storedLogo) return;

    const logoImg = new Image();
    await new Promise<void>((resolve, reject) => {
      logoImg.onload = () => {
        if (!isType4)
          ctx.drawImage(logoImg, startX, 20, 120, 100);
        else
          ctx.drawImage(logoImg, startX, 0, 750, 50);
        resolve();
      };
      logoImg.onerror = reject;
      logoImg.src = storedLogo;
    });
  }

  private wrapText(
    ctx: CanvasRenderingContext2D,
    text: string | null | undefined,
    x: number,
    y: number,
    maxWidth: number,
    lineHeight: number,
    maxHeight: number
  ): number {
    if (!text) text = ''; // Ensure text is a string
    const words = text.split(' ');
    let line = '';
    let currentY = y;

    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = ctx.measureText(testLine);
      const testWidth = metrics.width;

      if (testWidth > maxWidth && n > 0) {
        // Render the current line
        ctx.fillText(line.trim(), x, currentY);
        line = words[n] + ' ';
        currentY += lineHeight;

        // Check if the height limit is exceeded
        if (currentY + lineHeight > maxHeight) {
          ctx.fillText(line.trim() + '...', x, currentY);
          return currentY + lineHeight; // Stop rendering further
        }
      } else {
        line = testLine;
      }
    }

    // Render the last line if within the height
    if (currentY + lineHeight <= maxHeight) {
      ctx.fillText(line.trim(), x, currentY);
    } else {
      ctx.fillText(line.trim().substring(0, maxWidth) + '...', x, currentY);
    }

    return currentY + lineHeight; // Return the updated Y position
  }


  drawClinicDetails(ctx: CanvasRenderingContext2D, startX: number, isType4: boolean = false): void {
    const maxWidth = isType4 ? 750 : 350;
    const lineHeight = 20;
    const maxHeight = 250; // Total height available for the header canvas
    const propertySpacing = 10; // Space between properties

    let currentY = isType4 ? 100 : 40;
    // Initial Y position
    if (!isType4) {
      ctx.font = `${this.getFontSize(this.prescriptionForm.get('clinicNameFontSize')?.value)}px ${this.prescriptionForm.get('clinicNameFontType')?.value}`;
      ctx.fillStyle = this.prescriptionForm.get('clinicNameFontColor')?.value;
      currentY = this.wrapText(ctx, this.prescriptionForm.get('clinicName')?.value || '', startX, currentY, maxWidth, lineHeight, maxHeight);
    }
    else {
      ctx.font = `${this.getFontSize(this.prescriptionForm.get('clinicNameFontSize')?.value)}px ${this.prescriptionForm.get('clinicNameFontType')?.value}`;
      ctx.fillStyle = this.prescriptionForm.get('clinicNameFontColor')?.value;
      this.wrapText(ctx, this.prescriptionForm.get('clinicName')?.value || '', 350, 20, maxWidth, lineHeight, maxHeight);
    }

    if (!isType4)
      currentY += propertySpacing; // Add space before the next property
    if (currentY < maxHeight) {
      ctx.font = `${this.getFontSize(this.prescriptionForm.get('clinicAddressFontSize')?.value)}px ${this.prescriptionForm.get('clinicAddressFontType')?.value}`;
      ctx.fillStyle = this.prescriptionForm.get('clinicAddressFontColor')?.value;
      currentY = this.wrapText(ctx, this.prescriptionForm.get('clinicAddress')?.value || '', startX, currentY, maxWidth, lineHeight, maxHeight);
    }

    currentY += propertySpacing; // Add space before the next property
    if (currentY < maxHeight) {
      ctx.font = `${this.getFontSize(this.prescriptionForm.get('clinicPhoneFontSize')?.value)}px ${this.prescriptionForm.get('clinicPhoneFontType')?.value}`;
      ctx.fillStyle = this.prescriptionForm.get('clinicPhoneFontColor')?.value;
      currentY = this.wrapText(ctx, `Phone: ${this.prescriptionForm.get('clinicPhone')?.value || ''}`, startX, currentY, maxWidth, lineHeight, maxHeight);
    }

    currentY += propertySpacing; // Add space before the next property
    if (currentY < maxHeight) {
      ctx.font = `${this.getFontSize(this.prescriptionForm.get('clinicTimingsFontSize')?.value)}px ${this.prescriptionForm.get('clinicTimingsFontType')?.value}`;
      ctx.fillStyle = this.prescriptionForm.get('clinicTimingsFontColor')?.value;
      this.wrapText(ctx, `Timings: ${this.prescriptionForm.get('clinicTimings')?.value || ''}`, startX, currentY, maxWidth, lineHeight, maxHeight);
    }
  }

  drawPhysicianDetails(ctx: CanvasRenderingContext2D, startX: number, isType4: boolean = false): void {
    const maxWidth = isType4 ? 750 : 350;
    const lineHeight = 20;
    const maxHeight = 250; // Total height for the header canvas
    const propertySpacing = 10; // Space between properties

    let currentY = isType4 ? 100 : 40; // Initial Y position

    // Draw Physician Name
    ctx.font = `${this.getFontSize(this.prescriptionForm.get('physicianNameFontSize')?.value)}px ${this.prescriptionForm.get('physicianNameFontType')?.value}`;
    ctx.fillStyle = this.prescriptionForm.get('physicianNameFontColor')?.value;
    currentY = this.wrapText(ctx, this.prescriptionForm.get('physicianName')?.value || '', startX, currentY, maxWidth, lineHeight, maxHeight);

    currentY += propertySpacing; // Add space before the next property
    if (currentY < maxHeight) {
      // Draw Qualification
      ctx.font = `${this.getFontSize(this.prescriptionForm.get('qualificationFontSize')?.value)}px ${this.prescriptionForm.get('qualificationFontType')?.value}`;
      ctx.fillStyle = this.prescriptionForm.get('qualificationFontColor')?.value;
      currentY = this.wrapText(ctx, this.prescriptionForm.get('qualification')?.value || '', startX, currentY, maxWidth, lineHeight, maxHeight);
    }

    currentY += propertySpacing; // Add space before the next property
    if (currentY < maxHeight) {
      // Draw MRC Number
      ctx.font = `${this.getFontSize(this.prescriptionForm.get('mrcNumberFontSize')?.value)}px ${this.prescriptionForm.get('mrcNumberFontType')?.value}`;
      ctx.fillStyle = this.prescriptionForm.get('mrcNumberFontColor')?.value;
      this.wrapText(ctx, `MRC: ${this.prescriptionForm.get('mrcNumber')?.value || ''}`, startX, currentY, maxWidth, lineHeight, maxHeight);
    }
  }

  async saveCanvasAsImageHeader(canvas: HTMLCanvasElement) {
    const dataUrl = canvas.toDataURL('image/png');
    this.prescriptionForm.patchValue({ headerImage: dataUrl }); // Directly patch the form
  }

  async saveCanvasAsImageFooter(canvas: HTMLCanvasElement) {
    const dataUrl = canvas.toDataURL('image/png');
    this.prescriptionForm.patchValue({ footerImage: dataUrl }); // Directly patch the form
  }

  async generatePDF(patientData: any) {
    const doc = new jsPDF('p', 'mm', 'a4');
    const pageHeight = doc.internal.pageSize.height;
    const pageWidth = doc.internal.pageSize.width;
    const headerHeight = 45;
    const footerHeight = 30;
    const marginBottom = 20;
    let startY = 60;
    const headerImageBase64 = this.prescriptionForm.get('headerImage')?.value;
    const footerImageBase64 = this.prescriptionForm.get('footerImage')?.value;
    // Load header and footer images if available


    const loadImage = (src: string): Promise<HTMLImageElement> => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = src;
      });
    };
    const headerImage = headerImageBase64 ? await loadImage(headerImageBase64) : null;
    const footerImage = footerImageBase64 ? await loadImage(footerImageBase64) : null;

    const addHeaderAndFooter = () => {
      // Add header image
      if (headerImage) {
        doc.addImage(headerImage, 'PNG', 10, 10, 190, 30);
      }

      // Add footer image
      if (footerImage) {
        doc.addImage(footerImage, 'PNG', 10, 260, 190, 30);
      }

      doc.setFontSize(7);
      doc.setFont('helvetica');
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

    addHeaderAndFooter(); // Add header and footer to the first page

    doc.setFontSize(10);
    doc.text(`Barcode: `, 14, headerHeight + 10);
    doc.text(`Date:`, pageWidth - 40, headerHeight + 10);
    doc.text(`Patient\'s name:`, 14, headerHeight + 17);
    doc.text(`Age:`, 14, headerHeight + 24);
    doc.text(`Gender:`, 60, headerHeight + 24);
    doc.text(`OPD Registration:`, 14, headerHeight + 31);

    startY = headerHeight + 37;
    // Chief Complaints Table
    checkAndAddNewPage(30);
    doc.text('Chief Complaints:', 14, startY);
    startY += 2;

    const chiefComplaints = patientData.complaints?.map((complaint: any, index: number) => [
      index + 1,
      complaint.text,
      complaint.duration
    ]) || [['', '', '']];

    // Check height for Chief Complaints table
    // Approximate table height
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
        font: 'helvetica',
        fontSize: 8, lineColor: [0, 0, 0], lineWidth: 0.1
      }
    });
    startY = (doc as any).autoTable.previous.finalY + 5;
    checkAndAddNewPage(20);
    doc.setFontSize(10);
    doc.text('Vitals:', 14, startY + 5);
    doc.text(`Pulse (per minute):`, 50, startY);
    doc.text(`Respiratory rate (per minute):`, 50, startY + 5);
    doc.text(`Blood pressure (mm Hg):`, 50, startY + 10);
    doc.text(`Temperature:`, 50, startY + 15);


    startY = startY + 25;
    checkAndAddNewPage(15);
    doc.setFontSize(10);
    doc.text(`Local examination:`, 14, startY);
    doc.text(`Investigations:`, 14, startY + 7);
    startY = startY + 15;
    // Systemic Table
    const systemicData = patientData.systemic?.map((system: any, index: number) => [
      index + 1,
      system.name,
      system.findings
    ]) || [['', '', '']];

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
        font: 'helvetica',
        fontSize: 7, lineColor: [0, 0, 0], lineWidth: 0.1
      },
      startY: startY
    });
    startY = (doc as any).autoTable.previous.finalY + 5;

    checkAndAddNewPage(10);
    doc.setFontSize(10);
    doc.text(`Provisional Diagnosis:`, 14, startY);
    startY = startY + 7;
    checkAndAddNewPage(40);
    // Rx Details Table
    const rxData = patientData.rx?.map((medication: any, index: number) => [
      index + 1,
      medication.dosageForm,
      medication.drugName,
      medication.strength,
      medication.route,
      medication.frequency,
      medication.duration,
      medication.instruction
    ]) || [['', '', '', '', '', '', '', '']];

    doc.text('Rx Details:', 14, startY);
    startY += 2;
    // Approximate height for Rx details
    autoTable(doc, {
      head: [['Sr.', 'Dosage Form', 'Drug Name', 'Strength', 'Route', 'Frequency', 'Duration', 'Instruction']],
      headStyles: {
        fillColor: [255, 255, 255], // Transparent white header (plain)
        textColor: [0, 0, 0],       // Black text color for header
        fontStyle: 'normal'         // Plain font style
      },
      body: rxData,
      styles: {
        font: 'helvetica',
        fontSize: 8, lineColor: [0, 0, 0], lineWidth: 0.1
      },
      startY: startY
    });
    startY = (doc as any).autoTable.previous.finalY + 5;
    checkAndAddNewPage(15);
    doc.setFontSize(10);

    doc.text(`Other Instructions:`, 14, startY);
    doc.text(`Next Follow-up: `, 14, startY + 5);
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
        font: 'helvetica',
        fontSize: 7, lineColor: [0, 0, 0], lineWidth: 0.1
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

    startY = (doc as any).autoTable.previous.finalY + 5;
    doc.setDrawColor(0, 0, 0);  // Set black color
    doc.line(5, startY, 200, startY);  // Draw horizontal line
    // Save PDF
    const pdfOutput = doc.output('blob'); // Get PDF as Blob
    const pdfUrl = URL.createObjectURL(pdfOutput);
    window.open(pdfUrl);
  };


  async blobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob); // Read the blob as data URL (base64)
    });
  }

  onColorSelected(color: any, controlName: string, colorPicker: any): void {
    const hexColor = this.convertColorToHex(color); // Convert color to valid hex
    this.prescriptionForm.patchValue({ [controlName]: hexColor }); // Update form value
    if (colorPicker && colorPicker.close) {
      colorPicker.close(); // Close the color picker
    }
  }

  goBack() {
    // Hide the tooltip by disposing of it
    const tooltipTriggerList = Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.forEach(tooltipTriggerEl => {
      const tooltipInstance = Tooltip.getInstance(tooltipTriggerEl); // Get the tooltip instance
      if (tooltipInstance) {
        tooltipInstance.dispose(); // Dispose of the tooltip
      }
    });

    // Navigate back to the design prescription page
    this.router.navigate(['/physician/design-prescription']);
  }

  async saveDesign(): Promise<void> {
    this.prescriptionForm.markAllAsTouched(); // Mark all fields as touched
    if (this.prescriptionForm.invalid) {
      console.error('Form is invalid. Please correct the errors.');
      return; // Stop execution if the form is invalid
    }
    try {
      await this.previewHeader(true);
      const designData = {
        ...this.prescriptionForm.value,
        clinicNameFontColor: this.convertColorToHex(this.prescriptionForm.get('clinicNameFontColor')?.value),
        clinicAddressFontColor: this.convertColorToHex(this.prescriptionForm.get('clinicAddressFontColor')?.value),
        clinicPhoneFontColor: this.convertColorToHex(this.prescriptionForm.get('clinicPhoneFontColor')?.value),
        clinicTimingsFontColor: this.convertColorToHex(this.prescriptionForm.get('clinicTimingsFontColor')?.value),
        footerTextFontColor: this.convertColorToHex(this.prescriptionForm.get('footerTextFontColor')?.value),
        mrcNumberFontColor: this.convertColorToHex(this.prescriptionForm.get('mrcNumberFontColor')?.value),
        physicianNameFontColor: this.convertColorToHex(this.prescriptionForm.get('physicianNameFontColor')?.value),
        qualificationFontColor: this.convertColorToHex(this.prescriptionForm.get('qualificationFontColor')?.value),
      };
      this.physicianService
        .saveDesignPrescription(this.userData.id, designData)
        .subscribe({
          next: (response) => {
            this.router.navigate(['/physician/design-prescription']);
          },
          error: (err) => console.error('Error saving design prescription:', err),
        });
    } catch (error) {
      console.error('Error during saveDesign:', error);
    }
  }

  private convertColorToHex(color: any): string {
    if (typeof color === 'string') {
      // Return as-is if valid hex
      return color.startsWith('#') ? color : `#${color}`;
    }
    if (typeof color === 'object' && color !== null) {
      const { r, g, b } = color;
      return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;
    }
    return '#000000'; // Default to black
  }

  private loadImageFromUrl(imageUrl: string, type: string): void {
    fetch(imageUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch image.');
        }
        return response.blob();
      })
      .then((blob) => this.blobToBase64(blob)) // Convert the Blob to Base64
      .then((base64) => {
        if (type === 'logo') {
          this.logoPreviewUrl = imageUrl; // Update the preview URL
          this.prescriptionForm.patchValue({ logoImage: base64 }); // Patch Base64 to the form
        }
      })
      .catch((error) => {
        console.error('Error loading image:', error);
      });
  }

  onPickerMenuOpened(colorInput: HTMLInputElement) {
    setTimeout(() => colorInput.click(), 0);
  }
  
  onColorPicked(event: Event, control: string) {
    const hex = (event.target as HTMLInputElement).value;
    this.prescriptionForm.get(control)!.setValue(hex);
  }
  
  closePicker(trigger: MatMenuTrigger) {
    trigger.closeMenu();
  }

}