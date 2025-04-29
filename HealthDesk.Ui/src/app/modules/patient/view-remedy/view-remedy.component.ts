// view-remedy.component.ts
import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Carousel, Modal } from 'bootstrap';

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
  selector: 'app-view-remedy',
  templateUrl: './view-remedy.component.html',
  styleUrls: ['./view-remedy.component.scss']
})
export class ViewRemedyComponent implements OnInit {
  remedy!: Remedy;
  randomImages: string[] = [];
  shareLink: string = '';

  @ViewChild('shareModal') shareModal!: ElementRef;
  @ViewChild('remedyCarousel') remedyCarousel!: ElementRef;

  private allImages = [
    'assets/remedies/1.jpg', 'assets/remedies/2.jpg', 'assets/remedies/3.jpg',
    'assets/remedies/4.jpg', 'assets/remedies/5.jpg', 'assets/remedies/6.jpg',
    'assets/remedies/7.jpg', 'assets/remedies/8.jpg', 'assets/remedies/9.jpg',
    'assets/remedies/10.jpg', 'assets/remedies/11.jpg', 'assets/remedies/12.jpg'
  ];

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

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    // 1️⃣ Find the remedy in your in-memory list
    const found = this.otherRemedies.find(r => r.id === id);
    if (!found) {
      // handle missing, e.g. redirect back
      return this.goBack();
    }
    this.remedy = found;

    // 2️⃣ Prepare share link
    this.shareLink = `${window.location.origin}/patient/view-remedy/${id}`;

    // 3️⃣ Pick 3 random carousel images
    this.pickRandomImages();
  }

  ngAfterViewInit(): void {
    // instantiate the carousel, 3s interval
    new Carousel(this.remedyCarousel.nativeElement, {
      interval: 3000,
      ride: 'carousel'
    });
  }

  private pickRandomImages() {
    this.randomImages = this.allImages
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
  }

  goBack() {
    this.router.navigate(['/patient/remidies']);
  }

  likeCase() {
    this.remedy.likeCount++;
  }

  openShareModal() {
    new Modal(this.shareModal.nativeElement).show();
  }

  copyLink(): void {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(this.shareLink)
        .then(() => console.log('Link copied!'))
        .catch(err => console.error('Copy failed', err));
    } else {
      // fallback for older browsers
      const dummy = document.createElement('textarea');
      dummy.value = this.shareLink;
      document.body.appendChild(dummy);
      dummy.select();
      document.execCommand('copy');
      document.body.removeChild(dummy);
      console.log('Link copied (fallback)!');
    }
  }
}
