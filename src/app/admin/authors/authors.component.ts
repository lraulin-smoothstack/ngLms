import { AuthorsDialogBoxComponent } from './../authors-dialog-box/authors-dialog-box.component';
import { Component, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Author } from '../types';

const AUTHORS: Author[] = [
  { id: 1, name: 'Douglas Murray' },
  { id: 2, name: 'Steven Pinker' },
];

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css'],
})
export class AuthorsComponent {
  displayedColumns: string[] = ['id', 'name', 'action'];
  dataSource = AUTHORS;

  @ViewChild(MatTable, { static: true }) table: MatTable<any>;

  constructor(public dialog: MatDialog) {}
  openDialog(action, obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(AuthorsDialogBoxComponent, {
      width: '250px',
      data: obj,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result.event === 'Add') {
        this.addRowData(result.data);
      } else if (result.event === 'Update') {
        this.updateRowData(result.data);
      } else if (result.event === 'Delete') {
        this.deleteRowData(result.data);
      }
    });
  }

  addRowData(rowObj) {
    const d = new Date();
    this.dataSource.push({
      id: d.getTime(),
      name: rowObj.name,
    });
    this.table.renderRows();
  }
  updateRowData(rowObj) {
    this.dataSource = this.dataSource.filter((value, key) => {
      if (value.id === rowObj.id) {
        value.name = rowObj.name;
      }
      return true;
    });
  }
  deleteRowData(rowObj) {
    this.dataSource = this.dataSource.filter((value, key) => {
      return value.id !== rowObj.id;
    });
  }
}
