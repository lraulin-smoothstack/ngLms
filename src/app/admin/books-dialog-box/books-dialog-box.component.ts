import { Component, OnInit, Optional, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { Book } from '../types';

@Component({
  selector: 'app-books-dialog-box',
  templateUrl: './books-dialog-box.component.html',
  styleUrls: ['./books-dialog-box.component.css'],
})
export class BooksDialogBoxComponent {
  action: string;
  localData: any;

  constructor(
    public dialogRef: MatDialogRef<DialogBoxComponent>,
    // @Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Book
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
