import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientRoutingModule } from './patient-routing.module';
import { PatientComponent } from './patient.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { DailyActivityComponent } from './daily-activity/daily-activity.component';
import { ImmunizationComponent } from './immunization/immunization.component';
import { InvestigationReportsComponent } from './investigation-reports/investigation-reports.component';
import { LabDataComponent } from './lab-data/lab-data.component';
import { LandingComponent } from './landing/landing.component';
import { PatientComplianceComponent } from './patient-compliance/patient-compliance.component';
import { PatientHistoryComponent } from './patient-history/patient-history.component';
import { PatientSelfRecordingComponent } from './patient-self-recording/patient-self-recording.component';
import { PatientSymptomsComponent } from './patient-symptoms/patient-symptoms.component';
import { PatientTreatmentComponent } from './patient-treatment/patient-treatment.component';
import { RateComponent } from './rate/rate.component';
import { RemediesComponent } from './remedies/remedies.component';
import { SelfRecordComponent } from './self-record/self-record.component';
import { SharedModule } from '../../shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NewRemedyComponent } from './new-remedy/new-remedy.component';
import { ViewRemedyComponent } from './view-remedy/view-remedy.component';


@NgModule({
  declarations: [
    PatientComponent,
    AppointmentsComponent,
    DailyActivityComponent,
    ImmunizationComponent,
    InvestigationReportsComponent,
    LabDataComponent,
    LandingComponent,
    PatientComplianceComponent,
    PatientHistoryComponent,
    PatientSelfRecordingComponent,
    PatientSymptomsComponent,
    PatientTreatmentComponent,
    RateComponent,
    RemediesComponent,
    SelfRecordComponent,
    NewRemedyComponent,
    ViewRemedyComponent
  ],
  imports: [
    NgbModule,
    SharedModule,
    PatientRoutingModule
  ]
})
export class PatientModule { }
