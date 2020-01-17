import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from "rxjs/operators";

import { ShowsService } from '../services/shows.service';
import { Show } from '../shows.model';


@Component({
  selector: 'app-show-latest',
  templateUrl: './show-latest.component.html',
  styleUrls: ['./show-latest.component.scss']
})
export class ShowLatestComponent implements OnInit {

  shows$: Observable<Show[]>;

  constructor(
    private showsService: ShowsService
  ) { }

  ngOnInit() {
    this.init();
  }

  init() {

    //this.shows$ = this.showsService.findLatestShows().pipe();
    this.shows$ = this.showsService.findLatestShows()
    .pipe(
      map(show => show)
    );
    
  }

}
