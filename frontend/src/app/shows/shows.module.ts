import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { ShowsService } from './services/shows.service';
import { ShowsRoutingModule } from './shows-routing.module';
import { ShowLatestComponent } from './show-latest/show-latest.component';


@NgModule({
  declarations: [ShowLatestComponent],
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
