import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { UserListComponent } from './user-list/user-list.component';
import { SharedModule } from '../../shared/shared.module';
import { UserInfoComponent } from './user-info/user-info.component';
import { BrandLibraryListComponent } from './brand-list/brand-list.component';


@NgModule({
  declarations: [
    AdminComponent,
    UserListComponent,
    UserInfoComponent,
    BrandLibraryListComponent

  ],
  imports: [
    AdminRoutingModule,
    SharedModule
  ]
})
export class AdminModule { }
