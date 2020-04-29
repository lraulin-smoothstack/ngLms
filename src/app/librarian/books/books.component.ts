import { Component, OnInit } from '@angular/core';
import { LibraryBranch } from '../models/library-branch.interface';
import { BooksService } from '../services/books.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Book } from '../models/book.interface';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BookCopiesService } from '../services/book-copies.service';
import { BookCopy } from '../models/book-copy.interface';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
})
export class BooksComponent implements OnInit {
  selectedBook: Book;
  branchId: number;
  amount: number;
  private modalRef: NgbModalRef;
  errMsg: any;
  closeResult: any;

  constructor(
    public bookService: BooksService,
    public bookCopyService: BookCopiesService,
    private activatedRoute: ActivatedRoute,
    private modalService: NgbModal,
    private router: Router
  ) {
    this.amount = 0;
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

  ngOnInit(): void {
    if (this.activatedRoute.snapshot.paramMap.has('id')) {
      const tempId: string = this.activatedRoute.snapshot.paramMap.get('id');
      this.branchId = parseInt(tempId, 10);

      if (this.branchId) {
        this.bookService.getBooks(this.branchId);
      }
    }
  }
}
