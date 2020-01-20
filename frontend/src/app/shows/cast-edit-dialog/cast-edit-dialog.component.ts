import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Show, Cast } from '../shows.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ShowEditDialogComponent } from '../show-edit-dialog/show-edit-dialog.component';
import { ShowsService } from '../services/shows.service';

@Component({
  selector: 'app-cast-edit-dialog',
  templateUrl: './cast-edit-dialog.component.html',
  styleUrls: ['./cast-edit-dialog.component.scss']
})
export class CastEditDialogComponent {

  form: FormGroup;
  cast: Cast;
  dialogTitle: string;
  mode: 'create' | 'update';

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ShowEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private showsService: ShowsService    
  ) 
  { 
    this.dialogTitle = data.dialogTitle;
    this.cast = data.cast;
    this.mode = data.mode;

    const formControls = {
      name: ['', Validators.required],
      actingRole: ['', Validators.required]
    };

    if (this.mode == 'update') {
      this.form = this.fb.group(formControls);
      this.form.patchValue({...data.cast});
    }
    else if (this.mode == 'create') {
      this.form = this.fb.group({
        ...formControls
      });
    }
  }

  onClose() {
    this.dialogRef.close();
  }

  onSave() {
    const cast: Cast = {
      ...this.cast,
      ...this.form.value
    };

    this.showsService.saveCast(cast.id, cast)
      .subscribe(
        () => this.dialogRef.close()
      )
  }

}
