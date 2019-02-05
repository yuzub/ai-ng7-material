import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { InstructorListComponent } from './instructor-list.component';
import { InstructorDetailComponent } from './instructor-detail.component';
import { InstructorEditComponent } from './instructor-edit.component';

const routes: Routes = [
  {
    path: 'instructor',
    // canActivate: [RequireAuthGuard],
    children: [
      {
        path: '',
        component: InstructorListComponent
      },
      {
        path: ':id',
        component: InstructorDetailComponent
      },
      {
        path: ':id/edit',
        component: InstructorEditComponent
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    // InstructorResolver
  ]
})
export class InstructorRoutingModule { }
