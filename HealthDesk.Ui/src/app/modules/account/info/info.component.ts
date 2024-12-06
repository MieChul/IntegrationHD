import { Component, ElementRef, inject, TemplateRef, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../../services/account.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, debounceTime, first, map, startWith } from 'rxjs';
import { NotificationService } from '../../../shared/services/notification.service';
import { Country, State, City } from 'country-state-city';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrl: '../account.component.scss'
})
export class InfoComponent {
  form!: FormGroup;
  id?: string;
  user: any = {};
  show: any = true;
  birthDate: any;
  age: any;
  tab: any = 'p_info';
  submitted: any = false;
  errorsFound: any = false;
  updateErrorsMessage: any;
  updateErrors: any = false;
  dobError: any = false;
  closeResult: any = '';
  isRejected: any = false;
  isSaved: any = false;
  userData: any;
  fileToUpload!: any;
  url!: any;
  gDoc: any;
  gYearError: any = false;
  gInstituteError: any = false;
  gDocError: any = false;
  minDate: Date = new Date(1960, 0, 1);
  isSubmitted: boolean = false;
  states: any[] = [];
  cities: any[] = [];
  clinicstates: any[] = [];
  clinicities: any[] = [];
  stateFilterCtrl = new FormControl();
  cityFilterCtrl = new FormControl();
  filteredStates = new BehaviorSubject<any[]>([]);
  filteredCities = new BehaviorSubject<any[]>([]);
  clinicStateFilterCtrl = new FormControl();
  clinicCityFilterCtrl = new FormControl();
  filteredClinicStates = new BehaviorSubject<any[]>([]);
  filteredClinicCities = new BehaviorSubject<any[]>([]);
  private modalService = inject(NgbModal);
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private notificationService: NotificationService
  ) {
  }

  @ViewChild('fileInput') fileInput!: ElementRef;

  ngOnInit() {
    this.initializeUserAndForm();
    this.states = State.getStatesOfCountry('IN');
    this.clinicstates = State.getStatesOfCountry('IN');
    this.filteredStates.next(this.states);
    this.filteredClinicStates.next(this.clinicstates);
    this.stateFilterCtrl.valueChanges
      .pipe(
        debounceTime(200),
        startWith(''),
        map((searchTerm) =>
          this.states.filter((state) =>
            state.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
        )
      )
      .subscribe(this.filteredStates);

    this.cityFilterCtrl.valueChanges
      .pipe(
        debounceTime(200),
        startWith(''),
        map((searchTerm) =>
          this.cities.filter((city) =>
            city.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
        )
      )
      .subscribe(this.filteredCities);

      this.clinicStateFilterCtrl.valueChanges
      .pipe(
        debounceTime(200),
        startWith(''),
        map((searchTerm) =>
          this.clinicstates.filter((state) =>
            state.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
        )
      )
      .subscribe(this.filteredClinicStates);

    this.clinicCityFilterCtrl.valueChanges
      .pipe(
        debounceTime(200),
        startWith(''),
        map((searchTerm) =>
          this.clinicities.filter((city) =>
            city.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
        )
      )
      .subscribe(this.filteredClinicCities);

  }

  triggerFileUpload(): void {
    this.fileInput.nativeElement.click();
  }

  onStateChange(event: any): void {
    const stateCode = event? event.value :  this.form.get('state')?.value;
    if (stateCode) {
      this.cities = City.getCitiesOfState('IN', stateCode);
      this.filteredCities.next(this.cities);// Reset city selection
    } else {
      this.cities = [];
    }
  }

  onClinicStateChange(event: any): void {
    const stateCode = event? event.value :  this.form.get('clinicState')?.value;
    if (stateCode) {
      this.clinicities = City.getCitiesOfState('IN', stateCode);
      this.filteredClinicCities.next(this.clinicities);// Reset city selection
    } else {
      this.clinicities = [];
    }
  }

  initializeUserAndForm() {
    this.userData = this.accountService.userValue;
    if (this.userData) {

      this.accountService
        .getById(this.userData.id ?? '')
        .pipe(first())
        .subscribe((user) => {
          this.initializeHospitals(this.user.hospitals || []);
          this.user = user;
          this.user.role = this.user.role || 'physician';
          if (this.user.status === 'Rejected') this.isRejected = true;
          if (this.user.status === 'Saved') this.isSaved = true;
          if (this.user.status === 'Submitted') this.isSubmitted = true;

          if (this.user.role != 'patient' && this.user.role != 'physician')
            this.tab = 'hosp_info';

          this.initForm();

        });
    }
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      displayName: [this.user.displayName],
      firstName: [this.user.firstName || ''],
      middleName: [this.user.middleName || ''],
      lastName: [this.user.lastName || ''],
      gender: [this.user.gender],
      mobile1: [this.user.mobile],
      mobile2: [this.user.mobile2, Validators.pattern('(0|91)?[6-9][0-9]{9}')],
      email1: [this.user.email, Validators.email],
      email2: [this.user.email2, Validators.email],
      aadhar: [this.user.aadhar, Validators.pattern('^[2-9]{1}[0-9]{3}\\s[0-9]{4}\\s[0-9]{4}$')],
      pan: [this.user.pan, Validators.pattern('[A-Z]{5}[0-9]{4}[A-Z]{1}')],
      address1: [this.user.address1],
      address2: [this.user.address2],
      city: [this.user.city],
      state: [this.user.state],
      area: [this.user.area],
      pincode: [this.user.pincode],
      graduation: new FormGroup({
        year: new FormControl(this.user.graduation?.year),
        institute: new FormControl(this.user.graduation?.institute),
        document: new FormControl(this.user.graduation?.document)
      }),
      postGraduation: new FormGroup({
        year: new FormControl(this.user.postGraduation?.year),
        institute: new FormControl(this.user.postGraduation?.institute),
        document: new FormControl(this.user.postGraduation?.document)
      }),
      superSpecialization: new FormGroup({
        year: new FormControl(this.user.superSpecialization?.year),
        institute: new FormControl(this.user.superSpecialization?.institute),
        document: new FormControl(this.user.superSpecialization?.document)
      }),
      additionalQualification: new FormGroup({
        year: new FormControl(this.user.additionalQualification?.year),
        institute: new FormControl(this.user.additionalQualification?.institute),
        document: new FormControl(this.user.additionalQualification?.document)
      }),
      medicalRegistration: new FormGroup({
        certificateNumber: new FormControl(this.user.medicalRegistration?.certificateNumber),
        councilName: new FormControl(this.user.medicalRegistration?.councilName),
        document: new FormControl(this.user.medicalRegistration?.document)
      }),
      birthDate: [this.user.birthDate, Validators.required],
      age: [{ value: 0, disabled: true }],
      dob: [],
      clinicName: [this.user.clinicName],
      clinicAddress1: [this.user.clinicAddress1],
      clinicAddress2: [this.user.clinicAddress2],
      clinicArea: [this.user.clinicArea],
      clinicCity: [this.user.clinicCity],
      clinicState: [this.user.clinicState],
      clinicPincode: [this.user.clinicPincode],
      orgName: [this.user.orgName],
      authFirstName: [this.user.authFirstName],
      authMiddleName: [this.user.authMiddleName],
      authLastName: [this.user.authLastName],
      authDesignation: [this.user.authDesignation],
      authDept: [this.user.authDept],
      landLine: [this.user.landLine],
      authMob: [this.user.authMob],
      authEmail: [this.user.authEmail],
      bloodGroup: [this.user.bloodGroup],
      relationId: [this.user.relationId],
      isSave: [],
      hospitals: this.formBuilder.array([]),
      profImage: [this.user.profImage || '/assets/defaultProfile.jpg']
    });
  }

  ngAfterViewChecked() {
    if (this.form) {
      this.updateValidators();
      this.calculateAge();
      this.onStateChange(null);
    }
  }

  updateValidators(): void {
    const isPatientOrPhysician = this.user.role === 'patient' || this.user.role === 'physician';
    const isPhysician = this.user.role === 'physician';
    const isNonPatient = this.user.role !== 'patient';
    const isOtherRoles = this.user.role !== 'patient' && this.user.role !== 'physician';

    // Define control and validation map
    const validationMap: { [key: string]: any } = {
      displayName: isPatientOrPhysician ? [Validators.required] : [],
      firstName: isPatientOrPhysician ? [Validators.required] : [],
      lastName: isPatientOrPhysician ? [Validators.required] : [],
      gender: isPatientOrPhysician ? [Validators.required] : [],
      address1: isPatientOrPhysician ? [Validators.required] : [],
      address2: isPatientOrPhysician ? [Validators.required] : [],
      city: isPatientOrPhysician ? [Validators.required] : [],
      state: isPatientOrPhysician ? [Validators.required] : [],
      area: isPatientOrPhysician ? [Validators.required] : [],
      pincode: isPatientOrPhysician ? [Validators.required] : [],
      clinicName: isPhysician ? [Validators.required] : [],
      clinicArea: isNonPatient ? [Validators.required] : [],
      clinicCity: isNonPatient ? [Validators.required] : [],
      clinicState: isNonPatient ? [Validators.required] : [],
      clinicPincode: isNonPatient ? [Validators.required] : [],
      orgName: isOtherRoles ? [Validators.required] : [],
      authFirstName: isOtherRoles ? [Validators.required] : [],
      authLastName: isOtherRoles ? [Validators.required] : [],
      authDesignation: isOtherRoles ? [Validators.required] : [],
      authMob: isOtherRoles ? [Validators.required] : [],
    };

    // Apply validations
    Object.entries(validationMap).forEach(([controlName, validators]) => {
      const control = this.form.get(controlName);
      if (control) {
        control.setValidators(validators);
        control.updateValueAndValidity();
      }
    });
  }

  get f() { return this.form.controls; }

  setDefaultImage(): void {
    this.form.get('profImage')?.setValue('/assets/defaultProfile.jpg');
  }

  calculateAge(): void {
    const birthDateValue = this.form.get('birthDate')?.value;

    if (birthDateValue) {
      const today = new Date();
      const birthDate = new Date(birthDateValue);
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();

      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }

      this.form.get('age')?.setValue(age);
    }
  }
  changeTab(tab: string, menuIcon: HTMLElement) {
    var element = document.getElementById(this.tab);
    element?.classList.remove('active');
    this.tab = tab;
    menuIcon.classList.add('active');

  }

  nagivateToRole() {
    this.router.navigateByUrl('account/role');
  }

  reload() {
    window.location.reload();
  }

  onSubmit() {
    this.submitted = true;
    this.errorsFound = false;
    this.updateErrors = false;
    //stop here if form is invalid
    if (this.form.invalid) {
      this.errorsFound = true;

      if (this.user.role == 'physician') {
        if (!this.form.value.graduation.year)
          this.gYearError = true;
        else
          this.gYearError = false;

        if (!this.form.value.graduation.institute)
          this.gInstituteError = true;
        else
          this.gInstituteError = false;
      }

      return;
    }

    if (this.user.role == 'physician') {
      if (!this.form.value.graduation.year) {
        this.gYearError = true;
        return;
      }
      else
        this.gYearError = false;

      if (!this.form.value.graduation.institute) {
        this.gInstituteError = true;
        return;
      }
      else
        this.gInstituteError = false;
    }



    this.form.value.isSave = false;
    this.accountService.registerUserInfo(this.user.id, this.form.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.reload();
        },
        error: error => {
          this.updateErrors = true;
          this.updateErrorsMessage = error;
        }
      });
  }

  save() {
    this.errorsFound = false;
    this.updateErrors = false;

    this.form.value.isSave = true;
    this.accountService.registerUserInfo(this.user.id, this.form.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.isSaved = true;
          this.reload();
          window.alert("Saved!");
        },
        error: error => {
          this.updateErrors = true;
          this.updateErrorsMessage = error;
        }
      });
  }

  open(content: TemplateRef<any>) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      },
    );
  }

  private getDismissReason(reason: any): string {
    switch (reason) {
      case ModalDismissReasons.ESC:
        return 'by pressing ESC';
      case ModalDismissReasons.BACKDROP_CLICK:
        return 'by clicking on a backdrop';
      default:
        return `with: ${reason}`;
    }
  }

  titleCaseWord(word: string) {
    if (!word) return word;
    return word[0].toUpperCase() + word.substr(1).toLowerCase();
  }

  upload(event: any, propName: string) {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];

    if (!file) {
      console.error("No file selected.");
      return;
    }

    // Validation for file type and size
    const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
    const validOtherTypes = [...validImageTypes, 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

    let isValid = false;
    let maxSize = 0;

    if (propName === 'profileImage') {
      // Only image files allowed and size < 1 MB
      isValid = validImageTypes.includes(file.type) && file.size <= 1 * 1024 * 1024; // 1 MB
    } else {
      // Images, PDFs, and DOC files allowed and size < 2 MB
      isValid = validOtherTypes.includes(file.type) && file.size <= 2 * 1024 * 1024; // 2 MB
    }

    if (!isValid) {
      console.error("Invalid file type or size.");
      this.updateErrors = true;

      if (propName === 'profileImage') {
        this.notificationService.showError('Invalid file for "Profile Image". Only image files (JPG, PNG, GIF) are allowed, and the size must be less than 1 MB.');
        this.setDefaultImage();
      } else {
        this.notificationService.showError(`Invalid file for "${propName}". Only image files (JPG, PNG, GIF), PDFs, or Word documents (DOC, DOCX) are allowed, and the size must be less than 2 MB.`);
      }
      return;
    }

    if (propName === 'profileImage') {
      const reader = new FileReader();
      reader.onload = () => {
        this.form.patchValue({ profImage: reader.result });
      };
      reader.readAsDataURL(file);
    }

    const formData = new FormData();
    formData.append('file', file, file.name);
    formData.append('propName', propName);
    formData.append('id', this.user.id);

    this.accountService.uploadFile(formData)
      .pipe(first())
      .subscribe({
        next: (response: any) => {
          switch (propName) {
            case 'graduation':
              this.form.value.graduation.document = response.fileName;
              break;
            case 'postGraduation':
              this.form.value.postGraduation.document = response.fileName;
              break;
            case 'superSpecialization':
              this.form.value.superSpecialization.document = response.fileName;
              break;
            case 'additionalQualification':
              this.form.value.additionalQualification.document = response.fileName;
              break;
            case 'medicalRegistration':
              this.form.value.medicalRegistration.document = response.fileName;
              break;
            case 'profileImage':
              this.form.value.profImage = response.fileName;
              break;
            default:
              console.warn(`Unknown propName: ${propName}`);
          }
        },
        error: (error) => {
          this.updateErrors = true;
          this.updateErrorsMessage = error;
        }
      });
  }

  removeClass(id: string) {
    document.getElementById(id)?.classList.remove("profileImage");
  }

  view(path: string) {
    window.open(path, "_blank");
  }

  get hospitals(): FormArray {
    return this.form.get('hospitals') as FormArray;
  }

  initializeHospitals(hospitals: any[]) {
    hospitals.forEach((hospital) => {
      this.hospitals.push(
        this.formBuilder.group({
          clinicName: [hospital.clinicName, Validators.required],
          clinicAddress1: [hospital.clinicAddress1, Validators.required],
          clinicAddress2: [hospital.clinicAddress2],
          clinicCity: [hospital.clinicCity, Validators.required],
          clinicState: [hospital.clinicState, Validators.required],
          clinicPincode: [hospital.clinicPincode, Validators.required],
        })
      );
    });
  }

  // Add a new hospital
  addHospital() {
    this.hospitals.push(
      this.formBuilder.group({
        clinicName: ['', Validators.required],
        clinicAddress1: ['', Validators.required],
        clinicAddress2: [''],
        clinicCity: ['', Validators.required],
        clinicState: ['', Validators.required],
        clinicPincode: ['', Validators.required],
      })
    );
  }

  removeHospital(index: number) {
    this.hospitals.removeAt(index);
  }

}
