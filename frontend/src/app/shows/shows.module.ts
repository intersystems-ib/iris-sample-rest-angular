import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatDialogModule} from '@angular/material/dialog';

import { SharedModule } from '../shared/shared.module';
import { ShowsService } from './services/shows.service';
import { ShowsRoutingModule } from './shows-routing.module';
import { ShowLatestComponent } from './show-latest/show-latest.component';
import { CastListComponent } from './cast-list/cast-list.component';
import { ShowListComponent } from './show-list/show-list.component';
import { ShowEditDialogComponent } from './show-edit-dialog/show-edit-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ShowLatestComponent, CastListComponent, ShowListComponent, ShowEditDialogComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    FormsModule, 
    ReactiveFormsModule,
    SharedModule,
    ShowsRoutingModule
  ],
  providers: [
    ShowsService
  ],
  entryComponents: [ShowEditDialogComponent],
})
export class ShowsModule { }
