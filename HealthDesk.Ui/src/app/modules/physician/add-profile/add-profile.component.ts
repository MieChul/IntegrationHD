import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { AccountService } from '../../services/account.service';
import { PhysicianService } from '../../services/physician.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-add-profile',
  templateUrl: './add-profile.component.html',
  styleUrls: ['./add-profile.component.scss']
})
export class AddProfileComponent implements OnInit {
  profilesForm!: FormGroup;
  prescription: any;
  patient: any;
  userData: any;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private accountService: AccountService,
    private physicianService: PhysicianService
  ) { }

  ngOnInit(): void {
    const navigation = this.router.getCurrentNavigation();
    this.prescription = navigation?.extras.state?.['prescription'] ?? null;
    this.patient = navigation?.extras.state?.['patient'] ?? null;

    this.initializeForm();

    this.accountService.getUserData().subscribe({
      next: (data) => {
        this.userData = data;
        this.loadProfiles();
      },
      error: (err) => console.error('Error fetching user data:', err)
    });
  }

  // Initialize the profiles form
  initializeForm(): void {
    this.profilesForm = this.fb.group({
      profiles: this.fb.array([], Validators.required) // At least one profile is required
    });
  }

  // Add a new profile
  addNewProfile(): void {
    const newProfile = this.fb.group({
      id: [''], // New profile starts with an empty id
      name: ['', Validators.required], // Name is required
      investigations: this.fb.array([
        this.createInvestigation() // At least one investigation by default
      ])
    });

    this.profiles.push(newProfile); // Add the new profile to the profiles FormArray
  }

  // Create a new investigation FormGroup
  createInvestigation(): FormGroup {
    return this.fb.group({
      id: [''], // New investigation starts with an empty id
      profileId: [''], // Optional, as it will be populated when saved in the backend
      name: ['', Validators.required] // Name is required
    });
  }

  // Add a new investigation to a specific profile
  addInvestigation(profileIndex: number): void {
    const investigations = this.getInvestigations(profileIndex);
    investigations.push(this.createInvestigation());
  }

  // Get investigations FormArray for a specific profile
  getInvestigations(profileIndex: number): FormArray {
    return this.getProfileGroup(profileIndex).get('investigations') as FormArray;
  }
  // Remove an investigation from a specific profile
  removeInvestigation(profileIndex: number, investigationIndex: number): void {
    const investigations = this.getInvestigations(profileIndex);
    investigations.removeAt(investigationIndex);
  }

  // Remove a profile from the FormArray
  removeProfile(profileIndex: number): void {
    this.profiles.removeAt(profileIndex);
  }

  // Load profiles from the API
  async loadProfiles(): Promise<void> {
    try {
      const profiles: any = (await lastValueFrom(this.physicianService.getProfiles(this.userData.id))) || [];
      if (!Array.isArray(profiles.data)) {
        return;
      }

      profiles.data.forEach((profile: any) => {
        const profileGroup = this.fb.group({
          id: [profile.id],
          name: [profile.name, Validators.required],
          investigations: this.fb.array(
            profile.investigations.map((inv: any) =>
              this.fb.group({
                id: [inv.id],
                profileId: [inv.profileId],
                name: [inv.name, Validators.required],
              })
            ),
            Validators.required
          ),
        });
        this.profiles.push(profileGroup);
      });
    } catch (error) {
      console.error('Error loading profiles:', error);
    }
  }

  // Save all profiles to the API
  async saveProfiles(): Promise<void> {
    if (this.profilesForm.invalid) {
      // Mark all controls as touched to display validation errors
      this.markAllAsTouched(this.profilesForm);
      console.error('Form is invalid. Please fix errors before saving.');
      return;
    }

    const profilesData = this.profilesForm.value.profiles;

    try {
      // Send the entire profiles array to the API
      await this.physicianService.saveProfiles(this.userData.id, profilesData).toPromise();
      console.log('Profiles saved successfully.');
    } catch (error) {
      console.error('Error saving profiles:', error);
    }
  }

  // Navigate back to the prescription screen
  back(): void {
    this.router.navigate(['/physician/generate-prescription'], {
      state: { prescription: this.prescription, patient: this.patient }
    });
  }

  get profiles(): FormArray {
    return this.profilesForm.get('profiles') as FormArray;
  }

  // Utility to cast profile to FormGroup
  getProfileGroup(index: number): FormGroup {
    return this.profiles.at(index) as FormGroup;
  }

  private markAllAsTouched(formGroup: FormGroup | FormArray): void {
    Object.keys(formGroup.controls).forEach((key) => {
      const control = formGroup.get(key);
      if (control instanceof FormGroup || control instanceof FormArray) {
        this.markAllAsTouched(control); // Recursively mark nested controls
      } else {
        control?.markAsTouched();
      }
    });
  }
}
