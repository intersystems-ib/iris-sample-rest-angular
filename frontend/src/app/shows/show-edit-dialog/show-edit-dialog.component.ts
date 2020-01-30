import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Show } from '../shows.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ShowsService } from '../services/shows.service';

@Component({
  selector: 'app-show-edit-dialog',
  templateUrl: './show-edit-dialog.component.html',
  styleUrls: ['./show-edit-dialog.component.scss']
})
export class ShowEditDialogComponent {

  form: FormGroup;
  show: Show;
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
    this.show = data.show;
    this.mode = data.mode;

    const formControls = {
      title: ['', Validators.required],
      description: ['', Validators.required],
      year: ['', Validators.required]
    };

    if (this.mode == 'update') {
      this.form = this.fb.group(formControls);
      this.form.patchValue({...data.show});
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
    const show: Show = {
      ...this.show,
      ...this.form.value
    };

    this.showsService.saveShow(show.id, show)
      .subscribe(
        () => this.dialogRef.close()
      )
  }  

}
