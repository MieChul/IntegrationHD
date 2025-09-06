import { Component, EventEmitter, Input, OnInit, Output, OnDestroy } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { Ad } from '../../models/ad.model';
import { environment } from '../../../../environments/environment';

@Component({
    selector: 'app-ad-overlay',
    templateUrl: './ad-overlay.component.html',
    styleUrls: ['./ad-overlay.component.scss']
})
export class AdOverlayComponent implements OnInit, OnDestroy {
    @Input() ad!: Ad;
    @Output() close = new EventEmitter<void>();

    // 2. Initialize countdown from the environment file
    public countdown = environment.adCloseButtonTimerSeconds;
    public isCloseButtonDisabled = true;
    private timerSubscription!: Subscription;

    ngOnInit(): void {
        // 3. Use the environment value in the timer logic
        const timer$ = interval(1000).pipe(take(environment.adCloseButtonTimerSeconds));

        this.timerSubscription = timer$.subscribe({
            next: () => {
                this.countdown--;
            },
            complete: () => {
                this.isCloseButtonDisabled = false;
            }
        });
    }

    onClose(): void {
        this.close.emit();
    }

    ngOnDestroy(): void {
        if (this.timerSubscription) {
            this.timerSubscription.unsubscribe();
        }
    }
}