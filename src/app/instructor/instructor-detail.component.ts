import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { InstructorService } from './instructor.service';
import { IInstructor } from './instructor';

@Component({
  selector: 'app-instructor-detail',
  templateUrl: './instructor-detail.component.html',
  styleUrls: ['./instructor-detail.component.scss']
})
export class InstructorDetailComponent implements OnInit {
  instructor$: Observable<IInstructor>;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private instructorService: InstructorService) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.instructor$ = this.getInstructor(id);
  }

  getInstructor(id: string): Observable<IInstructor> {
    return this.instructorService.getInstructor(id);
  }

  onInsList() {
    this.router.navigate(['/instructor']);
  }

}
