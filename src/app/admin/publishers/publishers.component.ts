import { PublishersDialogBoxComponent } from './../publishers-dialog-box/publishers-dialog-box.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Publisher } from '../types';

const PUBLISHERS: Publisher[] = [
  {
    id: 1,
    name: 'Penguin',
    address: '6241 Fake Address',
    phoneNumber: '555-CALL ME',
  },
];

@Component({
  selector: 'app-publishers',
  templateUrl: './publishers.component.html',
  styleUrls: ['./publishers.component.css'],
})
export class PublishersComponent {
  displayedColumns: string[] = [
    'id',
    'name',
    'address',
    'phoneNumber',
    'action',
  ];
  dataSource = PUBLISHERS;

  @ViewChild(MatTable, { static: true }) table: MatTable<any>;

  constructor(public dialog: MatDialog) {}
  openDialog(action, obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(PublishersDialogBoxComponent, {
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
