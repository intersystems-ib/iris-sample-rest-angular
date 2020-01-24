import { NgModule, ModuleWithProviders } from '@angular/core';
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
  MatTooltipModule,
  MatGridListModule
} from '@angular/material';
import { AlertDisplayComponent } from './alert-display/alert-display.component';
import { Alert } from './alert.model';
import { AlertService } from './services/alert.service';

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
  MatTooltipModule,
  MatGridListModule,
]

@NgModule({
  declarations: [AlertDisplayComponent],
  imports: [
    CommonModule,
    ...mm
  ],
  exports: [
    ...mm,
    AlertDisplayComponent
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
      return {
          ngModule: SharedModule,
          providers: [
            AlertService,
          ]
      }
  }
}
