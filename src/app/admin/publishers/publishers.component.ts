import { AdminService } from './../admin.service';
import { PublishersDialogBoxComponent } from './../publishers-dialog-box/publishers-dialog-box.component';
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

  @ViewChild(MatTable, { static: true }) table: MatTable<any>;

  constructor(public dialog: MatDialog, private adminService: AdminService) {}

  fetchData(): void {
    this.adminService.getPublishers().subscribe({
      next: (publishers) => (this.dataSource = publishers),
      error: (err) => (this.errorMessage = err),
    });
  }

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
