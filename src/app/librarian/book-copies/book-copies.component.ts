import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';

import { BookCopyService } from '../services/book-copy.service';
import { BranchService } from '../services/branch.service';
import { PagerService } from '../../common/services/pager.service';
import { BookCopy } from '../../common/interfaces/book-copy.interface';
import { Branch } from '../../common/interfaces/branch.interface';

@Component({
  selector: 'app-book-copies',
  templateUrl: './book-copies.component.html',
  styleUrls: ['./book-copies.component.css'],
})
export class BookCopiesComponent implements OnInit {
  selectedBookCopy: BookCopy;
  branchId: number;
  branch: Branch;
  private modalRef: NgbModalRef;
  errMsg: any;
  closeResult: any;
  totalItems: number;
  pager: any = {};
  pagedItems: any[];
  itemsPerPage = 5;

  constructor(
    public bookCopyService: BookCopyService,
    public branchService: BranchService,
    private activatedRoute: ActivatedRoute,
    private modalService: NgbModal,
    private pagerService: PagerService
  ) {}

  ngOnInit(): void {
    if (this.activatedRoute.snapshot.paramMap.has('id')) {
      const tempId: string = this.activatedRoute.snapshot.paramMap.get('id');
      this.branchId = parseInt(tempId, 10);

      if (this.branchId) {
        this.branchService.getBranch(
          this.branchId,
          (data) => (this.branch = data)
        );
        this.loadBookCopies();
      }
    }
  }

  loadBookCopies(): void {
    this.bookCopyService.getBookCopies(this.branchId, (data: BookCopy[]) => {
      this.totalItems = data.length;
      this.setPage(1);
    });
  }

  deleteBookCopy(bookCopy): void {
    this.bookCopyService.deleteBookCopy(
      bookCopy.id.book.id,
      bookCopy.id.branch.id,
      (data) => {
        this.totalItems -= 1;
        this.setPage(1);
      }
    );
  }

  updateBookCopy(): void {
    this.bookCopyService.updateBookCopy(
      this.selectedBookCopy.id.book.id,
      this.selectedBookCopy.id.branch.id,
      this.selectedBookCopy,
      (data) => this.modalRef.close()
    );
  }

  open(content, bookCopy: BookCopy) {
    this.selectedBookCopy = bookCopy;
    this.modalRef = this.modalService.open(content);
    this.modalRef.result.then(
      (result) => {
        this.errMsg = '';
        this.closeResult = `Closed with ${result}`;
      },
      (reason) => {
        this.errMsg = '';
        this.closeResult = `Dismissed`;
      }
    );
  }

  setPage(page: number): void {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    const data = this.bookCopyService.bookCopies;
    this.pager = this.pagerService.getPager(
      data.length,
      page,
      this.itemsPerPage
    );
    this.pagedItems = data.slice(
      this.pager.startIndex,
      this.pager.endIndex + 1
    );
  }
}
