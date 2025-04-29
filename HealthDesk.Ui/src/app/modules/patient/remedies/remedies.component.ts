import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Modal, Tooltip } from 'bootstrap';

interface Remedy {
  id: number;
  submittedBy: string;
  remedyFor: string;
  name: string;
  comments: string[];
  likeCount: number;
  shareCount: number;
  shortDescription: string;
  thumbnail: string;
}

@Component({
  selector: 'app-remedies',
  templateUrl: './remedies.component.html',
  styleUrls: ['./remedies.component.scss']
})
export class RemediesComponent implements OnInit, AfterViewInit {

  // Initialize tooltips on view load
  ngAfterViewInit(): void {
    const tooltipTriggerList = Array.from(
      document.querySelectorAll('[data-bs-toggle="tooltip"]')
    );
    tooltipTriggerList.forEach((tooltipTriggerEl) => {
      new Tooltip(tooltipTriggerEl);
    });
  }

  @ViewChild('commentsModal') commentsModal!: ElementRef;
  @ViewChild('shareModal') shareModal!: ElementRef;

  shareLink: string = '';
  searchValue: string = '';
  comments: string[] = [];
  newComment: { [key: number]: string } = {};
  newPreference: string = '';
  preferences: string[] = [];
  ailments: any;
  selectedPreferences : string[] =[];

  // Sub-tab control for the Others Remedies tab
  activeSubTab: string = 'home';
  setActiveSubTab(tab: string): void {
    this.activeSubTab = tab;
  }

  // Arrays for filtered remedies
  recommendedRemedies: Remedy[] = [];
  latestRemedies: Remedy[] = [];
  trendingRemedies: Remedy[] = [];

  // Base remedies (dummy data)
  otherRemedies: Remedy[] = [
    {
      id: 1,
      name: 'Herbal Heart Tonic',
      submittedBy: 'Sharma',
      remedyFor: 'Heart Health',
      comments: ['Great remedy!'],
      likeCount: 10,
      shareCount: 5,
      shortDescription: 'A detailed study on a herbal tonic for heart health.',
      thumbnail: 'assets/remedies/3.jpg'
    },
    {
      id: 2,
      name: 'Brain Boost Elixir',
      submittedBy: 'Verma',
      remedyFor: 'Brain Health',
      comments: [],
      likeCount: 7,
      shareCount: 2,
      shortDescription: 'An intriguing herbal remedy for enhancing brain health.',
      thumbnail: 'assets/remedies/7.jpg'
    },
    {
      id: 3,
      name: 'Joint Relief Potion',
      submittedBy: 'Patel',
      remedyFor: 'Joint Pain',
      comments: [],
      likeCount: 15,
      shareCount: 3,
      shortDescription: 'A comprehensive study on an herbal remedy for joint pain relief.',
      thumbnail: 'assets/remedies/2.jpg'
    },
    {
      id: 4,
      name: 'Turmeric Face Pack',
      submittedBy: 'Reddy',
      remedyFor: 'Skin Care',
      comments: [],
      likeCount: 8,
      shareCount: 4,
      shortDescription: 'A natural remedy with turmeric for glowing and healthy skin.',
      thumbnail: 'assets/remedies/8.jpg'
    },
    {
      id: 5,
      name: 'Herbal Cough Syrup',
      submittedBy: 'Singh',
      remedyFor: 'Cough & Cold',
      comments: [],
      likeCount: 12,
      shareCount: 6,
      shortDescription: 'A pediatric remedy formulated for alleviating cough and cold symptoms naturally.',
      thumbnail: 'assets/remedies/5.jpg'
    },
    {
      id: 6,
      name: 'Neem Juice',
      submittedBy: 'Gupta',
      remedyFor: 'Immunity Boost',
      comments: [],
      likeCount: 9,
      shareCount: 3,
      shortDescription: 'A potent neem-based remedy to boost immunity and cleanse the body.',
      thumbnail: 'assets/remedies/4.jpg'
    },
    {
      id: 7,
      name: 'Ajwain Water',
      submittedBy: 'Chopra',
      remedyFor: 'Digestive Health',
      comments: [],
      likeCount: 11,
      shareCount: 4,
      shortDescription: 'An herbal remedy with ajwain to aid digestion and soothe stomach discomfort.',
      thumbnail: 'assets/remedies/10.jpg'
    },
    {
      id: 8,
      name: 'Coriander Seed Drink',
      submittedBy: 'Rao',
      remedyFor: 'Urinary Health',
      comments: [],
      likeCount: 6,
      shareCount: 2,
      shortDescription: 'A natural drink made from coriander seeds to support urinary health.',
      thumbnail: 'assets/remedies/9.jpg'
    },
    {
      id: 9,
      name: 'Bitter Gourd Juice',
      submittedBy: 'Mehta',
      remedyFor: 'Blood Sugar Control',
      comments: [],
      likeCount: 14,
      shareCount: 5,
      shortDescription: 'A herbal juice made from bitter gourd, known for regulating blood sugar levels.',
      thumbnail: 'assets/remedies/1.jpg'
    },
    {
      id: 10,
      name: 'Ashwagandha Tonic',
      submittedBy: 'Kumar',
      remedyFor: 'Joint Inflammation',
      comments: [],
      likeCount: 5,
      shareCount: 1,
      shortDescription: 'An herbal tonic with ashwagandha to ease joint inflammation and pain.',
      thumbnail: 'assets/remedies/6.jpg'
    },
    {
      id: 11,
      name: 'Punarnava Decoction',
      submittedBy: 'Desai',
      remedyFor: 'Kidney Health',
      comments: [],
      likeCount: 13,
      shareCount: 4,
      shortDescription: 'A traditional decoction aimed at promoting kidney health and detoxification.',
      thumbnail: 'assets/remedies/11.jpg'
    },
    {
      id: 12,
      name: 'Carrot Juice',
      submittedBy: 'Iyer',
      remedyFor: 'Eye Health',
      comments: [],
      likeCount: 7,
      shareCount: 3,
      shortDescription: 'A natural remedy using carrot juice to enhance eye health and vision.',
      thumbnail: 'assets/remedies/12.jpg'
    },
    {
      id: 13,
      name: 'Steam Inhalation',
      submittedBy: 'Nair',
      remedyFor: 'Sinus Relief',
      comments: [],
      likeCount: 8,
      shareCount: 2,
      shortDescription: 'A simple herbal remedy using steam inhalation for relieving sinus congestion.',
      thumbnail: 'assets/remedies/2.jpg'
    },
    {
      id: 14,
      name: 'Ashwagandha Capsules',
      submittedBy: 'Shah',
      remedyFor: 'Stress Relief',
      comments: [],
      likeCount: 10,
      shareCount: 3,
      shortDescription: 'An herbal remedy featuring ashwagandha capsules to alleviate stress and anxiety.',
      thumbnail: 'assets/remedies/4.jpg'
    },
    {
      id: 15,
      name: 'Giloy Juice',
      submittedBy: 'Patil',
      remedyFor: 'Immune Support',
      comments: [],
      likeCount: 9,
      shareCount: 2,
      shortDescription: 'A natural remedy with giloy juice to support and boost the immune system.',
      thumbnail: 'assets/remedies/7.jpg'
    }
  ];


  // Your remedies data
  yourRemedies: Remedy[] = [
    {
      id: 1,
      name: 'Ginger Honey Drink',
      submittedBy: 'You',
      remedyFor: 'Cold',
      comments: [],
      likeCount: 0,
      shareCount: 0,
      shortDescription: 'Your own remedy to tackle cold symptoms naturally.',
      thumbnail: 'assets/remedies/ginger-honey.jpg'
    },
    {
      id: 2,
      name: 'Mint Tea',
      submittedBy: 'You',
      remedyFor: 'Headache',
      comments: [],
      likeCount: 0,
      shareCount: 0,
      shortDescription: 'Your own remedy to soothe headache naturally.',
      thumbnail: 'assets/remedies/mint-tea.jpg'
    },
    {
      id: 3,
      name: 'Lemon Water',
      submittedBy: 'You',
      remedyFor: 'Fever',
      comments: [],
      likeCount: 0,
      shareCount: 0,
      shortDescription: 'Your own remedy to cool down during fever naturally.',
      thumbnail: 'assets/remedies/lemon-water.jpg'
    }
  ];


  constructor(private router: Router, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.filterRemedies();
    const set = new Set<string>();
    this.otherRemedies.forEach(remedy => set.add(remedy.remedyFor));
    this.ailments = Array.from(set);
  }

  createNewCase(): void {
    this.router.navigate(['/patient/new-remedy']);
  }

  addComment(caseId: number): void {
    const index = this.otherRemedies.findIndex(c => c.id === caseId);
    if (index !== -1 && this.newComment[caseId]) {
      this.otherRemedies[index].comments.push(this.newComment[caseId]);
      this.newComment[caseId] = '';
    }
  }

  likeCase(caseId: number): void {
    const index = this.otherRemedies.findIndex(c => c.id === caseId);
    if (index !== -1) {
      this.otherRemedies[index].likeCount++;
      this.filterRemedies();
    }
  }

  viewComments(caseId: number): void {
    const index = this.otherRemedies.findIndex(c => c.id === caseId);
    if (index !== -1) {
      this.comments = this.otherRemedies[index].comments;
      const modalInstance = new Modal(this.commentsModal.nativeElement);
      modalInstance.show();
    }
  }

  shareCase(caseId: number): void {
    this.shareLink = `https://HealthDesk.com/physician/view-remedy/${caseId}`;
    const modalInstance = new Modal(this.shareModal.nativeElement);
    modalInstance.show();
  }

  // Filtering based on search term and preference tags.
  searchRemedies(): void {
    this.filterRemedies();
  }

  filterRemedies(): void {
    if (!this.searchValue || this.searchValue === '') {
      this.recommendedRemedies = this.otherRemedies;
    } else {
      this.recommendedRemedies = this.otherRemedies.filter(remedy =>
        remedy.remedyFor.toLowerCase() === this.searchValue.toLowerCase()
      );
      this.latestRemedies = this.latestRemedies.filter(remedy =>
        remedy.remedyFor.toLowerCase() === this.searchValue.toLowerCase()
      );
      this.trendingRemedies = this.trendingRemedies.filter(remedy =>
        remedy.remedyFor.toLowerCase() === this.searchValue.toLowerCase()
      );
    }

    // Latest: top 6 sorted by descending id.
    this.latestRemedies = [...this.otherRemedies]
      .sort((a, b) => b.id - a.id)
      .slice(0, 6);

    // Trending: top 6 sorted by descending likeCount.
    this.trendingRemedies = [...this.otherRemedies]
      .sort((a, b) => b.likeCount - a.likeCount)
      .slice(0, 6);
  }


  addPreference(): void {
    if (this.newPreference.trim()) {
      this.preferences.push(this.newPreference.trim());
      this.newPreference = '';
      this.filterRemedies();
    }
  }

  viewCase(caseId: number): void {
    this.router.navigate(['/patient/view-remedy', caseId]);
  }

  savePreferences(): void {
    this.preferences= [...new Set(this.selectedPreferences)];
  }
}
