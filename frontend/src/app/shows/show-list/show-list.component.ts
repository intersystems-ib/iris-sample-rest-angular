import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Show } from '../shows.model';
import { ShowsService } from '../services/shows.service';

@Component({
  selector: 'app-show-list',
  templateUrl: './show-list.component.html',
  styleUrls: ['./show-list.component.scss']
})
export class ShowListComponent implements OnInit {

  shows$: Observable<Show[]>;

  displayedColumns = ['id', 'title', 'description'];

  constructor(
    private showsService: ShowsService
  ) { }

  ngOnInit() {
    this.shows$ = this.showsService.findShows().pipe();
  }

}
