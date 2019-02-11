import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IInstructor } from './instructor';

@Injectable(
  // {  providedIn: 'root'}
)
export class InstructorService {
  instructorsRef: AngularFireList<IInstructor>;
  ins$: Observable<IInstructor[]>; //

  constructor(private db: AngularFireDatabase) {
    this.instructorsRef = this.db.list<IInstructor>('instructors');
    this.ins$ = this.instructorsRef.snapshotChanges().pipe(
      map(changes => changes.map(c => ({ key: c.payload.key, ...c.payload.val() })))
    );
  }

  getInstructor(key: string): Observable<IInstructor> {
    return this.db.object<IInstructor>(`instructors/${key}`).snapshotChanges().pipe(
      // .delay(3000) // delay for testing InstructorResolver
      map(action => ({ key: action.key, ...action.payload.val() }))
    );
      // .catch(this.errorHandler);
  }

  getInstructors(): Observable<IInstructor[]> {
    return this.ins$;
  }

  createInstructor(i: IInstructor) {
    return this.instructorsRef.push(i)
      .then(_ => console.log(`create instructor ${i.instructorName} - ok`))
      .catch(error => console.log(error));
  }

  updateInstructor(i: IInstructor) {
    const key = i.key;
    // after updateInstructor() method in updated instructor is added new property - instructor.key
    // before update() delete i.key property in i object
    delete i.key;
    return this.instructorsRef.update(key, i)
      .then(_ => console.log(`update ${i.instructorName} - ok`))
      .catch(error => console.log(error));
  }

  deleteInstructor(i: IInstructor) {
    return this.instructorsRef.remove(i.key)
      .then(_ => console.log(`remove ${i.instructorName} - ok`))
      .catch(error => console.log(error));
  }

  // handleError(error: any) - rename???
  private errorHandler(error) {
    console.log(error);
    return Observable.throw(error);
  }
}
