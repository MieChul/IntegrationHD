import { Component, OnInit, ViewChild, ComponentRef, ViewContainerRef } from '@angular/core';
import { SelfRecordComponent } from '../self-record/self-record.component';
import { PatientSymptomsComponent } from '../patient-symptoms/patient-symptoms.component';
import { LabDataComponent } from '../lab-data/lab-data.component';
import { InvestigationReportsComponent } from '../investigation-reports/investigation-reports.component';
import { ImmunizationComponent } from '../immunization/immunization.component';


@Component({
  selector: 'app-patient-self-recording',
  templateUrl: './patient-self-recording.component.html',
  styleUrls: ['./patient-self-recording.component.scss']
})
export class PatientSelfRecordingComponent implements OnInit {
  @ViewChild('tabContent', { read: ViewContainerRef }) tabContent!: ViewContainerRef;
  componentRef!: ComponentRef<any>;
  selectedTab: string = 'selfRecord';

  constructor() {}

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    // Ensure the default tab is loaded after the view has been initialized
    this.loadComponent(SelfRecordComponent);
  }

  loadComponent(component: any): void {
    this.tabContent.clear();
    this.componentRef = this.tabContent.createComponent(component);
  }

  selectTab(tab: string): void {
    this.selectedTab = tab;
    switch (tab) {
      case 'selfRecord':
        this.loadComponent(SelfRecordComponent);
        break;
      case 'symptoms':
        this.selectedTab = 'symptoms';
        this.loadComponent(PatientSymptomsComponent);
        break;
      case 'labData':
        this.selectedTab = 'labData';
        this.loadComponent(LabDataComponent);
        break;
      case 'investigations':
        this.selectedTab = 'investigations';
        this.loadComponent(InvestigationReportsComponent);
        break;
      case 'immunization':
        this.selectedTab = 'immunization';
        this.loadComponent(ImmunizationComponent);
        break;
    }
  }
}
