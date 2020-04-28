import { DialogBoxComponent } from './../dialog-box/dialog-box.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Borrower } from '../types';

const BORROWERS: Borrower[] = [
  {
    id: 1,
    name: 'Joe Shmoe',
    address: 'Mulberry Lane',
    phoneNumber: '867-5309',
  },
  {
    id: 2,
    name: 'Jane Doe',
    address: 'Rasberry Lane',
    phoneNumber: '867-5309',
  },
];

@Component({
  selector: 'app-borrowers',
  templateUrl: './borrowers.component.html',
  styleUrls: ['./borrowers.component.css'],
})
export class BorrowersComponent {
  displayedColumns: string[] = ['id', 'name', 'address', 'phoneNumber'];
  dataSource = BORROWERS;

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
      phoneNumber: rowObj.phoneNumber,
    });
    this.table.renderRows();
  }
  updateRowData(rowObj) {
    this.dataSource = this.dataSource.filter((value, key) => {
      if (value.id === rowObj.id) {
        value.id = rowObj.id;
        value.name = rowObj.name;
        value.address = rowObj.address;
        value.phoneNumber = rowObj.phoneNumber;
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
