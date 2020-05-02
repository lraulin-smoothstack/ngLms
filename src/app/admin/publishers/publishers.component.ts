import { AdminService } from './../admin.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Publisher } from '../types';

@Component({
  selector: 'app-publishers',
  templateUrl: './publishers.component.html',
  styleUrls: ['./publishers.component.css'],
})
export class PublishersComponent implements OnInit {
  errorMessage: string;
  dataSource: Publisher[];
  displayedColumns: string[] = [
    'id',
    'name',
    'address',
    'phoneNumber',
    'action',
  ];

  constructor(private adminService: AdminService) {}

  fetchData(): void {
    this.adminService.getPublishers().subscribe({
      next: (publishers) => (this.dataSource = publishers),
      error: (err) => (this.errorMessage = err),
    });
  }

  addRowData(rowObj) {
    this.adminService.addPublisher(rowObj).subscribe({
      next: (_) => this.fetchData(),
      error: (err) => (this.errorMessage = err),
    });
  }

  updateRowData(rowObj) {
    console.log('Updating publisher ' + rowObj);
    this.adminService.editPublisher(rowObj).subscribe({
      next: (_) => this.fetchData(),
      error: (err) => (this.errorMessage = err),
    });
  }

  deleteRowData(rowObj) {
    console.log('Deleting publisher ' + rowObj.id + '...');
    this.adminService.deletePublisher(rowObj.id).subscribe({
      next: (_) => this.fetchData(),
      error: (err) => (this.errorMessage = err),
    });
  }

  ngOnInit(): void {
    this.fetchData();
  }
}
