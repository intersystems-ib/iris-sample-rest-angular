import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { Show, Cast } from '../shows.model';
import { ShowsService } from '../services/shows.service';
import { map, concatMap, tap } from 'rxjs/operators';


@Component({
  selector: 'app-cast-list',
  templateUrl: './cast-list.component.html',
  styleUrls: ['./cast-list.component.scss']
})
export class CastListComponent implements OnInit {

  show$: Observable<Show>;
  casting$: Observable<Cast[]>;

  displayedColumns = ['id', 'name', 'actingRole'];


  constructor(
    private showsService: ShowsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    
    const showId = this.route.snapshot.paramMap.get("id");
   
    this.show$ = this.showsService.findShowById(+showId).pipe();
    this.casting$ = this.showsService.findCastByShow(+showId).pipe();

  }

}
