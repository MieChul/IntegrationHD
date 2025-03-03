import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';
import { PhysicianService } from '../../services/physician.service';
import { AccountService } from '../../services/account.service';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-generate-medical-certificate',
  templateUrl: './generate-medical-certificate.component.html',
  styleUrls: ['./generate-medical-certificate.component.scss']
})
export class GenerateMedicalCertificateComponent implements OnInit {
  medicalForm: FormGroup = new FormGroup({});
  patientRecord: any;
  headerImg: string = '';
  footerImg: string = '';
  userData: any;

  constructor(private fb: FormBuilder, private router: Router, private physicianService: PhysicianService, private accountService: AccountService, private http: HttpClient) {
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
          },
          error: (err) => console.error('Error fetching header/footer:', err),
        });
      },
      error: (err) => console.error('Error fetching user data:', err)
    });
  }

  initializeForm(): void {
    const today = new Date().toISOString().split('T')[0];
    this.medicalForm = this.fb.group({
      useHeader:[true],
      name: [this.patientRecord?.firstName + ' ' + this.patientRecord?.middleName + ' ' + this.patientRecord?.lastName || '', [Validators.required, Validators.maxLength(25)]],
      age: [this.calculateAge(this.patientRecord?.dateOfBirth) || '0', [Validators.required]],
      diagnosis: ['', [Validators.required, Validators.maxLength(200)]],
      treatmentFrom: ['', [this.futureDateValidator, Validators.required]],
      treatmentTo: ['', Validators.required],
      daysRest: [null, [Validators.min(0)]],
      restFromDate: ['', Validators.required],
      fitToResumeFrom: ['', Validators.required],
      identificationMark: ['', [Validators.maxLength(100)]],
      date: [today, Validators.required]
    }, {
      validators: [
        this.dateRangeValidator('treatmentFrom', 'treatmentTo'),
        this.dateRangeValidator('treatmentFrom', 'restFromDate'),
        this.fitToResumeValidator('restFromDate', 'daysRest', 'fitToResumeFrom')
      ]
    });
  }

  fitToResumeValidator(restFrom: string, daysRest: string, fitToResumeFrom: string) {
    return (formGroup: FormGroup) => {
      const restFromControl = formGroup.controls[restFrom];
      const daysRestControl = formGroup.controls[daysRest];
      const fitToResumeFromControl = formGroup.controls[fitToResumeFrom];

      if (!restFromControl.value || !daysRestControl.value || !fitToResumeFromControl.value) {
        return;
      }

      const restFromDate = new Date(restFromControl.value);
      const totalRestDays = parseInt(daysRestControl.value, 10);
      const expectedResumeDate = new Date(restFromDate);
      expectedResumeDate.setDate(expectedResumeDate.getDate() + totalRestDays); // Add rest days

      if (new Date(fitToResumeFromControl.value) < expectedResumeDate) {
        fitToResumeFromControl.setErrors({ invalidResumeDate: true });
      } else {
        fitToResumeFromControl.setErrors(null);
      }
    };
  }

  futureDateValidator(control: any): { [key: string]: boolean } | null {
    const currentDate = new Date();
    if (new Date(control.value) > currentDate) {
      return { futureDate: true };
    }
    return null;
  }


  calculateAge(dateOfBirth: string): number {
    const dob = new Date(dateOfBirth);
    const diff = Date.now() - dob.getTime();
    const ageDate = new Date(diff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  dateRangeValidator(from: string, to: string) {
    return (formGroup: FormGroup) => {
      const fromControl = formGroup.controls[from];
      const toControl = formGroup.controls[to];

      if (toControl.errors && !toControl.errors['dateRange']) {
        return;
      }

      if (fromControl.value && toControl.value && new Date(fromControl.value) > new Date(toControl.value)) {
        toControl.setErrors({ dateRange: true });
      } else {
        toControl.setErrors(null);
      }
    };
  }

  resetForm() {
    this.medicalForm.reset();
  }

  generatePdf() {
    if (this.medicalForm.invalid) {
      return;
    }

    const doc = new jsPDF();
    const margin = 10; // Left and right margin
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const contentWidth = pageWidth - margin; // Available width for text
    let currentY = 30; // Initial Y position

    // Format date to dd/mm/yyyy
    const formatDate = (date: string): string => {
      if (!date) return '';
      const d = new Date(date);
      const day = d.getDate().toString().padStart(2, '0');
      const month = (d.getMonth() + 1).toString().padStart(2, '0');
      const year = d.getFullYear();
      return `${day}/${month}/${year}`;
    };

    // Wrap text and move to the next line if necessary
    const wrapText = (text: string, x: number, y: number): number => {
      const lines = doc.splitTextToSize(text, 150); // Split text within contentWidth
      doc.setFont('helvetica', 'bold'); // Set bold font

      lines.forEach((line: string) => {
        // Render each line and underline it
        doc.text(line, x, y);
        const textWidth = doc.getTextWidth(line); // Calculate line width
        const lineHeight = 2; // Line height for underline
        doc.line(x, y + lineHeight, x + textWidth, y + lineHeight); // Underline
        y += 6; // Increment Y position (line height = 6)
      });

      doc.setFont('helvetica', 'normal'); // Reset to normal font after rendering
      return y; // Return updated Y position
    };

    // Underline and bold specific text
    const underlineBoldText = (text: string, x: number, y: number): void => {
      doc.setFont('helvetica', 'bold');
      doc.text(text, x, y);
      const textWidth = doc.getTextWidth(text);
      const lineHeight = 2;
      doc.line(x, y + lineHeight, x + textWidth, y + lineHeight);
      doc.setFont('helvetica', 'normal'); // Reset to normal font
    };

    doc.setFontSize(12);

    // Title
    doc.setFont('helvetica', 'bold');
    doc.text('MEDICAL CERTIFICATE', pageWidth / 2, currentY, { align: 'center' });
    doc.setFont('helvetica', 'normal');
    currentY += 10;

    // Date
    const formattedDate = formatDate(this.medicalForm.value.date);
    doc.text(`Date:`, margin, currentY);
    underlineBoldText(formattedDate, margin + 20, currentY);
    currentY += 10;

    // Patient Details
    doc.text(`Patient:`, margin, currentY);
    underlineBoldText(this.medicalForm.value.name, margin + 20, currentY);
    currentY += 10;

    // Age and Diagnosis
    doc.text(`Age:`, margin, currentY);
    underlineBoldText(`${this.medicalForm.value.age} Yrs.`, margin + 20, currentY);
    currentY += 10;

    doc.text(`Diagnosis:`, margin, currentY);
    currentY = wrapText(this.medicalForm.value.diagnosis, margin + 20, currentY);

    // Treatment Period
    currentY += 10;
    const treatmentFrom = formatDate(this.medicalForm.value.treatmentFrom);
    const treatmentTo = formatDate(this.medicalForm.value.treatmentTo);
    doc.text(`Was treated as an O.P.D. Patient from:`, margin, currentY);
    underlineBoldText(`${treatmentFrom} To: ${treatmentTo}.`, margin + 75, currentY);
    currentY += 10;

    // Rest Period
    const restFromDate = formatDate(this.medicalForm.value.restFromDate);
    doc.text(`He/She has been advised`, margin, currentY);
    underlineBoldText(`${this.medicalForm.value.daysRest} days rest from ${restFromDate}.`, margin + 50, currentY);
    currentY += 10;

    // Fit to Resume
    const fitToResumeFrom = formatDate(this.medicalForm.value.fitToResumeFrom);
    doc.text(`He/She is fit to resume normal duties / light work from:`, margin, currentY);
    underlineBoldText(fitToResumeFrom, margin + 105, currentY);
    currentY += 10;

    // Identification Mark
    doc.text(`Identification Mark:`, margin, currentY);
    currentY = wrapText(this.medicalForm.value.identificationMark, margin + 37, currentY);

    // Check if there's enough space for signature boxes
    if (currentY + 40 > pageHeight) {
      doc.addPage();
      currentY = margin; // Reset Y position for new page
    }

    // Signature and stamp boxes
    const boxHeight = 30;
    doc.setLineWidth(0.5);
    doc.rect(margin, currentY + 10, contentWidth / 2 - margin / 2, boxHeight); // Patient's Signature Box
    doc.rect(pageWidth / 2 + margin / 2, currentY + 10, contentWidth / 2 - margin / 2, boxHeight); // Doctor's Signature Box
    doc.text(`Patient's Signature`, margin + 2, currentY + 20);
    doc.text(`Doctor's Signature`, pageWidth / 2 + margin + 2, currentY + 20);

    // Add header image
    try {
      if (this.headerImg && this.medicalForm.value.useHeader) {
        doc.addImage(this.headerImg, 'PNG', margin, 10, contentWidth, 20);
      }
    } catch (error) {
      console.error('Error adding header image:', error);
    }

    // Add footer image
    try {
      if (this.footerImg && this.medicalForm.value.useHeader) {
        doc.addImage(
          this.footerImg,
          'PNG',
          margin,
          pageHeight - 40,
          contentWidth,
          20
        );
      }
    } catch (error) {
      console.error('Error adding footer image:', error);
    }

    // Open the PDF in a new window
    const pdfUrl = doc.output('bloburl');
    window.open(pdfUrl, '_blank');
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

  goBack() {
    // Navigate back to the design prescription page
    this.router.navigate(['/physician/patient-record']);
  }
}
