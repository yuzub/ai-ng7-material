import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, MatTableModule,
  MatSidenavModule, MatToolbarModule, MatListModule, MatCardModule, MatDividerModule, MatSnackBarModule
} from '@angular/material';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatCardModule,
    MatDividerModule,
    MatSnackBarModule
  ],
  exports: [
    FormsModule,
    FlexLayoutModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatCardModule,
    MatDividerModule,
    MatSnackBarModule
  ]
})
export class MaterialModule { }
