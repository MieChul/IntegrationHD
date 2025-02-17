import { Component, OnInit, inject, TemplateRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../../shared/services/auth.service';
import { AccountService } from '../../services/account.service';
import { AdminService } from '../../services/admin.service';
export enum Role {
    physician = 1,
    patient = 2,
    admin = 3,
    hospital = 4,
    laboratory = 5,
    pharmaceutical = 6,
    pharmacy = 7
}

@Component({ templateUrl: 'user-info.component.html' })

export class UserInfoComponent implements OnInit {
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
    private modalService = inject(NgbModal);
    closeResult = '';
    comments: any = '';
    gender: any;
    commentError: any = false;
    roleStatus:any;
    selectedAction: string = '';

    constructor(
        private router: Router,
        private accountService: AccountService,
        private adminService: AdminService) { }

    ngOnInit() {
        if (history.state.id) {
            this.accountService.getById(history.state.id)
                .pipe(first())
                .subscribe(x => {
                    this.user = x;
                    this.user.role = history.state.role;
                    this.roleStatus = this.getRoleStatus(history.state.role);
                    this.gender = this.user.gender;
                    if (this.user.role != 'patient' && this.user.role != 'physician')
                        this.tab = 'hosp_info';

                });
        }
        else {
            this.router.navigateByUrl('/admin');
        }

    }

    getRoleStatus(role: any): string | null {
        // Convert role name string to Enum key (if it exists)
        const roleKey = role as keyof typeof Role;

        if (!roleKey || !(roleKey in Role)) {
            console.error(`Invalid role: ${role}`);
            return null;
        }

        // Get role ID from Enum
        const roleId = Role[roleKey];

        // Find the role in user.roles
        const matchingRole = this.user.roles.find((r: any) => r.role === roleId);

        // Return status if found, otherwise return null
        return matchingRole ? matchingRole.status : null;
    }

    ngAfterViewInit() {
        var element = document.getElementById(this.tab);
        element?.classList.add('active');

        var prof = document.getElementById('profImg') as HTMLImageElement;
        prof.src = this.user.profImage;
        this.calculateAge();
    }

    changeTab(tab: string, menuIcon: HTMLElement) {
        var element = document.getElementById(this.tab);
        element?.classList.remove('active');
        this.tab = tab;
        menuIcon.classList.add('active');

    }


    calculateAge(): void {
        const birthDateValue = this.user.birthDate;

        if (birthDateValue) {
            const today = new Date();
            const birthDate = new Date(birthDateValue);
            let age = today.getFullYear() - birthDate.getFullYear();
            const monthDiff = today.getMonth() - birthDate.getMonth();

            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }

            this.age = age;
        }
    }

    back() {
        this.router.navigateByUrl('/admin');
    }

    onSubmit(action?: string) {
        this.submitted = true;
        this.updateErrors = false;
        if (action) {
            this.selectedAction = action;
        }

        if ((this.selectedAction == 'Rejected' || this.selectedAction == 'Blocked') && !this.comments) {
            this.commentError = true;
            return;
        }

        this.adminService.adminAction(this.user.id, this.user.role, this.selectedAction, this.comments)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.router.navigateByUrl('/admin');
                    this.modalService.dismissAll();
                },
                error: error => {
                    this.updateErrors = true;
                    this.updateErrorsMessage = error;
                }
            });
    }


    open(content: TemplateRef<any>, action: string) {
        this.selectedAction = action; 
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

    view(path: string) {
        window.open(path, "_blank");
    }
}