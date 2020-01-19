import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from "rxjs/operators";

import { ShowsService } from '../services/shows.service';
import { Show } from '../shows.model';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { ShowEditDialogComponent } from '../show-edit-dialog/show-edit-dialog.component';


@Component({
  selector: 'app-show-latest',
  templateUrl: './show-latest.component.html',
  styleUrls: ['./show-latest.component.scss']
})
export class ShowLatestComponent implements OnInit {

  shows$: Observable<Show[]>;

  constructor(
    private showsService: ShowsService,
    private dialog: MatDialog
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

  editShow(show:Show) {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '400px';
    dialogConfig.data = {
      dialogTitle:"Edit Course",
      show,
      mode: 'update'
    };

    this.dialog.open(ShowEditDialogComponent, dialogConfig)
      .afterClosed()
      //.subscribe(() => this.courseChanged.emit());

}
  
}
