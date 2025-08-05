import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-sidelogo',
    templateUrl: './side-logo.component.html',
    styleUrls: ['./side-nav.component.scss']
})
export class SideLogoComponent implements OnInit {

    constructor(private router: Router) {
    }

    ngOnInit(): void {
    }
}
