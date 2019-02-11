import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { IFeedback } from './feedback';
import { IUser } from '../auth/user';

import { AuthService } from '../auth/auth.service';
import { FeedbackService } from './feedback.service';

@Component({
  selector: 'app-feedback-list',
  templateUrl: './feedback-list.component.html',
  styleUrls: ['./feedback-list.component.scss']
})
export class FeedbackListComponent implements OnInit {
  feedbacks$: Observable<IFeedback[]>;
  user$: Observable<IUser>;

  constructor(private authService: AuthService, private feedbackService: FeedbackService) { }

  ngOnInit() {
    this.feedbacks$ = this.feedbackService.getFeedbacks();
    this.user$ = this.authService.getAfUser();
  }

}
