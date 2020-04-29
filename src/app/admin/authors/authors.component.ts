import { AdminService } from './../admin.service';
import { AuthorsDialogBoxComponent } from './../authors-dialog-box/authors-dialog-box.component';
import { Component, ViewChild, OnInit } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Author } from '../types';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css'],
})
export class AuthorsComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'action'];
  dataSource: Author[] = [];
  errorMessage: string;

  @ViewChild(MatTable, { static: true }) table: MatTable<any>;

  constructor(public dialog: MatDialog, private adminService: AdminService) {}

  fetchData(): void {
    this.adminService.getAuthors().subscribe({
      next: (authors) => (this.dataSource = authors),
      error: (err) => (this.errorMessage = err),
    });
  }

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
    this.adminService.addAuthor(rowObj).subscribe({
      next: (_) => this.fetchData(),
      error: (err) => (this.errorMessage = err),
    });
  }

  updateRowData(rowObj) {
    console.log('Updating author ' + rowObj);
    this.adminService.editAuthor(rowObj).subscribe({
      next: (_) => this.fetchData(),
      error: (err) => (this.errorMessage = err),
    });
  }

  deleteRowData(rowObj) {
    console.log('Deleting author ' + rowObj.id + '...');
    this.adminService.deleteAuthor(rowObj.id).subscribe({
      next: (_) => this.fetchData(),
      error: (err) => (this.errorMessage = err),
    });
  }

  ngOnInit(): void {
    this.fetchData();
  }
}
