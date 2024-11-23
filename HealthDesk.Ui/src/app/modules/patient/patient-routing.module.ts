import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientComponent } from './patient.component';
import { LandingComponent } from './landing/landing.component';
import { PatientHistoryComponent } from './patient-history/patient-history.component';
import { PatientTreatmentComponent } from './patient-treatment/patient-treatment.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { DailyActivityComponent } from './daily-activity/daily-activity.component';
import { ImmunizationComponent } from './immunization/immunization.component';
import { InvestigationReportsComponent } from './investigation-reports/investigation-reports.component';
import { LabDataComponent } from './lab-data/lab-data.component';
import { PatientComplianceComponent } from './patient-compliance/patient-compliance.component';
import { PatientSelfRecordingComponent } from './patient-self-recording/patient-self-recording.component';
import { PatientSymptomsComponent } from './patient-symptoms/patient-symptoms.component';
import { RateComponent } from './rate/rate.component';
import { RemediesComponent } from './remedies/remedies.component';

const routes: Routes = [{ path: '', component: PatientComponent,
  children: [
    { path: '', component: LandingComponent },
    { path: 'history', component: PatientHistoryComponent },
    { path: 'treatment', component: PatientTreatmentComponent },
    { path: 'appointments', component: AppointmentsComponent },
    { path: 'self-recording', component: PatientSelfRecordingComponent },
    { path: 'refill', component: PatientComplianceComponent },
    { path: 'symptoms', component: PatientSymptomsComponent },
    { path: 'daily-activity', component: DailyActivityComponent},
    { path: 'lab-data', component: LabDataComponent },
    { path: 'reports', component: InvestigationReportsComponent },
    { path: 'immunization', component: ImmunizationComponent },
    { path: 'rate', component: RateComponent },
    { path: 'remidies', component: RemediesComponent }
    // Add other routes here
  ]
 }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientRoutingModule { }
