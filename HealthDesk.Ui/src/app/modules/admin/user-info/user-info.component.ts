import { Component, OnInit, inject, TemplateRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AccountService } from '../../services/account.service';

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
    comments :any='';
    gender:any;
    commentError : any = false;
    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService
    ) { }   

    ngOnInit() {
        if(history.state.id)
        {
            this.accountService.getById(history.state.id)
            .pipe(first())
            .subscribe(x => {
                this.user =x;
                this.user.role ='physician';
                this.gender = this.user.gender;
                if (this.user.role != 'patient' && this.user.role != 'physician')
                this.tab = 'hosp_info';
              
            });
        }
       else
       this.router.navigateByUrl('admin/');
    }

    ngAfterViewInit() {
        var element = document.getElementById(this.tab);
        element?.classList.add('active');

        var prof =document.getElementById('profImg') as HTMLImageElement;
        prof.src =this.user.profImage;
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
        this.router.navigateByUrl('admin/');
    }

    onSubmit(value: string) {
        this.submitted = true;
        this.updateErrors = false;

        if(value == 'Rejected' && !this.comments)
        {
            this.commentError = true;
            return;
        }

        this.accountService.adminAction(this.user.id, value, this.comments)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.router.navigateByUrl('admin/');
                   this. modalService.dismissAll();
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
    
    view(path:string)
    {
        window.open(path, "_blank");
    }
}