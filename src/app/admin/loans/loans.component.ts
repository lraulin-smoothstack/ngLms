import { AdminService } from './../admin.service';
import { Component, OnInit } from '@angular/core';
import { Loan } from '../types';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Pager, PagerService } from 'src/app/common/services/pager.service';

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
  searchString = '';
  pager: Pager;
  pagedItems: Loan[];
  itemsPerPage = 5;

  constructor(
    private adminService: AdminService,
    private modalService: NgbModal,
    private pagerService: PagerService
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

  setPage(page: number): void {
    this.pager = this.pagerService.getPager(
      this.items.length,
      page,
      this.itemsPerPage
    );

    if (page < 1 || page > this.pager.totalPages) {
      return;
    }

    this.pagedItems = this.items.slice(
      this.pager.startIndex,
      this.pager.endIndex + 1
    );
  }

  fetchData(): void {
    this.adminService.getLoans().subscribe({
      next: (items) => {
        this.items = items;
        if (this.pager) {
          this.setPage(this.pager.currentPage);
        } else {
          this.setPage(1);
        }
      },
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
