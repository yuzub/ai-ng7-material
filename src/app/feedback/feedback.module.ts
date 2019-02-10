import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material/material.module';
import { FeedbackRoutingModule } from './feedback-routing.module';

import { FeedbackListComponent } from './feedback-list.component';
import { FeedbackEditComponent } from './feedback-edit.component';
import { FeedbackDetailComponent } from './feedback-detail.component';

@NgModule({
  declarations: [FeedbackListComponent, FeedbackEditComponent, FeedbackDetailComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FeedbackRoutingModule
  ]
})
export class FeedbackModule { }
