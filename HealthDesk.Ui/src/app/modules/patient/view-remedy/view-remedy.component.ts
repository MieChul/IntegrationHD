import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Carousel, Modal } from 'bootstrap';
import { AccountService } from '../../services/account.service';
import { PatientService } from '../../services/patient.service';

@Component({
  selector: 'app-view-remedy',
  templateUrl: './view-remedy.component.html',
  styleUrls: ['./view-remedy.component.scss']
})
export class ViewRemedyComponent implements OnInit {
  remedy!: any;
  shareLink: string = '';
  userData: any;
  remedyId: any;
  newCommentText: string = '';
  existingComment: any = null;
  isEditing: boolean = false;
  @ViewChild('shareModal') shareModal!: ElementRef;
  @ViewChild('remedyCarousel') remedyCarousel!: ElementRef;



  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private patientService: PatientService
  ) { }

  ngOnInit(): void {
    this.remedyId = this.route.snapshot.paramMap.get('id');
    this.accountService.getUserData().subscribe({
      next: async (data) => {
        this.userData = data;
        await this.loadRemedy();
        this.shareLink = `${window.location.origin}/patient/view-remedy/${this.remedyId}`;
      },
      error: (err) => console.error('Error fetching user data:', err)
    });
  }

  ngAfterViewInit(): void {
    new Carousel(this.remedyCarousel.nativeElement, {
      interval: 3000,
      ride: 'carousel'
    });
  }

  loadRemedy() {
    this.patientService.getRemedyById(this.userData.id, this.remedyId).subscribe({
      next: (rem: any) => {
        this.remedy = rem.data;
        this.setExistingComment();
      },
      error: (error) => {
        console.error('Error loading data:', error);
      }
    });
  }

  goBack() {
    this.router.navigate(['/patient/remidies']);
  }

  toggleLike() {
    this.patientService.toggleLike(this.remedy.userId, this.remedy.id, this.userData.id).subscribe({
      next: (com: any) => {
        this.loadRemedy();
        this.newCommentText = '';
        this.isEditing = false;
        this.setExistingComment();
      },
      error: (error) => {
        console.error('Error Saving data:', error);
      }
    });
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
      const dummy = document.createElement('textarea');
      dummy.value = this.shareLink;
      document.body.appendChild(dummy);
      dummy.select();
      document.execCommand('copy');
      document.body.removeChild(dummy);
      console.log('Link copied (fallback)!');
    }
  }

  setExistingComment(): void {
    this.remedy.comments = this.remedy.comments || [];
    this.existingComment = this.remedy.comments.find(
      (c: any) => c.userId === this.userData.id
    );

    if (this.existingComment) {
      this.newCommentText = this.existingComment.text;
    }
  }

  enableEdit(): void {
    this.isEditing = true;
  }

  postComment(): void {
    const trimmedText = this.newCommentText.trim();
    if (!trimmedText) return;

    const comment = {
      id: this.existingComment?.id,
      userId: this.userData.id,
      text: trimmedText,
      itemType: "Home_Remedy"
    };

    this.patientService.saveComment(this.remedy.userId, this.remedy.id, comment).subscribe({
      next: (com: any) => {
        this.loadRemedy();
        this.newCommentText = '';
        this.isEditing = false;
        this.setExistingComment();
      },
      error: (error) => {
        console.error('Error Saving data:', error);
      }
    });
  }

  hasLiked(): boolean {
    return this.remedy?.likedBy?.includes(this.userData.id);
  }
}
