import { Component, OnInit, inject, TemplateRef } from '@angular/core';
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
import { AdminService } from '../../services/admin.service';

@Component({ templateUrl: 'user-list.component.html' })

export class UserListComponent implements OnInit {
    users?: any[];
    filteredUsers?: any[];
    countAll: any;
    countSubmitted: any;
    countApproved: any;
    countRejected: any;
    closeResult = '';


    constructor(private adminService: AdminService, private route: ActivatedRoute,
        private router: Router,) { }

    ngOnInit() {
        this.adminService.getAll()
            .pipe(first())
            .subscribe(users => { this.users = users; this.filterRecords('All'); });
    }

    filterRecords(type: string) {

        this.countAll = this.users?.length;
        this.countSubmitted = this.users?.filter(t => t.status == 'Submitted').length;
        this.countApproved = this.users?.filter(t => t.status == 'Approved').length;
        this.countRejected = this.users?.filter(t => t.status == 'Rejected').length;

        if (type == 'All')
            this.filteredUsers = _.cloneDeep(this.users);
        else if (type == 'Submitted')
            this.filteredUsers = _.cloneDeep(this.users?.filter(t => t.status == 'Submitted'));
        else if (type == 'Approved')
            this.filteredUsers = _.cloneDeep(this.users?.filter(t => t.status == 'Approved'));
        else if (type == 'Rejected')
            this.filteredUsers = _.cloneDeep(this.users?.filter(t => t.status == 'Rejected'));


    }

    titleCaseWord(word: string) {
        if (!word) return word;
        return word[0].toUpperCase() + word.substr(1).toLowerCase();
    }

    userClicked(id: string, role: string) {
        this.router.navigate(['admin/userInfo'],
            {
                state: {
                    id: id,
                    role: role.toLowerCase()
                }
            }
        );
    }
}