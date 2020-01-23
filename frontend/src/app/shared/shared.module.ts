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
  MatDividerModule,
  MatSidenavModule,
  MatProgressSpinnerModule,
  MatListModule,
  MatCardModule,
  MatTooltipModule
} from '@angular/material';

const mm = [ 
  MatButtonModule, 
  MatToolbarModule,
  MatIconModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatInputModule,
  MatDividerModule,
  MatSidenavModule,
  MatProgressSpinnerModule,
  MatListModule,
  MatCardModule,
  MatTooltipModule
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
