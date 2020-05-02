import { AdminService } from './../admin.service';
import { Component, OnInit } from '@angular/core';
import { Borrower } from '../types';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-borrowers',
  templateUrl: './borrowers.component.html',
  styleUrls: ['./borrowers.component.css'],
})
export class BorrowersComponent implements OnInit {
  private modalRef: NgbModalRef;
  items: Borrower[] = [];
  selectedItem: Borrower;
  errorMessage: string;
  closeResult: string;

  constructor(
    private adminService: AdminService,
    private modalService: NgbModal
  ) {}

  open(content, item?: Borrower) {
    this.selectedItem = item
      ? item
      : { id: null, name: '', address: '', phoneNumber: '' };
    this.modalRef = this.modalService.open(content);
    this.modalRef.result.then(
      (result) => {
        this.errorMessage = '';
        this.closeResult = `Closed with ${result}`;
      },
      (reason) => {
        this.errorMessage = `${reason}`;
        this.closeResult = `Dismissed`;
      }
    );
  }

  fetchData(): void {
    this.adminService.getBorrowers().subscribe({
      next: (items) => (this.items = items),
      error: (err) => (this.errorMessage = err),
    });
  }

  submit() {
    if (this.selectedItem.id) {
      this.adminService.editAuthor(this.selectedItem).subscribe({
        next: (_) => this.fetchData(),
        error: (err) => (this.errorMessage = err),
      });
    } else {
      this.adminService.addAuthor(this.selectedItem).subscribe({
        next: (_) => this.fetchData(),
        error: (err) => (this.errorMessage = err),
      });
    }

    this.modalRef.close();
  }

  delete(id: number) {
    this.adminService.deleteBorrower(id).subscribe({
      next: (_) => this.fetchData(),
      error: (err) => (this.errorMessage = err),
    });
  }

  ngOnInit(): void {
    this.fetchData();
  }
}
