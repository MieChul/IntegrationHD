import { Component, OnInit, inject, TemplateRef } from '@angular/core';
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
import { AdminService } from '../../services/admin.service';
import * as XLSX from 'xlsx';

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

    exportToExcel(): void {
        const exportData = this.filteredUsers?.map(user => ({
            '#': user.id || '',
            'Name': user.name || '',
            'Phone/Email': user.contact || '',
            'City': user.city || '',
            'Role': this.titleCaseWord(user.role) || '',
            'Dependant Name': this.titleCaseWord(user.dependentName) || '',
            'Status': user.status || ''
        })) || [];

        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(exportData);

        const wscols = [
            { wch: 5 },  
            { wch: 20 }, 
            { wch: 25 },
            { wch: 15 },
            { wch: 15 }, 
            { wch: 20 }, 
            { wch: 15 }  
        ];

        ws['!cols'] = wscols;

        const range = XLSX.utils.decode_range(ws['!ref'] || 'A1:G1');

        for (let C = range.s.c; C <= range.e.c; ++C) {
            const headerCell = XLSX.utils.encode_cell({ r: range.s.r, c: C });
            if (!ws[headerCell]) continue;

            ws[headerCell].s = {
                font: { bold: true },
                border: {
                    top: { style: 'thin', color: { rgb: '000000' } },
                    bottom: { style: 'thin', color: { rgb: '000000' } },
                    left: { style: 'thin', color: { rgb: '000000' } },
                    right: { style: 'thin', color: { rgb: '000000' } }
                },
                fill: { fgColor: { rgb: 'D3D3D3' } }
            };
        }


        for (let R = range.s.r + 1; R <= range.e.r; ++R) {
            for (let C = range.s.c; C <= range.e.c; ++C) {
                const cell = XLSX.utils.encode_cell({ r: R, c: C });
                if (!ws[cell]) continue;

                ws[cell].s = {
                    border: {
                        top: { style: 'hair', color: { rgb: '000000' } },
                        bottom: { style: 'hair', color: { rgb: '000000' } },
                        left: { style: 'hair', color: { rgb: '000000' } },
                        right: { style: 'hair', color: { rgb: '000000' } }
                    }
                };
            }
        }

        XLSX.utils.book_append_sheet(wb, ws, 'Users');

        const currentDate = new Date().toISOString().slice(0, 10);
        XLSX.writeFile(wb, `Users_${currentDate}.xlsx`);
    }
}