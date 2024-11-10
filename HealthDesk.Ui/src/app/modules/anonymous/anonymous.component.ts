import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-anonymous',
  templateUrl: './anonymous.component.html',
  styleUrls: ['./anonymous.component.scss'] ,
  encapsulation: ViewEncapsulation.None 
})
export class AnonymousComponent {
  showSidebar: boolean = true;

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }
}
