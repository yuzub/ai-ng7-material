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
    this.feedbacksRef = this.db.list<IFeedback>('feedbacks');
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

  getFeedbacks(): Observable<IFeedback[]> {
    return this.fbs$;
  }

  createFeedback(f: IFeedback): Promise<void> {
    // console.log(f.uid);
    // const itemRef = this.db.object(`feedbacks/${f.uid}`);
    // return itemRef.set(f)
    //   .then(_ => console.log(`create feedback - ok`))
    //   .catch(error => console.log(error));

    return this.feedbacksRef.push(f)
      .then(_ => console.log(`create feedback - ok`))
      .catch(error => console.log(error));
  }

  updateFeedback(f: IFeedback): Promise<void> {
    const key = f.key;
    // after updateFeedback() method in updated feedback is added new property - instructor.key
    // before update() delete i.key property in i object
    delete f.key;
    return this.feedbacksRef.update(key, f)
      .then(_ => console.log(`update feedback - ok`))
      .catch(error => console.log(error));
  }

  deleteFeedback(f: IFeedback): Promise<void> {
    return this.feedbacksRef.remove(f.key)
      .then(_ => console.log(`remove feedback - ok`))
      .catch(error => console.log(error));
  }
}
