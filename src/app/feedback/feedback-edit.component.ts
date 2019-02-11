import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of, Subscription } from 'rxjs';

import { IUser } from '../auth/user';
import { IFeedback } from './feedback';
import { IInstructor } from '../instructor/instructor';

import { AuthService } from '../auth/auth.service';
import { FeedbackService } from './feedback.service';
import { InstructorService } from '../instructor/instructor.service';

@Component({
  selector: 'app-feedback-edit',
  templateUrl: './feedback-edit.component.html',
  styleUrls: ['./feedback-edit.component.scss']
})
export class FeedbackEditComponent implements OnInit, OnDestroy {
  pageTitle = '';
  isNewFeedback: boolean;
  id: string;
  feedback$: Observable<IFeedback>;
  instructors$: Observable<IInstructor[]>;
  user$: Observable<IUser>;
  userSubs: Subscription;
  user: IUser;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private feedbackService: FeedbackService,
    private instructorService: InstructorService
  ) { }

  ngOnInit() {
    this.userSubs = this.authService.getAfUser().subscribe(
      user => this.user = user,
      error => console.log(error)
    );
    this.instructors$ = this.instructorService.getInstructors();

    this.activatedRoute.paramMap.subscribe(paramMap => {
      // everything in subscribe() will be re-executed each time the parameters change
      this.id = paramMap.get('id');
      this.isNewFeedback = this.id === 'new';
      this.pageTitle = this.isNewFeedback ? 'Добавить отзыв' : 'Редактирование отзыва';
      if (!this.isNewFeedback) {
        this.feedback$ = this.getFeedback(this.id);
      } else {
        this.feedback$ = of({}) as Observable<IFeedback>;
      }
    });
  }

  getFeedback(id: string) {
    return this.feedbackService.getFeedback(id);
  }

  onSaveInstructor2in1(f: IFeedback) {
    f.uid = this.user.uid;

    if (this.user.displayName) {
      f.userName = this.user.displayName;
    } else {
      const nFromEmail = this.user.email.split('@')[0];
      f.userName = nFromEmail.substring(0, nFromEmail.length - 2) + '...';
    }

    if (this.user.photoURL) {
      f.userPhotoUrl = this.user.photoURL;
    } else {
      // f.userPhotoUrl = '../../assets/images/ins-default.png';
      f.userPhotoUrl = `https://robohash.org/${this.user.uid}?set=set4`;
    }

    f.ts = Date.now();

    // console.log(f);
    const save = this.isNewFeedback
      ? this.feedbackService.createFeedback(f)
      : this.feedbackService.updateFeedback(f);
    save
      .then(_ => {
        console.log('saveFeedback 2in1 navigate to /feedback');
        this.router.navigate(['/feedback']);
      })
      .catch(error => console.log(error));
  }

  onInsList() {
    this.router.navigate(['/feedback']);
  }

  onDelete(feedback: IFeedback) {
    if (this.isNewFeedback) {
      // Don't delete, it was never saved.
      this.showMessage(`Невозможно удалить, еще не было сохранено!`);
      return;
    } else if (confirm(`Вы действительно хотите удалить отзыв об инструкторе - ${feedback.instructorName}?`)) {
      this.feedbackService.deleteFeedback(feedback)
        .then(_ => {
          this.showMessage(`Отзыв был успешно удален!`);
        })
        .catch(err => console.log(err, 'You do not have access!'));
    } else {
      alert('Удаление отменено!');
    }
  }

  showMessage(msg: string): void {
    alert(msg);
    console.log(msg);
    this.router.navigate(['/feedback']);
  }

  ngOnDestroy() {
    this.userSubs.unsubscribe();
  }

}
