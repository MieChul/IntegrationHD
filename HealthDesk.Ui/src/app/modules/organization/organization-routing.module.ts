import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrganizationComponent } from './organization.component';
import { ViewSurveyResponseComponent } from './view-survey-response/view-survey-response.component';
import { SurveyFormComponent } from './survey-form/survey-form.component';
import { SurveysComponent } from './surveys/surveys.component';
import { DesignSurveyComponent } from './design-survey/design-survey.component';
import { PharmacyLandingComponent } from './pharmacy-landing/pharmacy-landing.component';
import { LabLandingComponent } from './lab-landing/lab-landing.component';
import { HospitalLandingComponent } from './hospital-landing/hospital-landing.component';
import { PharmaLandingComponent } from './pharma/pharma-landing.component';
import { PharmaComponent } from './pharma/pharma.component';
import { ShareSurveyComponent } from './share-survey/share-survey.component';
import { HospitalManagementComponent } from './hospital-management/hospital-management.component';
import { HospitalCasesComponent } from './hospital-cases/hospital-cases.component';
import { HospitalViewCaseComponent } from './hospital-view-case/hospital-view-case.component';
import { HospitalNewCaseComponent } from './hospital-new-case/hospital-new-case.component';

const routes: Routes = [{ path: '', component: OrganizationComponent,
  children: [
    { path: 'pharmaceutical', component: PharmaComponent, data: { showSidebar: false } },
    { path: 'pharma/pharma-management', component: PharmaLandingComponent, data: { showSidebar: false } },
    { path: 'hospital', component: HospitalLandingComponent, data: { showSidebar: false } },
    { path: 'laboratory', component: LabLandingComponent, data: { showSidebar: false } },
    { path: 'pharmacy', component: PharmacyLandingComponent, data: { showSidebar: false } },
    { path: 'pharma/design-survey', component: DesignSurveyComponent },
    { path: 'pharma/surveys', component: SurveysComponent },
    { path: 'pharma/survey/:id', component: SurveyFormComponent },
    { path: 'pharma/view-survey-response/:id', component: ViewSurveyResponseComponent },
    { path: 'pharma/share-survey/:id', component: ShareSurveyComponent },
    { path: 'hospital/hospital-management', component: HospitalManagementComponent},
    { path: 'hospital/cases', component: HospitalCasesComponent},
    { path: 'hospital/view-case/:id', component: HospitalViewCaseComponent},
    { path: 'hospital/new-case', component: HospitalNewCaseComponent}
  
    // Add other routes here pharma-management 
  ]
 }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganizationRoutingModule { }
