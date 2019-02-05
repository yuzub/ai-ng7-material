import { Component, OnInit, OnDestroy } from '@angular/core';
import { InstructorService } from './instructor.service';
import { Observable, Subscription } from 'rxjs';
import { IInstructor } from './instructor';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-instructor-list',
  templateUrl: './instructor-list.component.html',
  styleUrls: ['./instructor-list.component.scss']
})
export class InstructorListComponent implements OnInit, OnDestroy {
  instructors$: Observable<IInstructor[]>;
  subscript: Subscription;
  showPhoto: false;

  displayedColumns = ['photo', 'name', 'car', 'gear', 'price'];
  dataSource = new MatTableDataSource<IInstructor>();

  constructor(private instructorService: InstructorService) { }

  ngOnInit() {
    this.instructors$ = this.getInstructors();
    this.subscript = this.instructors$.subscribe(instructors => this.dataSource.data = instructors);
  }

  ngOnDestroy(): void {
    this.subscript.unsubscribe();
  }

  getInstructors(): Observable<IInstructor[]> {
    return this.instructorService.getInstructors();
  }
}
