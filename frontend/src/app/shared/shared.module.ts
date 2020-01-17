import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MatButtonModule,
  MatToolbarModule,
  MatIconModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatInputModule,
  MatDividerModule
} from '@angular/material';

const mm = [ 
  MatButtonModule, 
  MatToolbarModule,
  MatIconModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatInputModule,
  MatDividerModule
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ...mm
  ],
  exports: [
    ...mm
  ]
})
export class SharedModule { }
