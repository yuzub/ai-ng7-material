import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, MatTableModule,
  MatSidenavModule, MatToolbarModule, MatListModule, MatCardModule, MatDividerModule,
  MatSnackBarModule, MatProgressSpinnerModule, MatTabsModule
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
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatTabsModule,
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
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatTabsModule,
  ]
})
export class MaterialModule { }
