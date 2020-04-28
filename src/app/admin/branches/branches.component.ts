import { DialogBoxComponent } from './../dialog-box/dialog-box.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

import { Borrower } from '../types';

const BRANCHES: Branch[] = [
  {
    id: 1,
    name: 'Library of Congress',
    address: 'Independence Ave SE, Washington, DC 20540',
  },
  {
    id: 2,
    name: 'Miami-Dade Library',
    address: '101 W Flagler St, Miami, FL 33130',
  },
];

@Component({
  selector: 'app-branches',
  templateUrl: './branches.component.html',
  styleUrls: ['./branches.component.css'],
})
export class BranchesComponent {
  displayedColumns: string[] = ['id', 'name', 'address'];
  dataSource = BRANCHES;

  @ViewChild(MatTable, { static: true }) table: MatTable<any>;

  constructor(public dialog: MatDialog) {}
  openDialog(action, obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogBoxComponent, {
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
      address: rowObj.address,
    });
    this.table.renderRows();
  }
  updateRowData(rowObj) {
    this.dataSource = this.dataSource.filter((value, key) => {
      if (value.id === rowObj.id) {
        value.id = rowObj.id;
        value.name = rowObj.name;
        value.address = rowObj.address;
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
