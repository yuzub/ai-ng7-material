import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material/material.module';
import { InstructorRoutingModule } from './instructor-routing.module';

import { InstructorListComponent } from './instructor-list.component';
import { InstructorEditComponent } from './instructor-edit.component';
import { InstructorDetailComponent } from './instructor-detail.component';

@NgModule({
  declarations: [InstructorListComponent, InstructorEditComponent, InstructorDetailComponent],
  imports: [
    CommonModule,
    MaterialModule,
    InstructorRoutingModule,
  ],
  providers: [
  ]
})
export class InstructorModule { }
