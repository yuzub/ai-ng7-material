import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { IInstructor } from './instructor';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable(
  // {  providedIn: 'root'}
)
export class InstructorService {
  insRef: AngularFireList<IInstructor>;
  ins$: Observable<IInstructor[]>; //

  constructor(private db: AngularFireDatabase) {
    this.insRef = this.db.list<IInstructor>('instructors');
    this.ins$ = this.insRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
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

  addInstructor(newData: IInstructor) {
    this.insRef.push(newData);
  }

  updateInstructor(key: string, newData: IInstructor) {
    this.insRef.update(key, newData);
  }

  deleteInstructor(key: string) {
    this.insRef.remove(key);
  }

  deleteEverything() {
    this.insRef.remove();
  }

  // handleError(error: any) - rename???
  private errorHandler(error) {
    console.log(error);
    return Observable.throw(error);
  }
}
