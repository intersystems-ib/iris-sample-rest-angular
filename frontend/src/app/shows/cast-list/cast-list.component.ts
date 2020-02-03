import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { Show, Cast } from '../shows.model';
import { ShowsService } from '../services/shows.service';
import { map, concatMap, tap } from 'rxjs/operators';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { CastEditDialogComponent } from '../cast-edit-dialog/cast-edit-dialog.component';

/**
 * Displays a show casting using a table
 */
@Component({
  selector: 'app-cast-list',
  templateUrl: './cast-list.component.html',
  styleUrls: ['./cast-list.component.scss']
})
export class CastListComponent implements OnInit {
  /** casting show id */
  showId: number;

  /** casting show */
  show$: Observable<Show>;

  /** cast list that will be displayed */
  casting$: Observable<Cast[]>;

  /** columns that are displayed */
  displayedColumns = ['actions', 'id', 'name', 'actingRole'];

  /**
   * Constructor
   * @param showsService
   * @param route 
   * @param dialog 
   */
  constructor(
    private showsService: ShowsService,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) { }

  /**
   * Component init
   */
  ngOnInit() { 
    this.showId = +this.route.snapshot.paramMap.get("showId");
    this.loadData();
  }

  /**
   * Load data from server using service
   */
  loadData() {
    this.show$ = this.showsService.findShowById(this.showId).pipe();
    this.casting$ = this.showsService.findCastByShow(this.showId).pipe(
      map(res => res['children'])
    );
  }

  /**
   * User clicked a "edit cast" button
   */
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
