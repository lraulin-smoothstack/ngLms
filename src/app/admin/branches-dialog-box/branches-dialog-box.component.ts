import { Component, OnInit, Optional, Inject } from '@angular/core';
import { Branch } from '../types';

@Component({
  selector: 'app-branches-dialog-box',
  templateUrl: './branches-dialog-box.component.html',
  styleUrls: ['./branches-dialog-box.component.css'],
})
export class BranchesDialogBoxComponent implements OnInit {
  action: string;
  localData: any;

  constructor(
    public dialogRef: MatDialogRef<DialogBoxComponent>,
    // @Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Branch
  ) {
    console.log(data);
    this.localData = { ...data };
    this.action = this.localData.action;
  }

  doAction() {
    this.dialogRef.close({ event: this.action, data: this.localData });
  }

  closeDialog() {
    this.dialogRef.close({ event: 'Cancel' });
  }
}
