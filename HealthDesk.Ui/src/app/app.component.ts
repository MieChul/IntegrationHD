// app.component.ts
import { Component, HostListener, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthStateService } from './shared/guards/auth-state.service';
import { LoaderService } from './shared/services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isLoading: Observable<boolean>;
  showLayout = false;
  navItems: { icon: string; label: string }[] = [];
  constructor(private loaderService: LoaderService, private authStateService: AuthStateService) {
    this.isLoading = this.loaderService.isLoading$;
    this.authStateService.resetOtpVerified();
  }

  ngOnInit(): void {
  }
}
