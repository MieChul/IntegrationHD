import { Component, Input, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Tooltip } from 'bootstrap';
import { filter } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SidebarComponent implements OnInit {
  @Input() showSidebar: boolean = true;
  @Input() navLinks: any[] = [];
  activeUrl: string;
  isCollapsed = false;

  constructor(private router: Router) {
    this.activeUrl = this.router.url;
  }

  ngOnInit(): void {
  //   const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  //   tooltipTriggerList.map(function (tooltipTriggerEl) {
  //     return new Tooltip(tooltipTriggerEl);
  //   });

  //   this.router.events.pipe(
  //     filter(event => event instanceof NavigationEnd)
  //   ).subscribe((event: NavigationEnd) => {
  //     this.activeUrl = event.urlAfterRedirects;
  //   });
  // }

  // isActive(url: string): boolean {
  //   return this.activeUrl === url;
 }

 toggleSidebar(): void {
  this.isCollapsed = !this.isCollapsed;
}
}
