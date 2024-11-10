import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-anonymous',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'] ,
  encapsulation: ViewEncapsulation.None 
})
export class AccountComponent {
  showSidebar: boolean = true;

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }
}
