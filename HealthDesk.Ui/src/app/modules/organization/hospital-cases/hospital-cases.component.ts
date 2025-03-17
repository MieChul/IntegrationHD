import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface HospitalCase {
  id: number;
  submittedBy: string;
  speciality: string;
  comments: string[];
  likeCount: number;
  shareCount: number;
  shortDescription: string;
  thumbnail: string;
}

@Component({
  selector: 'app-hospital-cases',
  templateUrl: './hospital-cases.component.html',
  styleUrls: ['./hospital-cases.component.scss']
})
export class HospitalCasesComponent implements OnInit {
  searchValue: string = '';
  newPreference: string = '';
  preferences: string[] = [];
  activeSubTab: string = 'home';

  latestHospitalCases: HospitalCase[] = [
    {
      id: 1,
      submittedBy: 'Dr. Smith',
      speciality: 'Cardiology',
      comments: ['Great case!'],
      likeCount: 10,
      shareCount: 5,
      shortDescription: 'A detailed case study on cardiology',
      thumbnail: 'https://via.placeholder.com/400x200'
    },
    {
      id: 2,
      submittedBy: 'Dr. Johnson',
      speciality: 'Neurology',
      comments: [],
      likeCount: 7,
      shareCount: 2,
      shortDescription: 'An intriguing neurology case',
      thumbnail: 'https://via.placeholder.com/400x200'
    }
  ];

  trendingHospitalCases: HospitalCase[] = [
    {
      id: 3,
      submittedBy: 'Dr. Lee',
      speciality: 'Orthopedics',
      comments: [],
      likeCount: 15,
      shareCount: 3,
      shortDescription: 'Orthopedics case study and analysis',
      thumbnail: 'https://via.placeholder.com/400x200'
    },
    {
      id: 4,
      submittedBy: 'Dr. Brown',
      speciality: 'Dermatology',
      comments: [],
      likeCount: 8,
      shareCount: 4,
      shortDescription: 'Dermatology case with treatment details',
      thumbnail: 'https://via.placeholder.com/400x200'
    }
  ];

  recommendedHospitalCases: HospitalCase[] = [
    {
      id: 5,
      submittedBy: 'Dr. Taylor',
      speciality: 'Pediatrics',
      comments: [],
      likeCount: 12,
      shareCount: 6,
      shortDescription: 'A pediatric case involving rare symptoms',
      thumbnail: 'https://via.placeholder.com/400x200'
    }
  ];

  yourHospitalCases: HospitalCase[] = [
    {
      id: 6,
      submittedBy: 'You',
      speciality: 'Cardiology',
      comments: [],
      likeCount: 0,
      shareCount: 0,
      shortDescription: 'Your own case study on cardiology',
      thumbnail: 'https://via.placeholder.com/400x200'
    },
    {
      id: 7,
      submittedBy: 'You',
      speciality: 'Neurology',
      comments: [],
      likeCount: 0,
      shareCount: 0,
      shortDescription: 'Your own case study on neurology',
      thumbnail: 'https://via.placeholder.com/400x200'
    },
    {
      id: 8,
      submittedBy: 'You',
      speciality: 'Orthopedics',
      comments: [],
      likeCount: 0,
      shareCount: 0,
      shortDescription: 'Your own case study on orthopedics',
      thumbnail: 'https://via.placeholder.com/400x200'
    }
  ];

  shareLink: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {}

  searchHospitalCases(): void {
    // Implement your search/filter logic here
    console.log('Searching hospital cases for:', this.searchValue);
  }

  setActiveSubTab(tab: string): void {
    this.activeSubTab = tab;
  }

  viewCase(caseId: number): void {
    this.router.navigate(['organization/hospital/view-case', caseId]);
  }

  likeCase(caseId: number): void {
    // Increase like count in whichever array the case is found.
    const updateLike = (cases: HospitalCase[]) => {
      const foundCase = cases.find(c => c.id === caseId);
      if (foundCase) {
        foundCase.likeCount++;
      }
    };

    updateLike(this.latestHospitalCases);
    updateLike(this.trendingHospitalCases);
    updateLike(this.recommendedHospitalCases);
    updateLike(this.yourHospitalCases);
  }

  viewComments(caseId: number): void {
    // Add your logic here to show case comments (modal or inline)
    console.log('Viewing comments for case', caseId);
  }

  shareCase(caseId: number): void {
    this.shareLink = `https://HealthDesk.com/organization/hospital/view-case/${caseId}`;
    // Add your share logic here (e.g. copy to clipboard, open modal, etc.)
    console.log('Share link:', this.shareLink);
  }

  createNewCase(): void {
    this.router.navigate(['organization/hospital/new-case']);
  }

  addPreference(): void {
    if (this.newPreference.trim()) {
      this.preferences.push(this.newPreference.trim());
      this.newPreference = '';
    }
  }
}
