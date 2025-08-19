import { Component, ElementRef, inject, TemplateRef, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../../services/account.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, debounceTime, first, map, Observable, startWith } from 'rxjs';
import { NotificationService } from '../../../shared/services/notification.service';
import { Country, State, City } from 'country-state-city';
import { AuthService } from '../../../shared/services/auth.service';
import { DatabaseService } from '../../../shared/services/database.service';

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
  userData: any;
  fileToUpload!: any;
  url!: any;
  gDoc: any;
  gYearError: any = false;
  gInstituteError: any = false;
  gNameError: any = false;
  gDocError: any = false;
  certificateNumberError: any = false;
  councilError: any = false;
  docError: any = false;
  minDate: Date = new Date(1960, 0, 1);
  emailSameError: boolean = false;
  mobileSameError: boolean = false;
  states: any[] = [];
  cities: any[] = [];
  clinicstates: any[] = [];
  clinicCities: any[] = [];
  councils: any[] = [];
  colleges: any[] = [];
  specialities: any[] = [];
  graduationQualifications: any[] = [];
  postGraduationQialifications: any[] = [];
  superSpecializations: any[] = [];

  specialityFilterCtrl = new FormControl();
  graduationFilterCtrl = new FormControl();
  postGraduationFilterCtrl = new FormControl();
  superSpecializationFilterCtrl = new FormControl();
  councilFilterCtrl = new FormControl();
  collegeFilterCtrl = new FormControl();
  stateFilterCtrl = new FormControl();
  cityFilterCtrl = new FormControl();
  filteredStates = new BehaviorSubject<any[]>([]);
  filteredCities = new BehaviorSubject<any[]>([]);
  clinicStateFilterCtrl = new FormControl();
  clinicCityFilterCtrl = new FormControl();
  filteredClinicStates = new BehaviorSubject<any[]>([]);
  filteredClinicCities = new BehaviorSubject<any[]>([]);
  filteredCouncils!: Observable<string[]>;
  filteredColleges!: Observable<string[]>;
  filteredSpecialities!: Observable<string[]>;
  filteredGraduations!: Observable<string[]>;
  filteredPostGraduations!: Observable<string[]>;
  filteredSuperSpecializaion!: Observable<string[]>;
  yearsList: number[] = [];


  private modalService = inject(NgbModal);
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private notificationService: NotificationService,
    private databaseService: DatabaseService,
    private authService: AuthService
  ) {
  }

  @ViewChild('fileInput') fileInput!: ElementRef;
  @ViewChild('fileInputClinic') fileInputClinic!: ElementRef;

  ngOnInit() {
    const currentYear = new Date().getFullYear();
    for (let year = currentYear; year >= 1900; year--) {
      this.yearsList.push(year);
    }
    this.userData = this.accountService.getUserData().subscribe({
      next: async (data) => {
        this.userData = data; // Assign the result to a variable
        this.initializeUserAndForm();
        this.states = State.getStatesOfCountry('IN');
        this.clinicstates = State.getStatesOfCountry('IN');
        this.filteredStates.next(this.states);
        this.filteredClinicStates.next(this.clinicstates);
        this.councils = await this.databaseService.getCouncils();
        this.colleges = await this.databaseService.getMedicalColleges();
        this.specialities = await this.databaseService.getSpecialities();
        this.graduationQualifications = await this.databaseService.getGraduations();
        this.postGraduationQialifications = await this.databaseService.getPostGraduations();
        this.superSpecializations = await this.databaseService.getSpecializations();

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
              this.clinicCities.filter((city) =>
                city.name.toLowerCase().includes(searchTerm.toLowerCase())
              )
            )
          )
          .subscribe(this.filteredClinicCities);
      },
      error: (error) => {
      }
    });

    this.filteredCouncils = this.councilFilterCtrl.valueChanges.pipe(
      startWith(''),
      map((search) => this.filterOptions(search, this.councils))
    );

    this.filteredColleges = this.collegeFilterCtrl.valueChanges.pipe(
      startWith(''),
      map((search) => this.filterOptions(search, this.colleges))
    );

    this.filteredSpecialities = this.specialityFilterCtrl.valueChanges.pipe(
      startWith(''),
      map((search) => this.filterOptions(search, this.specialities))
    );

    this.filteredGraduations = this.graduationFilterCtrl.valueChanges.pipe(
      startWith(''),
      map((search) => this.filterOptions(search, this.graduationQualifications))
    );
    this.filteredPostGraduations = this.postGraduationFilterCtrl.valueChanges.pipe(
      startWith(''),
      map((search) => this.filterOptions(search, this.postGraduationQialifications))
    );
    this.filteredSuperSpecializaion = this.superSpecializationFilterCtrl.valueChanges.pipe(
      startWith(''),
      map((search) => this.filterOptions(search, this.superSpecializations))
    );

  }

  filterOptions(search: string, options: string[]): string[] {
    const filterValue = search.toLowerCase();
    return options.filter(option => option.toLowerCase().includes(filterValue));
  }


  triggerFileUpload(): void {
    this.fileInput.nativeElement.click();
  }

  triggerFileUploadClinic(): void {
    this.fileInputClinic.nativeElement.click();
  }

  onStateChange(event: any): void {
    const stateCode = event ? event.value : this.form.get('state')?.value;
    if (stateCode) {
      this.cities = City.getCitiesOfState('IN', stateCode);
      this.filteredCities.next(this.cities);// Reset city selection
    } else {
      this.cities = [];
    }
  }

  onClinicStateChange(event: any): void {
    const stateCode = event ? event.value : this.form.get('clinicState')?.value;
    if (stateCode) {
      this.clinicCities = City.getCitiesOfState('IN', stateCode);
      this.filteredClinicCities.next(this.clinicCities);// Reset city selection
    } else {
      this.clinicCities = [];
    }
  }

  initializeUserAndForm() {
    if (this.userData) {

      this.accountService
        .getById(this.userData.id ?? '')
        .pipe(first())
        .subscribe((user) => {
          this.user = user;
          this.user.role = this.userData.role || this.user.role || 'physician';

          if (this.user.role === 'physician' || this.user.role === 'patient') {
            this.tab = 'p_info';
          } else {
            this.tab = 'hosp_info';
          }

          this.initForm();
        });
    }
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      role: [this.user.role],
      username: [this.user.username],
      displayName: [this.user.displayName],
      firstName: [this.user.firstName || ''],
      middleName: [
        this.user.middleName || '',
        [Validators.pattern(/^[a-zA-Z][a-zA-Z '-]{1,25}$/)],
      ],
      lastName: [this.user.lastName || ''],
      gender: [this.user.gender],
      mobile1: [this.user.mobile],
      mobile2: [this.user.mobile2, Validators.pattern('(0|91)?[6-9][0-9]{9}')],
      email1: [this.user.email, Validators.email],
      email2: [this.user.email2, Validators.email],
      aadhar: [this.user.aadhar, Validators.pattern('^[2-9]{1}[0-9]{3}\\s?[0-9]{4}\\s?[0-9]{4}$')],
      pan: [this.user.pan, Validators.pattern('[A-Z]{5}[0-9]{4}[A-Z]{1}')],
      address1: [this.user.address1],
      address2: [this.user.address2],
      city: [this.user.city],
      state: [this.user.state],
      area: [this.user.area],
      pincode: [this.user.pincode],
      noDocConsentProvided: [this.user.noDocConsentProvided],
      graduation: new FormGroup({
        name: new FormControl(this.user.graduation?.name),
        year: new FormControl(this.user.graduation?.year),
        institute: new FormControl(this.user.graduation?.institute),
        document: new FormControl(this.user.graduation?.document)
      }),
      postGraduation: new FormGroup({
        name: new FormControl(this.user.postGraduation?.name),
        year: new FormControl(this.user.postGraduation?.year),
        institute: new FormControl(this.user.postGraduation?.institute),
        document: new FormControl(this.user.postGraduation?.document)
      }),
      superSpecialization: new FormGroup({
        name: new FormControl(this.user.superSpecialization?.name),
        year: new FormControl(this.user.superSpecialization?.year),
        institute: new FormControl(this.user.superSpecialization?.institute),
        document: new FormControl(this.user.superSpecialization?.document)
      }),
      additionalQualification: new FormGroup({
        name: new FormControl(this.user.additionalQualification?.name),
        year: new FormControl(this.user.additionalQualification?.year),
        institute: new FormControl(this.user.additionalQualification?.institute),
        document: new FormControl(this.user.additionalQualification?.document)
      }),
      medicalRegistration: new FormGroup({
        certificateNumber: new FormControl(this.user.medicalRegistration?.certificateNumber, [
          Validators.pattern(/^[a-zA-Z0-9\s.\-\/\\]{2,50}$/), // Allows alphanumeric, spaces, commas, periods, and dashes
        ]),
        councilName: new FormControl(this.user.medicalRegistration?.councilName),
        document: new FormControl(this.user.medicalRegistration?.document)
      }),
      birthDate: [this.user.birthDate],
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
      authEmail: [this.user.email],
      bloodGroup: [this.user.bloodGroup],
      relationId: [this.user.relationId],
      relationship: [this.user.relationship],
      isSave: [],
      profImage: [this.user.profImage || '/assets/defaultProfile.jpg'],
      clinicImage: [this.user.clinicImage || '/assets/defaultProfile.jpg'],
      speciality: [this.user.speciality]
    });

    this.onStateChange(null);
    this.onClinicStateChange(null);
  }

  ngAfterViewChecked() {
    if (this.form) {
      this.updateValidators();
      this.calculateAge();
    }
  }

  updateValidators(): void {
    const isPatientOrPhysician = this.user.role === 'patient' || this.user.role === 'physician';
    const isPhysician = this.user.role === 'physician';
    const isNonPatient = this.user.role !== 'patient';
    const isOtherRoles = this.user.role !== 'patient' && this.user.role !== 'physician';
    const nameValidator = Validators.pattern(/^[a-zA-Z][a-zA-Z .'’-]{1,25}$/);
    // Define control and validation map
    const validationMap: { [key: string]: any } = {
      username: isPatientOrPhysician ? [Validators.required, Validators.pattern(/^[a-zA-Z][a-zA-Z0-9@_ .'’-]{3,25}$/)] : [],
      displayName: isPatientOrPhysician ? [Validators.required, nameValidator] : [],
      firstName: isPatientOrPhysician ? [Validators.required, nameValidator, Validators.minLength(2)] : [],
      lastName: isPatientOrPhysician ? [Validators.required, nameValidator] : [],
      gender: isPatientOrPhysician ? [Validators.required] : [],
      address1: isPatientOrPhysician ? [Validators.required] : [],
      address2: isPatientOrPhysician ? [Validators.required] : [],
      city: isPatientOrPhysician ? [Validators.required] : [],
      state: isPatientOrPhysician ? [Validators.required] : [],
      area: isPatientOrPhysician ? [Validators.required] : [],
      pincode: isPatientOrPhysician ? [Validators.required, Validators.pattern(/^[1-9][0-9]{5}$/)] : [],

      speciality: isPhysician ? [Validators.required] : [],
      clinicName: isPhysician ? [Validators.required, Validators.pattern(/^[a-zA-Z0-9@_ .'’-]{2,26}$/)] : [],
      clinicArea: isNonPatient ? [Validators.required] : [],
      clinicCity: isNonPatient ? [Validators.required] : [],
      clinicState: isNonPatient ? [Validators.required] : [],
      clinicPincode: isNonPatient ? [Validators.required, Validators.pattern(/^[1-9][0-9]{5}$/)] : [],
      orgName: isOtherRoles ? [Validators.required] : [],
      authFirstName: isOtherRoles ? [Validators.required, nameValidator] : [],
      authLastName: isOtherRoles ? [Validators.required, nameValidator] : [],
      authDesignation: isOtherRoles ? [Validators.required] : [],
      authMob: isOtherRoles ? [Validators.required] : [],
      birthDate: isPatientOrPhysician ? [Validators.required, (control: AbstractControl) => this.validateAge(control)] : []
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

  changeTab(tab: string): void {
    this.tab = tab;
  }

  nagivateToRole() {
    this.router.navigateByUrl('account/role');
  }

  reload() {
    window.location.reload();
  }

  onSubmit() {
    this.submitted = true;
    this.form.markAllAsTouched();
    this.errorsFound = false;
    this.updateErrors = false;

    if (this.user.role === 'physician' || this.user.role === 'patient') {
      const mobile2Control = this.form.get('mobile2');
      if (this.form.value.mobile1 && this.form.value.mobile1 === this.form.value.mobile2) {
        mobile2Control?.setErrors({ ...mobile2Control.errors, 'sameAsMobile1': true });
      }

      const email2Control = this.form.get('email2');
      if (this.form.value.email1 && this.form.value.email1 === this.form.value.email2) {
        email2Control?.setErrors({ ...email2Control.errors, 'sameAsEmail1': true });
      }
    }

    //stop here if form is invalid
    if (this.form.invalid) {
      this.errorsFound = true;
      if (this.user.role == 'physician') {
        this.getDocError();
      }
      this.notificationService.showError('There are errors in the submitted application, please fix them and submit again.');
      return;
    }

    if (this.user.role == 'physician') {
      if (this.getDocError())
        return;
    }

    if (!this.form.value.noDocConsentProvided && this.user.role === 'physician') {
      if (!this.form.value.graduation.document) {
        this.gDocError = true;
        this.notificationService.showError('There are errors in the submitted application, please fix them and submit again.');
        return;
      }
      else
        this.gDocError = false;
    }

    if (this.user.role === 'physician' || this.user.role === 'patient') {
      if (this.form.value.mobile1 === this.form.value.mobile2) {
        this.mobileSameError = true;
        this.notificationService.showError('There are errors in the submitted application, please fix them and submit again.');
        return;
      }
      else
        this.mobileSameError = false;

      if (this.form.value.email1 && this.form.value.email1 === this.form.value.email2) {
        this.emailSameError = true;
        this.notificationService.showError('There are errors in the submitted application, please fix them and submit again.');
        return;
      }
      else
        this.emailSameError = false;
    }
    this.form.value.isSave = false;
    this.accountService.registerUserInfo(this.user.id, this.form.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.notificationService.showSuccess('Application has been submitted.');
          if (this.userData.role !== 'physician') {
            this.userData.status = "Approved";
            if (this.userData.role !== 'patient')
              this.router.navigate([`/organization/${this.userData.role}`]);
            else
              this.router.navigate([`/${this.userData.role}`]);
          }
          else {
            this.reload();
            this.userData.status = "Submitted";
          }

        },
        error: error => {
          this.notificationService.showError('There are errors in the submitted application, please fix them and submit again.');
          this.updateErrors = true;
        }
      });
  }

  save() {
    this.errorsFound = false;
    this.updateErrors = false;
    this.submitted = true;
    this.form.markAllAsTouched();
    if (this.userData.status === 'Submitted' || this.userData.status === 'Approved') {
      if (this.user.role === 'physician' || this.user.role === 'patient') {
        const mobile2Control = this.form.get('mobile2');
        if (this.form.value.mobile1 && this.form.value.mobile1 === this.form.value.mobile2) {
          mobile2Control?.setErrors({ ...mobile2Control.errors, 'sameAsMobile1': true });
        }

        const email2Control = this.form.get('email2');
        if (this.form.value.email1 && this.form.value.email1 === this.form.value.email2) {
          email2Control?.setErrors({ ...email2Control.errors, 'sameAsEmail1': true });
        }
      }
    }
    if (this.userData.status === 'Submitted' || this.userData.status === 'Approved') {
      if (this.form.invalid) {
        this.errorsFound = true;

        if (this.user.role == 'physician') {
          this.getDocError();
        }
        this.notificationService.showError('There are errors in the submitted application, please fix them and submit again.');
        return;
      }

      if (this.user.role == 'physician') {
        if (this.getDocError())
          return;
      }

      if (!this.form.value.noDocConsentProvided && this.user.role === 'physician') {
        if (!this.form.value.graduation.document) {
          this.gDocError = true;
          this.notificationService.showError('There are errors in the submitted application, please fix them and submit again.');
          return;
        }
        else
          this.gDocError = false;
      }

      if (this.user.role === 'physician' || this.user.role === 'patient') {
        if (this.form.value.mobile1 === this.form.value.mobile2) {
          this.mobileSameError = true;
          this.notificationService.showError('There are errors in the submitted application, please fix them and submit again.');
          return;
        }
        else
          this.mobileSameError = false;

        if (this.form.value.email1 && this.form.value.email1 === this.form.value.email2) {
          this.emailSameError = true;
          this.notificationService.showError('There are errors in the submitted application, please fix them and submit again.');
          return;
        }
        else
          this.emailSameError = false;
      }
    }

    this.form.value.isSave = true;
    this.accountService.registerUserInfo(this.user.id, this.form.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.userData.status = this.user.status;
          this.notificationService.showSuccess('Application has been saved.');
          this.reload();
        },
        error: error => {
          this.updateErrors = true;
          this.notificationService.showError('Something went wrong, Please try again after sometime.');
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

    if (propName === 'profileImage' || propName === 'clinicImage') {
      // Only image files allowed and size < 1 MB
      isValid = validImageTypes.includes(file.type) && file.size <= 1 * 1024 * 1024; // 1 MB
    } else {
      // Images, PDFs, and DOC files allowed and size < 2 MB
      isValid = validOtherTypes.includes(file.type) && file.size <= 2 * 1024 * 1024; // 2 MB
    }

    if (!isValid) {
      this.updateErrors = true;

      if (propName === 'profileImage') {
        this.notificationService.showError('Invalid file for "Profile Image". Only image files (JPG, PNG, GIF) are allowed, and the size must be less than 1 MB.');
        this.setDefaultImage();
      } else if (propName === 'clinicImage') {
        this.notificationService.showError('Invalid file for "Clinic Image". Only image files (JPG, PNG, GIF) are allowed, and the size must be less than 1 MB.');
        this.setDefaultImage();
      } else {
        this.notificationService.showError(`Invalid file for "${propName}". Only image files (JPG, PNG, GIF), PDFs, or Word documents (DOC, DOCX) are allowed, and the size must be less than 2 MB.`);
      }
      return;
    }

    // If profileImage or clinicImage, preview the image using FileReader
    if (propName === 'profileImage' || propName === 'clinicImage') {
      const reader = new FileReader();
      reader.onload = () => {
        if (propName === 'profileImage') {
          this.form.patchValue({ profImage: reader.result });
        } else if (propName === 'clinicImage') {
          this.form.patchValue({ clinicImage: reader.result });
        }
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
              this.form.patchValue({ graduation: { document: response.fileName } });
              break;
            case 'postGraduation':
              this.form.patchValue({ postGraduation: { document: response.fileName } });
              break;
            case 'superSpecialization':
              this.form.patchValue({ superSpecialization: { document: response.fileName } });
              break;
            case 'additionalQualification':
              this.form.patchValue({ additionalQualification: { document: response.fileName } });
              break;
            case 'medicalRegistration':
              this.form.patchValue({ medicalRegistration: { document: response.fileName } });
              break;
            case 'profileImage':
              this.form.patchValue({ profImage: response.fileName });
              break;
            case 'clinicImage':
              this.form.patchValue({ clinicImage: response.fileName });
              break;
            default:
              console.warn(`Unknown propName: ${propName}`);
          }
        },
        error: (error) => {
          this.updateErrors = true;
          this.notificationService.showError(`Something wrong with the file. Please try again or use a different file format.`);
        }
      });
  }

  view(path: string) {
    window.open(path, "_blank");
  }


  getDocError() {
    var has_error = false;

    if (!this.form.value.noDocConsentProvided && !this.form.value.graduation.name) {
      this.gNameError = true;
      this.notificationService.showError('There are errors in the submitted application, please fix them and submit again.');
      has_error = true;
    }
    else
      this.gNameError = false;


    if (!this.form.value.noDocConsentProvided && !this.form.value.graduation.year) {
      this.gYearError = true;
      this.notificationService.showError('There are errors in the submitted application, please fix them and submit again.');
      has_error = true;
    }
    else
      this.gYearError = false;

    if (!this.form.value.noDocConsentProvided && !this.form.value.graduation.institute) {
      this.gInstituteError = true;
      this.notificationService.showError('There are errors in the submitted application, please fix them and submit again.');
      has_error = true;
    }
    else
      this.gInstituteError = false;

    if (!this.form.value.medicalRegistration.certificateNumber) {
      this.certificateNumberError = true;
      this.notificationService.showError('There are errors in the submitted application, please fix them and submit again.');
      has_error = true;
    }
    else
      this.certificateNumberError = false;

    if (!this.form.value.medicalRegistration.councilName) {
      this.councilError = true;
      this.notificationService.showError('There are errors in the submitted application, please fix them and submit again.');
      has_error = true;
    }
    else
      this.councilError = false;

    if (!this.form.value.medicalRegistration.document) {
      this.docError = true;
      this.notificationService.showError('There are errors in the submitted application, please fix them and submit again.');
      has_error = true;
    }
    else
      this.docError = false

    return has_error;
  }

  validateAge(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return null; // Allow empty values (handled by required validator)

    const birthDate = new Date(control.value); // Directly parse the date
    const today = new Date(); // Get today's date

    let age = today.getFullYear() - birthDate.getFullYear();

    // Check if the birthday has passed in the current year
    const isBirthdayPassed =
      today.getMonth() > birthDate.getMonth() ||
      (today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate());

    if (!isBirthdayPassed) {
      age--; // Adjust if birthday hasn't occurred yet this year
    }

    // Validate if the user must be at least 18 years old (only if dependentId is NOT present)
    if (!this.userData?.dependentId && age < 18) {
      return { minAge: true }; // Validation fails
    }

    return null; // Validation passes
  }

  additionalRows: any[] = [];

  addAdditionalRow() {
    this.additionalRows.push({});
  }

  removeAdditionalRow(index: number) {
    this.additionalRows.splice(index, 1);
  }

}

