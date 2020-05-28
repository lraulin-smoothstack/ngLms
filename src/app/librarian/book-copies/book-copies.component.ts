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
  bookCopies: BookCopy[];
  isLoading: any = { branch: false, bookCopies: false };
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
    this.loadBranch();
    this.loadBookCopies();
  }

  loadBranch(): void {
    if (this.activatedRoute.snapshot.paramMap.has('id')) {
      const tempId: string = this.activatedRoute.snapshot.paramMap.get('id');
      this.branchId = parseInt(tempId, 10);

      if (this.branchId) {
        this.isLoading.branch = true;
        this.branchService.getBranch(this.branchId).subscribe((data) => {
          this.branch = data;
          this.isLoading.branch = false;
        });
      }
    }
  }

  loadBookCopies(): void {
    this.isLoading.bookCopies = true;
    this.bookCopyService.getBookCopies(this.branchId).subscribe((data: any) => {
      this.bookCopies = data;
      this.totalItems = data.length;
      this.setPage(1);
      this.isLoading.bookCopies = false;
    });
  }

  deleteBookCopy(bookCopy): void {
    this.isLoading = true;
    this.bookCopyService
      .deleteBookCopy(bookCopy.id.book.id, bookCopy.id.branch.id)
      .subscribe((data: any) => {
        const bookId = bookCopy.id.book.id;
        const branchId = bookCopy.id.branch.id;
        this.bookCopies = this.bookCopies.filter(
          (bc: BookCopy) =>
            bc.id.book.id != bookId || bc.id.branch.id != branchId
        );

        this.totalItems -= 1;
        this.setPage(1);
        this.isLoading = false;
      });
  }

  updateBookCopy(): void {
    this.isLoading = true;
    this.bookCopyService
      .updateBookCopy(
        this.selectedBookCopy.id.book.id,
        this.selectedBookCopy.id.branch.id,
        this.selectedBookCopy
      )
      .subscribe((data: BookCopy) => {
        this.modalRef.close();
        this.isLoading = false;
      });
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
    const data = this.bookCopies;
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
