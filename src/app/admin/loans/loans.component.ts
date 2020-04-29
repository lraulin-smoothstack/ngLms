import { AdminService } from './../admin.service';
import { LoansDialogBoxComponent } from './../loans-dialog-box/loans-dialog-box.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Loan } from '../types';

@Component({
  selector: 'app-loans',
  templateUrl: './loans.component.html',
  styleUrls: ['./loans.component.css'],
})
export class LoansComponent implements OnInit {
  errorMessage: string;
  dataSource: Loan[];
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

  @ViewChild(MatTable, { static: true }) table: MatTable<any>;

  constructor(public dialog: MatDialog, private adminService: AdminService) {}

  fetchData(): void {
    this.adminService.getLoans().subscribe({
      next: (loans) => (this.dataSource = loans),
      error: (err) => (this.errorMessage = err),
    });
  }

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
    this.adminService.addLoan(rowObj).subscribe({
      next: (_) => this.fetchData(),
      error: (err) => (this.errorMessage = err),
    });
  }

  updateRowData(rowObj) {
    console.log('Updating loan ' + rowObj);
    this.adminService.editLoan(rowObj).subscribe({
      next: (_) => this.fetchData(),
      error: (err) => (this.errorMessage = err),
    });
  }

  deleteRowData(rowObj) {
    console.log('Deleting loan ' + rowObj.id + '...');
    this.adminService.deleteLoan(rowObj.id).subscribe({
      next: (_) => this.fetchData(),
      error: (err) => (this.errorMessage = err),
    });
  }

  ngOnInit(): void {
    this.fetchData();
  }
}
