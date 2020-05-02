import { AdminService } from './../admin.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Branch } from '../types';

@Component({
  selector: 'app-branches',
  templateUrl: './branches.component.html',
  styleUrls: ['./branches.component.css'],
})
export class BranchesComponent implements OnInit {
  errorMessage: string;
  dataSource: Branch[];

  constructor(private adminService: AdminService) {}

  fetchData(): void {
    this.adminService.getBranches().subscribe({
      next: (branches) => (this.dataSource = branches),
      error: (err) => (this.errorMessage = err),
    });
  }

  addRowData(rowObj) {
    this.adminService.addBranch(rowObj).subscribe({
      next: (_) => this.fetchData(),
      error: (err) => (this.errorMessage = err),
    });
  }

  updateRowData(rowObj) {
    console.log('Updating branch ' + rowObj);
    this.adminService.editBranch(rowObj).subscribe({
      next: (_) => this.fetchData(),
      error: (err) => (this.errorMessage = err),
    });
  }

  deleteRowData(rowObj) {
    console.log('Deleting branch ' + rowObj.id + '...');
    this.adminService.deleteBranch(rowObj.id).subscribe({
      next: (_) => this.fetchData(),
      error: (err) => (this.errorMessage = err),
    });
  }

  ngOnInit(): void {
    this.fetchData();
  }
}
