import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { BookCopyService } from '../services/book-copy.service';
import { BookService } from '../services/book.service';
import { PagerService } from '../../common/services/pager.service';
import { BookCopy } from '../../common/interfaces/book-copy.interface';
import { Book } from '../../common/interfaces/book.interface';
import { Branch } from '../../common/interfaces/branch.interface';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
})
export class BooksComponent implements OnInit {
  selectedBook: Book;
  books: Book[];
  isLoading: boolean;
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
    public bookService: BookService,
    public bookCopyService: BookCopyService,
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
    this.isLoading = true;
    this.bookService.getBooks(this.branchId).subscribe((data) => {
      this.books = data;
      this.totalItems = data.length;
      this.setPage(1);
      this.isLoading = false;
    });
  }

  addBookCopy(): void {
    const bookCopy: BookCopy = {
      id: {
        book: {
          id: this.selectedBook.id,
          title: null,
          publisher: null,
          authors: [],
          genres: [],
        },
        branch: { id: this.branchId, name: null, address: null },
      },
      amount: this.amount,
    };

    this.isLoading = true;
    this.bookCopyService.addBookCopy(bookCopy).subscribe((data: BookCopy) => {
      this.amount = 0;
      this.modalRef.close();
      this.isLoading = false;
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
    const data = this.books;
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
