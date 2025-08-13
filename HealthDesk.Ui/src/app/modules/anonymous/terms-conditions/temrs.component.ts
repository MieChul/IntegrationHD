// src/app/shared/components/terms-modal/terms-modal.component.ts
import { Component, EventEmitter, Input, Output, ViewChild, ElementRef, HostListener } from '@angular/core';

@Component({
    selector: 'app-terms-modal',
    templateUrl: './terms.component.html',
    styleUrls: ['./terms.component.scss']
})
export class TermsModalComponent {
    @Input() isVisible = false;
    @Output() accepted = new EventEmitter<void>();
    @Output() declined = new EventEmitter<void>();

    @ViewChild('scrollContainer') private scrollContainer!: ElementRef;

    isScrolledToBottom = false;
    isAccepted = false;

    onScroll() {
        const element = this.scrollContainer.nativeElement;
        // Check if the user is within a small threshold (e.g., 5px) of the bottom
        const atBottom = Math.abs(element.scrollHeight - element.scrollTop - element.clientHeight) <= 5;
        if (atBottom) {
            this.isScrolledToBottom = true;
        }
    }

    onAccept() {
        if (this.isAccepted && this.isScrolledToBottom) {
            this.accepted.emit();
        }
    }

    onDecline() {
        this.declined.emit();
    }
}
