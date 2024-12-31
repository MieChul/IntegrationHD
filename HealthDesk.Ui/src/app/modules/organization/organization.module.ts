import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrganizationRoutingModule } from './organization-routing.module';
import { OrganizationComponent } from './organization.component';
import { DesignSurveyComponent } from './design-survey/design-survey.component';
import { HospitalLandingComponent } from './hospital-landing/hospital-landing.component';
import { LabLandingComponent } from './lab-landing/lab-landing.component';
import { PharmaLandingComponent } from './pharma/pharma-landing.component';
import { PharmacyLandingComponent } from './pharmacy-landing/pharmacy-landing.component';
import { SurveyFormComponent } from './survey-form/survey-form.component';
import { SurveysComponent } from './surveys/surveys.component';
import { ViewSurveyResponseComponent } from './view-survey-response/view-survey-response.component';
import { SharedModule } from '../../shared/shared.module';
import { ShareSurveyComponent } from './share-survey/share-survey.component';
import { HospitalCasesComponent } from './hospital-cases/hospital-cases.component';
import { HospitalManagementComponent } from './hospital-management/hospital-management.component';
import { HospitalViewCaseComponent } from './hospital-view-case/hospital-view-case.component';
import { HospitalNewCaseComponent } from './hospital-new-case/hospital-new-case.component';


@NgModule({
  declarations: [
    OrganizationComponent,
    DesignSurveyComponent,
    HospitalLandingComponent,
    LabLandingComponent,
    PharmaLandingComponent,
    PharmacyLandingComponent,
    SurveyFormComponent,
    SurveysComponent,
    ViewSurveyResponseComponent,
    ShareSurveyComponent,
    HospitalCasesComponent,
    HospitalManagementComponent,
    HospitalViewCaseComponent,
    HospitalNewCaseComponent
  ],
  imports: [
    SharedModule,
    OrganizationRoutingModule
  ]
})
export class OrganizationModule { }
