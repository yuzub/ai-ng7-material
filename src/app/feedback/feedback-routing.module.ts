import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeedbackListComponent } from './feedback-list.component';
import { FeedbackDetailComponent } from './feedback-detail.component';
import { FeedbackEditComponent } from './feedback-edit.component';
import { RequireAuthGuard } from '../auth/guards/require-auth.guard';

const routes: Routes = [
  {
    path: 'feedback',
    canActivate: [RequireAuthGuard],
    children: [
      {
        path: '',
        component: FeedbackListComponent
      },
      {
        path: ':id',
        // canActivate: [AdminGuard],
        component: FeedbackDetailComponent
      },
      {
        path: ':id/edit',
        // canActivate: [AdminGuard],
        component: FeedbackEditComponent
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeedbackRoutingModule { }
