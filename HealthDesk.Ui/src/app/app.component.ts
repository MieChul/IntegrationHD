import { Component, OnInit, NgZone, ChangeDetectorRef } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { AuthStateService } from './shared/guards/auth-state.service';
import { LoaderService } from './shared/services/loader.service';
import { InactivityService } from './shared/services/inactivity.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  isLoading$: Observable<boolean> = this.isLoadingSubject.asObservable();

  constructor(
    private loaderService: LoaderService,
    private authStateService: AuthStateService,
    private inactivityService: InactivityService,
    private cdr: ChangeDetectorRef,
    private zone: NgZone
  ) {}

  ngOnInit(): void {
    // Subscribe to the loader service and safely update the isLoading observable
    this.loaderService.isLoading$.subscribe((value) => {
      this.zone.run(() => {
        this.isLoadingSubject.next(value);
      });
    });

    // Reset OTP verification if needed
    this.authStateService.resetOtpVerified();
  }
}
