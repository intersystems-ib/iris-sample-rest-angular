import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { ShowsService } from './services/shows.service';
import { ShowsRoutingModule } from './shows-routing.module';
import { ShowLatestComponent } from './show-latest/show-latest.component';
import { CastListComponent } from './cast-list/cast-list.component';
import { ShowListComponent } from './show-list/show-list.component';


@NgModule({
  declarations: [ShowLatestComponent, CastListComponent, ShowListComponent],
  imports: [
    CommonModule,
    SharedModule,
    ShowsRoutingModule
  ],
  providers: [
    ShowsService
  ]
})
export class ShowsModule { }
