import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { BookCopiesService } from '../services/book-copies.service';
import { BookCopy } from '../models/book-copy.interface';
import { LibraryBranch } from '../models/library-branch.interface';
import { LibraryBranchesService } from '../services/library-branches.service';

@Component({
  selector: 'app-book-copies',
  templateUrl: './book-copies.component.html',
  styleUrls: ['./book-copies.component.css'],
})
export class BookCopiesComponent implements OnInit {
  selectedBookCopy: BookCopy;
  branch: LibraryBranch;
  private modalRef: NgbModalRef;
  errMsg: any;
  closeResult: any;

  constructor(
    public bookCopyService: BookCopiesService,
    public branchService: LibraryBranchesService,
    private activatedRoute: ActivatedRoute,
    private modalService: NgbModal
  ) {}

  deleteBookCopy(bookCopy): void {
    this.bookCopyService.deleteBookCopy(
      bookCopy.id.book.id,
      bookCopy.id.branch.id
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

  ngOnInit(): void {
    if (this.activatedRoute.snapshot.paramMap.has('id')) {
      const tempId: string = this.activatedRoute.snapshot.paramMap.get('id');
      const id = parseInt(tempId, 10);
      console.log('Hello world');

      if (
        (id && this.bookCopyService.bookCopies.length == 0) ||
        (id && id != this.bookCopyService.bookCopies[0].id.branch.id)
      ) {
        this.bookCopyService.getBookCopies(id, (data: BookCopy[]) => {
          this.branchService.getBranch(id, (data) => (this.branch = data));
        });
      } else {
        this.branchService.getBranch(id, (data) => (this.branch = data));
      }
    }
  }
}
