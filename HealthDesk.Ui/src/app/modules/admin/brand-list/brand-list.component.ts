import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-brand-library-list',
  templateUrl: './brand-list.component.html',
  styleUrls: ['./brand-list.component.scss']
})
export class BrandLibraryListComponent implements OnInit {
  brandLibraries?: any[];

  constructor(private adminService: AdminService) {}

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
}
