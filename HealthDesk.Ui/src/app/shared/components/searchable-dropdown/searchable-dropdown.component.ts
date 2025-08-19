import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  ElementRef,
  ViewChild,
  ViewContainerRef,
  OnDestroy,
  TemplateRef
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-searchable-dropdown',
  templateUrl: './searchable-dropdown.component.html',
  styleUrls: ['./searchable-dropdown.component.scss']
})
export class SearchableDropdownComponent implements OnChanges, OnDestroy {
  // --- Component Inputs/Outputs ---
  @Input() items: string[] = [];
  @Input() selectedValue: string | null = null;
  @Input() placeholder: string = 'Search...';
  @Input() label: string = 'Select an option';
  @Input() disabled: boolean = false;
  @Output() selectionChange = new EventEmitter<string>();

  // --- Template References ---
  // Reference to the button that triggers the dropdown
  @ViewChild('dropdownButton') dropdownButton!: ElementRef;
  // Reference to the ng-template that holds the dropdown's content
  @ViewChild('dropdownTemplate') dropdownTemplate!: TemplateRef<any>;

  // --- Internal State & Form Controls ---
  filteredItems: string[] = [];
  searchControl = new FormControl('');
  showDropdown = false; // Tracks the logical state (open/closed)

  // --- CDK Overlay Properties ---
  private overlayRef: OverlayRef | null = null;
  private subscription = new Subscription();

  constructor(
    private overlay: Overlay,
    private viewContainerRef: ViewContainerRef
  ) {
    // Filter items based on search input
    this.subscription.add(
      this.searchControl.valueChanges.subscribe(value => {
        this.filterItems(value || '');
      })
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['items'] && this.items) {
      this.filterItems('');

      if (this.items.length === 1 && this.selectedValue !== this.items[0]) {
        this.selectItem(this.items[0]);
      }
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.destroyOverlay();
  }

  filterItems(searchTerm: string): void {
    if (!searchTerm) {
      this.filteredItems = [...this.items];
    } else {
      const lowerCaseSearch = searchTerm.toLowerCase();
      this.filteredItems = this.items.filter(item =>
        item.toLowerCase().includes(lowerCaseSearch)
      );
    }
  }

  // --- Item Selection Logic ---
  selectItem(item: string): void {
    this.selectedValue = item;
    this.selectionChange.emit(item);
    this.closeDropdown(); // Close the dropdown after an item is selected
  }

  // --- Dropdown Toggle & Overlay Management ---
  toggleDropdown(): void {
    if (this.disabled) {
      return;
    }
    this.showDropdown = !this.showDropdown;

    if (this.showDropdown) {
      this.openDropdown();
    } else {
      this.closeDropdown();
    }
  }

  openDropdown(): void {
    if (this.overlayRef) {
      return; // Already open
    }

    // Define the positioning strategy for the overlay
    const positionStrategy = this.overlay.position()
      .flexibleConnectedTo(this.dropdownButton.nativeElement)
      .withPositions([
        { // Primary position: below the button
          originX: 'start',
          originY: 'bottom',
          overlayX: 'start',
          overlayY: 'top',
          offsetY: 4,
        },
        { // Fallback position: above the button
          originX: 'start',
          originY: 'top',
          overlayX: 'start',
          overlayY: 'bottom',
          offsetY: -4,
        }
      ])
      .withDefaultOffsetX(0);

    // Create the overlay
    this.overlayRef = this.overlay.create({
      positionStrategy,
      hasBackdrop: true, // Create a transparent backdrop
      backdropClass: 'cdk-overlay-transparent-backdrop', // Allows clicks to pass through if needed, but we use it for closing
      width: this.dropdownButton.nativeElement.offsetWidth // Match the width of the button
    });

    // When the backdrop is clicked, close the dropdown
    this.subscription.add(
      this.overlayRef.backdropClick().pipe(take(1)).subscribe(() => {
        this.closeDropdown();
      })
    );

    // Attach the ng-template to the overlay
    const portal = new TemplatePortal(this.dropdownTemplate, this.viewContainerRef);
    this.overlayRef.attach(portal);
  }

  closeDropdown(): void {
    this.destroyOverlay();
    this.showDropdown = false; // Update state
    // Reset search field when closing
    this.filterItems('');
    this.searchControl.setValue('');
  }

  private destroyOverlay(): void {
    if (this.overlayRef) {
      this.overlayRef.dispose();
      this.overlayRef = null;
    }
  }
}
