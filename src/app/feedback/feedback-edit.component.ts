import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';

import { IFeedback } from './feedback';

@Component({
  selector: 'app-feedback-edit',
  templateUrl: './feedback-edit.component.html',
  styleUrls: ['./feedback-edit.component.scss']
})
export class FeedbackEditComponent implements OnInit {
  pageTitle = '';
  isNewFeedback: boolean;
  id: string;
  feedback$: Observable<IFeedback>;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      // everything in subscribe() will be re-executed each time the parameters change
      this.id = paramMap.get('id');
      this.isNewFeedback = this.id === 'new';
      this.pageTitle = this.isNewFeedback ? 'Добавить отзыв' : 'Редактирование отзыва';
      if (!this.isNewFeedback) {
        // this.feedback$ = this.getInstructor(this.id);
      } else {
        this.feedback$ = of({}) as Observable<IFeedback>;
      }
    });
  }

  onSaveInstructor2in1(instructor) {}

  onInsList() {}

  onDelete(instructor) {}

}
