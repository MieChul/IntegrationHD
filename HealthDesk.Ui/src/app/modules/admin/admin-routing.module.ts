import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { UserListComponent } from './user-list/user-list.component';
import { BrandLibraryListComponent } from './brand-list/brand-list.component';

const routes: Routes = [{
  path: '', component: AdminComponent,
  children: [
    { path: 'userInfo', component: UserInfoComponent },
    { path: '', component: UserListComponent },
    { path: 'brands', component: BrandLibraryListComponent }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
