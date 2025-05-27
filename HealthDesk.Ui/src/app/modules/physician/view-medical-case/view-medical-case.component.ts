import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Carousel, Modal } from 'bootstrap'; // Import Bootstrap modal
import { AccountService } from '../../services/account.service';
import { PhysicianService } from '../../services/physician.service';

@Component({
  selector: 'app-view-medical-case',
  templateUrl: './view-medical-case.component.html',
  styleUrls: ['./view-medical-case.component.scss']
})
export class ViewMedicalCaseComponent implements OnInit {

  case!: any;
  shareLink: string = '';
  userData: any;
  caseId: any;
  newCommentText: string = '';
  existingComment: any = null;
  isEditing: boolean = false;
  @ViewChild('shareModal') shareModal!: ElementRef;
  @ViewChild('caseCarousel') caseCarousel!: ElementRef;

  constructor(private route: ActivatedRoute, private router: Router, private accountService: AccountService,
    private physicianService: PhysicianService) { }

  ngOnInit(): void {
    this.caseId = this.route.snapshot.paramMap.get('id');
    this.accountService.getUserData().subscribe({
      next: async (data) => {
        this.userData = data;
        await this.loadCase();
        this.shareLink = `${window.location.origin}/patient/view-medical-case/${this.caseId}`;
      },
      error: (err) => console.error('Error fetching user data:', err)
    });
  }

  ngAfterViewInit(): void {
    new Carousel(this.caseCarousel.nativeElement, {
      interval: 3000,
      ride: 'carousel'
    });
  }

  loadCase() {
    this.physicianService.getMedicalCaseById(this.userData.id, this.caseId).subscribe({
      next: (rem: any) => {
        this.case = rem.data;
        this.setExistingComment();
      },
      error: (error) => {
        console.error('Error loading data:', error);
      }
    });
  }

  goBack() {
    this.router.navigate(['/physician/medical-cases']);
  }

  toggleLike() {
    this.physicianService.toggleLike(this.case.userId, this.case.id, this.userData.id).subscribe({
      next: (com: any) => {
        this.loadCase();
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
    const modalInstance = new Modal(this.shareModal.nativeElement);
    modalInstance.show();
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
    this.case.comments = this.case.comments || [];
    this.existingComment = this.case.comments.find(
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
      itemType: "Medical_Case"
    };

    this.physicianService.saveComment(this.case.userId, this.case.id, comment).subscribe({
      next: (com: any) => {
        this.loadCase();
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
    return this.case?.likedBy?.includes(this.userData.id);
  }
}
