import { Component, OnInit, NgZone, ChangeDetectorRef } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { delay } from 'rxjs/operators';
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
    private inactivityService: InactivityService
  ) { }

  ngOnInit(): void {
    this.loaderService.isLoading$
      .pipe(delay(0))
      .subscribe((value) => {
        this.isLoadingSubject.next(value);
      });

    this.authStateService.resetOtpVerified();
  }
}
