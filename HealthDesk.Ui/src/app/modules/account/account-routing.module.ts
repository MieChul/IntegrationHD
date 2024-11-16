import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OtpVerificationGuard } from '../../shared/guards/otp-verification.guard';
import { AccountComponent } from './account.component';
import { InfoComponent } from './info/info.component';
const routes: Routes = [{
  path: '', component: AccountComponent,
  children: [
    { path: '', component: InfoComponent},
  ]
}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
