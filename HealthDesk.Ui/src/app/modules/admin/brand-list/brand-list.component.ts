import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { AdminService } from '../../services/admin.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-brand-library-list',
  templateUrl: './brand-list.component.html',
  styleUrls: ['./brand-list.component.scss']
})
export class BrandLibraryListComponent implements OnInit {
  brandLibraries?: any[];

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    // fetch all brand‐library entries
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

  exportToExcel(): void {
    const exportData = this.brandLibraries?.map(brand => ({
      '#': brand.id || '',
      'Brand Name': brand.BrandName || '',
      'Generic Name': brand.GenericName || '',
      'Drug Class': brand.DrugClass || '',
      'Dosage Form': brand.DosageForm || '',
      'Strengtth': brand.Strength || '',
      'Approval Agency': brand.ApprovalAgency || '',
      'Submitted By': brand.SubmittedBy || ''

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
       { wch: 15 }
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
