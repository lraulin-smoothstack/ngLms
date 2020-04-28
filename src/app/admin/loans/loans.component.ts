import { LoansDialogBoxComponent } from './../loans-dialog-box/loans-dialog-box.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Loan } from '../types';

const LOANS: Loan[] = [
  {
    id: 1,
    dateIn: null,
    dateOut: new Date('April 25, 2020'),
    dueDate: new Date('May 1, 2020'),
    borrower: 'Fred',
    branchName: 'Miami',
    bookTitle: 'How to Win Friends and Influence People',
  },
];

@Component({
  selector: 'app-loans',
  templateUrl: './loans.component.html',
  styleUrls: ['./loans.component.css'],
})
export class LoansComponent {
  displayedColumns: string[] = [
    'id',
    'dateIn',
    'dateOut',
    'dueDate',
    'borrower',
    'branchName',
    'bookTitle',
    'action',
  ];
  dataSource = LOANS;

  @ViewChild(MatTable, { static: true }) table: MatTable<any>;

  constructor(public dialog: MatDialog) {}
  openDialog(action, obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(LoansDialogBoxComponent, {
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
      dateIn: rowObj.dateIn,
      dateOut: rowObj.dateOut,
      dueDate: rowObj.dueDate,
      borrower: rowObj.borrower,
      branchName: rowObj.branchName,
      bookTitle: rowObj.bookTitle,
    });
    this.table.renderRows();
  }
  updateRowData(rowObj) {
    this.dataSource = this.dataSource.filter((value, key) => {
      if (value.id === rowObj.id) {
        value.id = rowObj.id;
        value.dateIn = rowObj.dateIn;
        value.dateOut = rowObj.dateOut;
        value.dueDate = rowObj.dueDate;
        value.borrower = rowObj.borrower;
        value.branchName = rowObj.branchName;
        value.bookTitle = rowObj.bookTitle;
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
