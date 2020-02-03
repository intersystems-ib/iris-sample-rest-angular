import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from "rxjs/operators";

import { ShowsService } from '../services/shows.service';
import { Show } from '../shows.model';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { ShowEditDialogComponent } from '../show-edit-dialog/show-edit-dialog.component';

/**
 * Display latest shows in a card-format
 */
@Component({
  selector: 'app-show-latest',
  templateUrl: './show-latest.component.html',
  styleUrls: ['./show-latest.component.scss']
})
export class ShowLatestComponent implements OnInit {

  /** list of shows that will be displayed */
  shows$: Observable<Show[]>;

  /**
   * Constructor
   * @param showsService 
   * @param dialog 
   */
  constructor(
    private showsService: ShowsService,
    private dialog: MatDialog
  ) { }

  /** 
   * Component init 
   */
  ngOnInit() {
    this.loadData();
  }

  /** 
   * Load data from backed using service 
   */
  loadData() {
    this.shows$ = this.showsService.findLatestShows().pipe(
      map(res => res['children'])
    );  
  }

  /**
   * User click on a "edit show" button
   * @param show 
   */
  editShow(show:Show) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '400px';
    dialogConfig.data = {
      dialogTitle:"Edit a Show",
      show,
      mode: 'update'
    };

    // open dialog
    this.dialog.open(ShowEditDialogComponent, dialogConfig).afterClosed()
    .subscribe(() => this.loadData());
  }
  
}
