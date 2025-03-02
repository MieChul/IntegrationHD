import { Component, OnInit } from '@angular/core';
import { PhysicianService } from '../../services/physician.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-view-patient-history',
  templateUrl: './view-patient-history.component.html',
  styleUrls: ['./view-patient-history.component.scss']
})
export class ViewPatientHistoryComponent implements OnInit {
  selectedTab: string = 'prescriptions';

  // Data arrays for each tab (to be populated from your service)
  prescriptions: any[] = [];
  selfRecords: any[] = [];
  symptoms: any[] = [];
  labInvestigations: any[] = [];
  investigations: any[] = [];
  immunizations: any[] = [];
  patientId: string = '';


  constructor(private route: ActivatedRoute, private physicianService: PhysicianService) { }

  ngOnInit(): void {
    this.patientId = this.route.snapshot.paramMap.get('patientId')!;
    this.physicianService.getPatientHistory(this.patientId).subscribe((history: any) => {
      if (history.data) {
        this.prescriptions = history.data.prescriptions || [];
        this.selfRecords = history.data.selfRecords || [];
        this.symptoms = history.data.symptoms || [];
        this.labInvestigations = history.data.labInvestigations || [];
        this.investigations = history.data.reports || [];
        this.immunizations = history.data.immunizations || [];
      }
    });
  }

  selectTab(tabName: string): void {
    this.selectedTab = tabName;
  }
}
