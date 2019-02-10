import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';

import { IInstructor } from './instructor';
import { InstructorService } from './instructor.service';

@Component({
  selector: 'app-instructor-edit',
  templateUrl: './instructor-edit.component.html',
  styleUrls: ['./instructor-edit.component.scss']
})
export class InstructorEditComponent implements OnInit {
  isNewInstructor: boolean;
  pageTitle = '';
  id: string;
  instructor$: Observable<IInstructor>;

  // tslint:disable-next-line:max-line-length
  defaultPhotoUrl = 'https://firebasestorage.googleapis.com/v0/b/instructor-dp-ua.appspot.com/o/instructors%2Fins-default.png?alt=media&token=6367beb8-259e-48e6-9d8f-c2a409c17ade';
  // tslint:disable-next-line:max-line-length
  // defaultPhotoUrl = 'https://firebasestorage.googleapis.com/v0/b/instructor-dp-ua.appspot.com/o/instructors%2F8?alt=media&token=4337ceb0-a730-4ddc-8573-b6d06ed67887';
  defaultCarPhotoUrl = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private instructorService: InstructorService
    ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      // everything in subscribe() will be re-executed each time the parameters change
      this.id = paramMap.get('id');
      this.isNewInstructor = this.id === 'new';
      this.pageTitle = this.isNewInstructor ? 'Добавить инструктора' : 'Редактирование данных инструктора';
      if (!this.isNewInstructor) {
        this.instructor$ = this.getInstructor(this.id);
      } else {
        this.instructor$ = of({}) as Observable<IInstructor>;
      }
    });
  }

  getInstructor(key: string): Observable<IInstructor> {
    return this.instructorService.getInstructor(key);
  }

  onSaveInstructor2in1(instructor: IInstructor) {
    if (!instructor.hasOwnProperty('photoUrl')) { instructor.photoUrl = this.defaultPhotoUrl; }
    if (!instructor.hasOwnProperty('carPhotoUrl')) { instructor.carPhotoUrl = this.defaultCarPhotoUrl; }
    const save = this.isNewInstructor
    ? this.instructorService.createInstructor(instructor)
    : this.instructorService.updateInstructor(instructor);
    save
      .then(_ => {
        this.showMessage(`${instructor.instructorName} был ${(this.isNewInstructor) ? 'создан' : 'обновлен'}.`);
      })
      .catch(err => console.log(err, 'You do not have access!'));
  }

  onDelete(instructor: IInstructor) {
    if (this.id === 'new') {
      // Don't delete, it was never saved.
      this.showMessage(`Невозможно удалить, еще не было сохранено!`);
      return;
    } else if (confirm(`Действительно удалить инструктора: ${instructor.instructorName}?`)) {
      this.instructorService.deleteInstructor(instructor)
        .then(_ => {
          this.showMessage(`${instructor.instructorName} был успешно удален!`);
        })
        .catch(err => console.log(err, 'You do not have access!'));
    } else {
      alert('Удажение отменено!');
    }
  }

  showMessage(msg: string): void {
    alert(msg);
    console.log(msg);
    this.router.navigate(['/instructor']);
  }

  onInsList() {
    this.router.navigate(['/instructor']);
  }
}
