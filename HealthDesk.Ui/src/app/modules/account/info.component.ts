import { Component, OnInit, inject, TemplateRef, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';

// import { AccountService, AlertService } from '@app/_services';

@Component({ templateUrl: 'info.component.html', styleUrls: ['./account.component.scss'] })
export class InfoComponent implements OnInit {
    form!: FormGroup;
    id?: string;
    user: any;
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
    private modalService = inject(NgbModal);
    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        //private accountService: AccountService
    ) { }

    ngOnInit() {
        this.user.role ='physician';
        //this.userData = this.accountService.userValue;
        // if (this.userData?.id) {
        //     this.accountService.getById(this.userData?.id ?? '').pipe(first())
        //         .subscribe(x => {
        //             this.user = x;

        //             if (this.user.status == 'Submitted')
        //                 this.router.navigateByUrl('account/formSubmitted');
        //             else if (this.user.status == 'Rejected') {
        //                 this.isRejected = true;
        //             }
        //             else if (this.user.status == 'Approved') {
        //                 this.router.navigateByUrl(this.user.role + '/dashboard');
        //             }
        //             else if (this.user.status == 'Saved') {
        //                 this.isSaved = true;
        //             }
        //             else if (!this.user.role)
        //                 this.router.navigateByUrl('account/role');

        //             if (this.user.role != 'patient' && this.user.role != 'physician')
        //                 this.tab = 'hosp_info';

                 
        //         });
        // }
        this.form = this.formBuilder.group({
            displayName: [this.user.displayName],
            firstName: [this.user.firstName],
            middleName: [this.user.middleName],
            lastName: [this.user.lastName],
            gender: [this.user.gender],
            mobile1: [this.user.phone],
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
            birthDate: [],
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
            isSave: []
        });
    }

    ngAfterViewInit() {
        this.birthDate = this.user.dob;
        var element = document.getElementById(this.tab);
        element?.classList.add('active');
        var prof = document.getElementById('profImg') as HTMLImageElement;
        prof.src = this.user.profImage;

        if (this.user.role == 'patient' || this.user.role == 'physician') {
            this.form.controls['displayName'].setValidators([Validators.required]);
        } else {
            this.form.controls['displayName'].clearValidators();
        }
        this.form.controls['displayName'].updateValueAndValidity();

        if (this.user.role == 'patient' || this.user.role == 'physician') {
            this.form.controls['firstName'].setValidators([Validators.required]);
        } else {
            this.form.controls['firstName'].clearValidators();
        }
        this.form.controls['firstName'].updateValueAndValidity();

        if (this.user.role == 'patient' || this.user.role == 'physician') {
            this.form.controls['lastName'].setValidators([Validators.required]);
        } else {
            this.form.controls['lastName'].clearValidators();
        }
        this.form.controls['lastName'].updateValueAndValidity();

        if (this.user.role == 'patient' || this.user.role == 'physician') {
            this.form.controls['gender'].setValidators([Validators.required]);
        } else {
            this.form.controls['gender'].clearValidators();
        }
        this.form.controls['gender'].updateValueAndValidity();

        if (this.user.role == 'patient' || this.user.role == 'physician') {
            this.form.controls['address1'].setValidators([Validators.required]);
        } else {
            this.form.controls['address1'].clearValidators();
        }
        this.form.controls['address1'].updateValueAndValidity();

        if (this.user.role == 'patient' || this.user.role == 'physician') {
            this.form.controls['address2'].setValidators([Validators.required]);
        } else {
            this.form.controls['address2'].clearValidators();
        }
        this.form.controls['address2'].updateValueAndValidity();

        if (this.user.role == 'patient' || this.user.role == 'physician') {
            this.form.controls['city'].setValidators([Validators.required]);
        } else {
            this.form.controls['city'].clearValidators();
        }
        this.form.controls['city'].updateValueAndValidity();

        if (this.user.role == 'patient' || this.user.role == 'physician') {
            this.form.controls['state'].setValidators([Validators.required]);
        } else {
            this.form.controls['state'].clearValidators();
        }
        this.form.controls['state'].updateValueAndValidity();

        if (this.user.role == 'patient' || this.user.role == 'physician') {
            this.form.controls['area'].setValidators([Validators.required]);
        } else {
            this.form.controls['area'].clearValidators();
        }
        this.form.controls['area'].updateValueAndValidity();

        if (this.user.role == 'patient' || this.user.role == 'physician') {
            this.form.controls['pincode'].setValidators([Validators.required]);
        } else {
            this.form.controls['pincode'].clearValidators();
        }
        this.form.controls['pincode'].updateValueAndValidity();

        if (this.user.role == 'physician') {
            this.form.controls['clinicName'].setValidators([Validators.required]);
        } else {
            this.form.controls['clinicName'].clearValidators();
        }
        this.form.controls['clinicName'].updateValueAndValidity();

        if (this.user.role != 'patient') {
            this.form.controls['clinicArea'].setValidators([Validators.required]);
        } else {
            this.form.controls['clinicArea'].clearValidators();
        }
        this.form.controls['clinicArea'].updateValueAndValidity();

        if (this.user.role != 'patient') {
            this.form.controls['clinicCity'].setValidators([Validators.required]);
        } else {
            this.form.controls['clinicCity'].clearValidators();
        }
        this.form.controls['clinicCity'].updateValueAndValidity();

        if (this.user.role != 'patient') {
            this.form.controls['clinicState'].setValidators([Validators.required]);
        } else {
            this.form.controls['clinicState'].clearValidators();
        }
        this.form.controls['clinicState'].updateValueAndValidity();

        if (this.user.role != 'patient') {
            this.form.controls['clinicState'].setValidators([Validators.required]);
        } else {
            this.form.controls['clinicState'].clearValidators();
        }
        this.form.controls['clinicState'].updateValueAndValidity();

        if (this.user.role != 'patient') {
            this.form.controls['clinicPincode'].setValidators([Validators.required]);
        } else {
            this.form.controls['clinicPincode'].clearValidators();
        }
        this.form.controls['clinicPincode'].updateValueAndValidity();

        if (this.user.role != 'patient' && this.user.role != 'physician') {
            this.form.controls['orgName'].setValidators([Validators.required]);
        } else {
            this.form.controls['orgName'].clearValidators();
        }
        this.form.controls['orgName'].updateValueAndValidity();

        if (this.user.role != 'patient' && this.user.role != 'physician') {
            this.form.controls['authFirstName'].setValidators([Validators.required]);
        } else {
            this.form.controls['authFirstName'].clearValidators();
        }
        this.form.controls['authFirstName'].updateValueAndValidity();

        if (this.user.role != 'patient' && this.user.role != 'physician') {
            this.form.controls['authLastName'].setValidators([Validators.required]);
        } else {
            this.form.controls['authLastName'].clearValidators();
        }
        this.form.controls['authLastName'].updateValueAndValidity();

        if (this.user.role != 'patient' && this.user.role != 'physician') {
            this.form.controls['authDesignation'].setValidators([Validators.required]);
        } else {
            this.form.controls['authDesignation'].clearValidators();
        }
        this.form.controls['authDesignation'].updateValueAndValidity();

        if (this.user.role != 'patient' && this.user.role != 'physician') {
            this.form.controls['authMob'].setValidators([Validators.required]);
        } else {
            this.form.controls['authMob'].clearValidators();
        }
        this.form.controls['authMob'].updateValueAndValidity();
    }

    getControl(controlName: string) {
        return this.form.get(controlName);
      }
    

    removeClass(id: string) {
        document.getElementById(id)?.classList.remove("profileImage");
    }

    calculateAge() {
        let date = this.birthDate.year + '-' + this.birthDate.month + '-' + this.birthDate.day;
        let timeDiff = Math.abs(Date.now() - new Date(date).getTime());
        this.age = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365.25);
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

    // onSubmit() {
    //     this.submitted = true;
    //     this.errorsFound = false;
    //     this.updateErrors = false;
    //     //stop here if form is invalid
    //     if (this.form.invalid) {
    //         this.errorsFound = true;
    //         if (!this.birthDate && (this.user.role == 'patient' || this.user.role == 'physician'))
    //             this.dobError = true;
    //         else
    //             this.dobError = false;

    //         if (this.user.role == 'physician') {
    //             if (!this.form.value.graduation.year)
    //                 this.gYearError = true;
    //             else
    //                 this.gYearError = false;

    //             if (!this.form.value.graduation.institute)
    //                 this.gInstituteError = true;
    //             else
    //                 this.gInstituteError = false;
    //             if (!this.form.value.graduation.document)
    //                 this.gDocError = true;
    //             else
    //                 this.gDocError = false;
    //         }

    //         return;
    //     }

    //     if (!this.birthDate && (this.user.role == 'patient' || this.user.role == 'physician')) {
    //         this.dobError = true;
    //         return;
    //     }
    //     else
    //         this.dobError = false;

    //     if (this.user.role == 'physician') {
    //         if (!this.form.value.graduation.year) {
    //             this.gYearError = true;
    //             return;
    //         }
    //         else
    //             this.gYearError = false;

    //         if (!this.form.value.graduation.institute) {
    //             this.gInstituteError = true;
    //             return;
    //         }
    //         else
    //             this.gInstituteError = false;

    //         if (!this.form.value.graduation.document) {
    //             this.gDocError = true;
    //             return;
    //         }
    //         else
    //             this.gDocError = false;
    //     }




    //     if (this.user.role == 'patient' || this.user.role == 'physician') {
    //         this.form.value.dob = this.birthDate;
    //         let date = this.birthDate.year + '-' + this.birthDate.month + '-' + this.birthDate.day
    //         this.form.value.birthDate = date;
    //     }

    //     this.form.value.isSave = false;
    //     this.accountService.registerUserInfo(this.user.id, this.form.value)
    //         .pipe(first())
    //         .subscribe({
    //             next: () => {
    //                 this.router.navigateByUrl('account/formSubmitted');
    //             },
    //             error: error => {
    //                 this.updateErrors = true;
    //                 this.updateErrorsMessage = error;
    //             }
    //         });
    // }

    // save() {
    //     this.errorsFound = false;
    //     this.updateErrors = false;

    //     if ((this.user.role == 'patient' || this.user.role == 'physician') && this.birthDate) {
    //         this.form.value.dob = this.birthDate;
    //         let date = this.birthDate.year + '-' + this.birthDate.month + '-' + this.birthDate.day
    //         this.form.value.birthDate = date;
    //     }
    //     this.form.value.isSave = true;
    //     this.accountService.registerUserInfo(this.user.id, this.form.value)
    //         .pipe(first())
    //         .subscribe({
    //             next: () => {
    //                 this.isSaved = true;
    //                 window.alert("Saved!");
    //             },
    //             error: error => {
    //                 this.updateErrors = true;
    //                 this.updateErrorsMessage = error;
    //             }
    //         });
    // }

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
        this.gDoc = target.files as FileList;

        const formData = new FormData();

        formData.append('file', this.gDoc[0], this.gDoc[0].name);
        formData.append('propName', propName);
        formData.append('id', this.user.id);
        // this.accountService.uploadFile(formData)
        //     .pipe(first())
        //     .subscribe({
        //         next: (response: any) => {

        //             if (propName == 'graduation')
        //                 this.form.value.graduation.document = response.fileName;
        //             if (propName == 'postGraduation')
        //                 this.form.value.postGraduation.document = response.fileName;
        //             if (propName == 'superSpecialization')
        //                 this.form.value.superSpecialization.document = response.fileName;
        //             if (propName == 'additionalQualification')
        //                 this.form.value.additionalQualification.document = response.fileName;
        //             if (propName == 'medicalRegistration')
        //                 this.form.value.medicalRegistration.document = response.fileName;
                       

        //         },
        //         error: error => {
        //             this.updateErrors = true;
        //             this.updateErrorsMessage = error;
        //         }
        //     });
    }

    view(path: string) {
        window.open(path, "_blank");
    }
}