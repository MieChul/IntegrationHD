import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, BehaviorSubject, Subscription, timer } from 'rxjs';
import { delay, switchMap } from 'rxjs/operators';
import { AuthStateService } from './shared/guards/auth-state.service';
import { LoaderService } from './shared/services/loader.service';
import { InactivityService } from './shared/services/inactivity.service';
import { Ad } from './shared/models/ad.model';
import { CommonService } from './shared/services/common.service';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  isLoading$: Observable<boolean> = this.isLoadingSubject.asObservable();
  selectedAd: Ad | null = null;
  private adTimerSubscription!: Subscription;

  constructor(
    private loaderService: LoaderService,
    private authStateService: AuthStateService,
    private inactivityService: InactivityService,
    private commonService: CommonService
  ) { }

  ngOnInit(): void {
    this.loaderService.isLoading$
      .pipe(delay(0))
      .subscribe((value) => {
        this.isLoadingSubject.next(value);
      });

    this.authStateService.resetOtpVerified();
    this.startAdTimer();
  }

  startAdTimer(): void {
    const adIntervalMs = environment.adDisplayIntervalMinutes * 60 * 1000;
    this.adTimerSubscription = timer(adIntervalMs, adIntervalMs).pipe(
      switchMap(() => this.commonService.getAdvertisements())
    ).subscribe({
      next: (ads) => {
        if (ads.data && ads.data.length > 0) {
          const randomIndex = Math.floor(Math.random() * ads.data.length);
          this.selectedAd = ads.data[randomIndex];
        } else {
          this.selectedAd = null;
        }
      },
      error: (err) => {
        console.error('Failed to load advertisements', err);
        this.selectedAd = null;
      }
    });
  }

  onAdClosed(): void {
    this.selectedAd = null;
  }

  ngOnDestroy(): void {
    if (this.adTimerSubscription) {
      this.adTimerSubscription.unsubscribe();
    }
  }
}

