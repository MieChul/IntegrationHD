import { NgModule } from '@angular/core';
import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './account.component';
import { SharedModule } from '../../shared/shared.module';
import { InfoComponent } from './info/info.component';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    InfoComponent,
    AccountComponent
  ],
  imports: [
    NgbDatepickerModule,
    SharedModule,
    AccountRoutingModule
  ]
})
export class AccountModule { }
