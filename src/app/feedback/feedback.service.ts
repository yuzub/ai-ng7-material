import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IFeedback } from './feedback';

@Injectable()
export class FeedbackService {
  feedbacksRef: AngularFireList<IFeedback>;
  fbs$: Observable<IFeedback[]>; //

  constructor(private db: AngularFireDatabase) {
    this.feedbacksRef = this.db.list<IFeedback>('instructors');
    this.fbs$ = this.feedbacksRef.snapshotChanges().pipe(
      map(changes => changes.map(c => ({ key: c.payload.key, ...c.payload.val() })))
    );
  }

  getFeedback(key: string): Observable<IFeedback> {
    return this.db.object<IFeedback>(`feedbacks/${key}`).snapshotChanges().pipe(
      // .delay(3000) // delay for testing InstructorResolver
      map(action => ({ key: action.key, ...action.payload.val() }))
    );
      // .catch(this.errorHandler);
  }

  getInstructors(): Observable<IFeedback[]> {
    return this.fbs$;
  }

  createInstructor(i: IFeedback) {
    return this.feedbacksRef.push(i)
      .then(_ => console.log(`create instructor ${i.instructorName} - success`))
      .catch(error => console.log(error));
  }

  updateInstructor(i: IFeedback) {
    const key = i.key;
    // after updateInstructor() method in updated instructor is added new property - instructor.key
    // before update() delete i.key property in i object
    delete i.key;
    return this.feedbacksRef.update(key, i)
      .then(_ => console.log(`update ${i.instructorName} - ok`))
      .catch(error => console.log(error));
  }

  deleteInstructor(i: IFeedback) {
    return this.feedbacksRef.remove(i.key)
      .then(_ => console.log(`remove ${i.instructorName} - ok`))
      .catch(error => console.log(error));
  }
}
