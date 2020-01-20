import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { Show, Cast } from '../shows.model';
import { ShowsService } from '../services/shows.service';
import { map, concatMap, tap } from 'rxjs/operators';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { CastEditDialogComponent } from '../cast-edit-dialog/cast-edit-dialog.component';


@Component({
  selector: 'app-cast-list',
  templateUrl: './cast-list.component.html',
  styleUrls: ['./cast-list.component.scss']
})
export class CastListComponent implements OnInit {
  showId: number;
  show$: Observable<Show>;
  casting$: Observable<Cast[]>;

  displayedColumns = ['actions', 'id', 'name', 'actingRole'];

  constructor(
    private showsService: ShowsService,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) { }

  ngOnInit() { 
    this.showId = +this.route.snapshot.paramMap.get("showId");
    this.loadData();
  }

  loadData() {
    this.show$ = this.showsService.findShowById(this.showId).pipe();
    this.casting$ = this.showsService.findCastByShow(this.showId).pipe();
  }

  editCast(cast: Cast) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '400px';
    dialogConfig.data = {
      dialogTitle:"Edit Cast",
      cast,
      mode: 'update'
    };

    this.dialog.open(CastEditDialogComponent, dialogConfig).afterClosed()
    .subscribe(() => this.loadData());
  }

}
