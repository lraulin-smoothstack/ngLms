import { AdminService } from './../admin.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Loan } from '../types';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-loans',
  templateUrl: './loans.component.html',
  styleUrls: ['./loans.component.css'],
})
export class LoansComponent implements OnInit {
  private modalRef: NgbModalRef;
  items: Loan[] = [];
  selectedItem: Loan;
  errorMessage: string;
  closeResult: string;

  constructor(
    private adminService: AdminService,
    private modalService: NgbModal
  ) {}

  open(content, item?: Loan) {
    this.selectedItem = item
      ? item
      : {
          id: null,
          dateIn: null,
          dateOut: null,
          dueDate: null,
          borrower: '',
          bookTitle: '',
          branchName: '',
        };
    console.log(typeof this.selectedItem.dateIn);
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
    this.adminService.getLoans().subscribe({
      next: (items) => (this.items = items),
      error: (err) => (this.errorMessage = err),
    });
  }

  submit() {
    if (this.selectedItem.id) {
      this.adminService.editLoan(this.selectedItem).subscribe({
        next: (_) => this.fetchData(),
        error: (err) => (this.errorMessage = err),
      });
    } else {
      this.adminService.addLoan(this.selectedItem).subscribe({
        next: (_) => this.fetchData(),
        error: (err) => (this.errorMessage = err),
      });
    }

    this.modalRef.close();
  }

  delete(id: number) {
    this.adminService.deleteLoan(id).subscribe({
      next: (_) => this.fetchData(),
      error: (err) => (this.errorMessage = err),
    });
  }

  ngOnInit(): void {
    this.fetchData();
  }
}
