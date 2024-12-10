import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './shared/components/about-us/about-us.component'
import { ContactUsComponent } from './shared/components//contact-us/contact-us.component';
import { RoleGuard } from './shared/guards/role.guard';
const physicianModule = () => import('./modules/physician/physician.module').then(x => x.PhysicianModule);
const patientModule = () => import('./modules/patient/patient.module').then(x => x.PatientModule);
const anonymousModule = () => import('./modules/anonymous/anonymous.module').then(x => x.AnonymousModule);
const organizationModule = () => import('./modules/organization/organization.module').then(x => x.OrganizationModule);
const adminModule = () => import('./modules/admin/admin.module').then(x => x.AdminModule);
const accountModule = () => import('./modules/account/account.module').then(x => x.AccountModule);
const routes: Routes = [
    { path: 'physician', loadChildren: physicianModule, canActivate: [RoleGuard], data: { roles: ['physician'] } },
    { path: 'patient', loadChildren: patientModule, canActivate: [RoleGuard], data: { roles: ['patient'] } },
    { path: 'organization', loadChildren: organizationModule, canActivate: [RoleGuard], data: { roles: ['hospital','laboratory','pharmaceutical','nutraceutical'] } },
    { path: '', loadChildren: anonymousModule },
    { path: 'about-us', component: AboutUsComponent },
    { path: 'contact-us', component: ContactUsComponent },
    { path: 'admin', loadChildren: adminModule, canActivate: [RoleGuard], data: { roles: ['admin'] } },
    { path: 'account', loadChildren: accountModule, canActivate: [RoleGuard], data: { roles: ['physician', 'patient', 'hospital','laboratory','pharmaceutical','nutraceutical'] } },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
