import {
  Component,
  OnInit
} from '@angular/core';
import { AccountService } from '../../services/account.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-hospital-landing',
  templateUrl: './hospital-landing.component.html',
  styleUrls: ['./hospital-landing.component.scss']
})
export class HospitalLandingComponent implements OnInit {
  userData: any = [];
  constructor(private router: Router, private accountService: AccountService) { }

  ngOnInit(): void {
    this.accountService.getUserData().subscribe({
      next: (data) => {
        this.userData = data;
        if (this.userData.status !== 'Approved')
          this.router.navigate(['/account']);
      }
    });
  }
}
