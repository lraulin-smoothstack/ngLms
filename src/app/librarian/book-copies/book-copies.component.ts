import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { BookCopiesService } from '../services/book-copies.service';
import { BookCopy } from '../models/book-copy.interface';
import { LibraryBranch } from '../models/library-branch.interface';
import { LibraryBranchesService } from '../services/library-branches.service';
import { PagerService } from 'src/app/common/services/pager.service';

@Component({
  selector: 'app-book-copies',
  templateUrl: './book-copies.component.html',
  styleUrls: ['./book-copies.component.css'],
})
export class BookCopiesComponent implements OnInit {
  selectedBookCopy: BookCopy;
  branchId: number;
  branch: LibraryBranch;
  private modalRef: NgbModalRef;
  errMsg: any;
  closeResult: any;
  totalItems: number;
  pager: any = {};
  pagedItems: any[];
  itemsPerPage = 5;

  constructor(
    public bookCopyService: BookCopiesService,
    public branchService: LibraryBranchesService,
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
      data.map((v, i) => (v['index'] = i));
      this.totalItems = data.length;
      this.setPage(1);
    });
  }

  deleteBookCopy(bookCopy): void {
    this.bookCopyService.deleteBookCopy(
      bookCopy.id.book.id,
      bookCopy.id.branch.id,
      (data) => this.setPage(1)
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
    this.pager = this.pagerService.getPager(
      this.bookCopyService.bookCopies.length,
      page,
      this.itemsPerPage
    );
    this.pagedItems = this.bookCopyService.bookCopies.slice(
      this.pager.startIndex,
      this.pager.endIndex + 1
    );
  }
}
