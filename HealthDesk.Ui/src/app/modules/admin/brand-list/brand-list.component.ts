import { Component, OnInit, OnDestroy } from '@angular/core';
import { first } from 'rxjs/operators';
import { AdminService } from '../../services/admin.service';
import * as XLSX from 'xlsx';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as bootstrap from 'bootstrap';
import { BrandApprovalPayload } from '../../../shared/models/admin';

@Component({
  selector: 'app-brand-library-list',
  templateUrl: './brand-list.component.html',
  styleUrls: ['./brand-list.component.scss']
})
export class BrandLibraryListComponent implements OnInit, OnDestroy {
  brandLibraries?: any[];
  selectedBrand: any = null;
  isApproving: boolean = false;
  rejectionForm: FormGroup;
  submitted = false;

  private approvalModal: bootstrap.Modal | undefined;
  private rejectionModal: bootstrap.Modal | undefined;

  constructor(
    private adminService: AdminService,
    private fb: FormBuilder
  ) {
    this.rejectionForm = this.fb.group({
      comment: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadBrands();
  }

  ngAfterViewInit(): void {
    this.approvalModal = new bootstrap.Modal(document.getElementById('approvalConfirmationModal')!);
    this.rejectionModal = new bootstrap.Modal(document.getElementById('rejectionConfirmationModal')!);
  }

  ngOnDestroy(): void {
    this.approvalModal?.dispose();
    this.rejectionModal?.dispose();
  }

  loadBrands(): void {
    this.adminService
      .getAllBrands()
      .pipe(first())
      .subscribe({
        next: (list) => (this.brandLibraries = list),
        error: (err) => {
          console.error('Failed to load brand libraries', err);
          this.brandLibraries = [];
        }
      });
  }

  openApprovalModal(brand: any): void {
    this.selectedBrand = brand;
    this.isApproving = true;
    this.submitted = false; // Reset submission state
    this.approvalModal?.show();
  }

  openRejectionModal(brand: any): void {
    this.selectedBrand = brand;
    this.isApproving = false;
    this.submitted = false; // Reset submission state
    this.rejectionForm.reset(); // Clear previous comments
    this.rejectionModal?.show();
  }

  confirmAction(): void {
    this.submitted = true;

    if (!this.selectedBrand) return;

    let payload: BrandApprovalPayload;

    if (this.isApproving) {
      payload = {
        brandId: this.selectedBrand.Id,
        approved: true,
        comment: ''
      };
    } else {
      this.rejectionForm.markAllAsTouched();
      if (this.rejectionForm.invalid) {
        return;
      }
      payload = {
        brandId: this.selectedBrand.Id,
        approved: false,
        comment: this.rejectionForm.value.comment
      };
    }

    this.adminService.approveRejectBrand(this.selectedBrand.PharmaId, payload)
      .pipe(first())
      .subscribe({
        next: () => {
          console.log('Brand status updated successfully');
          if (this.isApproving) {
            this.approvalModal?.hide();
          } else {
            this.rejectionModal?.hide();
          }
          this.loadBrands();
        },
        error: (err) => console.error('Failed to update brand status', err)
      });
  }

  exportToExcel(): void {
    const exportData = this.brandLibraries?.map(brand => ({
      '#': brand.Id || '',
      'Brand Name': brand.BrandName || '',
      'Generic Name': brand.GenericName || '',
      'Drug Class': brand.DrugClass || '',
      'Dosage Form': brand.DosageForm || '',
      'Strength': brand.Strength || '',
      'Approval Agency': brand.ApprovalAgency || '',
      'Submitted By': brand.SubmittedBy || '',
      'Status': brand.IsApproved ? 'Approved' : (brand.IsRejected ? 'Rejected' : 'Pending'),
      'Comment': brand.Comment || ''
    })) || [];

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(exportData);

    const wscols = [
      { wch: 5 },
      { wch: 20 },
      { wch: 25 },
      { wch: 15 },
      { wch: 15 },
      { wch: 20 },
      { wch: 15 },
      { wch: 15 },
      { wch: 15 },
      { wch: 30 }
    ];
    
    ws['!cols'] = wscols;

    const range = XLSX.utils.decode_range(ws['!ref'] || 'A1:G1');

    for (let C = range.s.c; C <= range.e.c; ++C) {
      const headerCell = XLSX.utils.encode_cell({ r: range.s.r, c: C });
      if (!ws[headerCell]) continue;

      ws[headerCell].s = {
        font: { bold: true },
        border: {
          top: { style: 'thin', color: { rgb: '000000' } },
          bottom: { style: 'thin', color: { rgb: '000000' } },
          left: { style: 'thin', color: { rgb: '000000' } },
          right: { style: 'thin', color: { rgb: '000000' } }
        },
        fill: { fgColor: { rgb: 'D3D3D3' } }
      };
    }


    for (let R = range.s.r + 1; R <= range.e.r; ++R) {
      for (let C = range.s.c; C <= range.e.c; ++C) {
        const cell = XLSX.utils.encode_cell({ r: R, c: C });
        if (!ws[cell]) continue;

        ws[cell].s = {
          border: {
            top: { style: 'hair', color: { rgb: '000000' } },
            bottom: { style: 'hair', color: { rgb: '000000' } },
            left: { style: 'hair', color: { rgb: '000000' } },
            right: { style: 'hair', color: { rgb: '000000' } }
          }
        };
      }
    }

    XLSX.utils.book_append_sheet(wb, ws, 'Users');

    const currentDate = new Date().toISOString().slice(0, 10);
    XLSX.writeFile(wb, `Brands_${currentDate}.xlsx`);
  }


  titleCaseWord(word: string) {
    if (!word) return word;
    return word[0].toUpperCase() + word.substr(1).toLowerCase();
  }
}
