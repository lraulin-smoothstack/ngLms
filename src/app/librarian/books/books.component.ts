import { Component, OnInit } from '@angular/core';
import { LibraryBranch } from '../models/library-branch.interface';
import { BooksService } from '../services/books.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Book } from '../models/book.interface';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BookCopiesService } from '../services/book-copies.service';
import { BookCopy } from '../models/book-copy.interface';
import { PagerService } from 'src/app/common/services/pager.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
})
export class BooksComponent implements OnInit {
  selectedBook: Book;
  branchId: number;
  amount: number = 0;
  private modalRef: NgbModalRef;
  errMsg: any;
  closeResult: any;
  totalItems: number;
  pager: any = {};
  pagedItems: any[];
  itemsPerPage = 5;

  constructor(
    public bookService: BooksService,
    public bookCopyService: BookCopiesService,
    private activatedRoute: ActivatedRoute,
    private modalService: NgbModal,
    private router: Router,
    private pagerService: PagerService
  ) {}

  ngOnInit(): void {
    if (this.activatedRoute.snapshot.paramMap.has('id')) {
      const tempId: string = this.activatedRoute.snapshot.paramMap.get('id');
      this.branchId = parseInt(tempId, 10);

      if (this.branchId) {
        this.loadBooks();
      }
    }
  }

  loadBooks(): void {
    this.bookService.getBooks(this.branchId, (data) => {
      this.totalItems = data.length;
      this.setPage(1);
    });
  }

  addBookCopy(): void {
    const bookCopy: BookCopy = {
      id: { book: { id: this.selectedBook.id }, branch: { id: this.branchId } },
      amount: this.amount,
    };

    this.bookCopyService.addBookCopy(bookCopy, (data) => {
      this.amount = 0;
      this.modalRef.close();
      this.router.navigate(['../book-copies'], {
        relativeTo: this.activatedRoute,
      });
    });
  }

  open(content, book: Book) {
    this.selectedBook = book;
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
    const data = this.bookService.books;
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
