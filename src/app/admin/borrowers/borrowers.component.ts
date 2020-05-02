import { AdminService } from './../admin.service';
import { Component, ViewChild, OnInit } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Borrower } from '../types';

@Component({
  selector: 'app-borrowers',
  templateUrl: './borrowers.component.html',
  styleUrls: ['./borrowers.component.css'],
})
export class BorrowersComponent implements OnInit {
  errorMessage: string;
  dataSource: Borrower[];
  displayedColumns: string[] = [
    'id',
    'name',
    'address',
    'phoneNumber',
    'action',
  ];

  constructor(private adminService: AdminService) {}

  fetchData(): void {
    this.adminService.getBorrowers().subscribe({
      next: (borrowers) => (this.dataSource = borrowers),
      error: (err) => (this.errorMessage = err),
    });
  }

  addRowData(rowObj) {
    this.adminService.addBorrower(rowObj).subscribe({
      next: (_) => this.fetchData(),
      error: (err) => (this.errorMessage = err),
    });
  }

  updateRowData(rowObj) {
    console.log('Updating borrower ' + rowObj);
    this.adminService.editBorrower(rowObj).subscribe({
      next: (_) => this.fetchData(),
      error: (err) => (this.errorMessage = err),
    });
  }

  deleteRowData(rowObj) {
    console.log('Deleting borrower ' + rowObj.id + '...');
    this.adminService.deleteBorrower(rowObj.id).subscribe({
      next: (_) => this.fetchData(),
      error: (err) => (this.errorMessage = err),
    });
  }

  ngOnInit(): void {
    this.fetchData();
  }
}
