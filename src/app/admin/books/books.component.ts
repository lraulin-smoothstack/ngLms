import { AdminService } from './../admin.service';
import { Component, OnInit } from '@angular/core';
import { Book } from '../types';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Pager, PagerService } from 'src/app/common/services/pager.service';

const newBook = (): Book => ({
  id: null,
  title: '',
  author: '',
  publisher: '',
  genre: '',
});

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
})
export class BooksComponent implements OnInit {
  private modalRef: NgbModalRef;
  books: Book[] = [];
  selectedBook: Book;
  errorMessage: string;
  closeResult: string;
  searchString = '';
  pager: Pager;
  pagedItems: Book[];
  itemsPerPage = 5;

  constructor(
    private adminService: AdminService,
    private modalService: NgbModal,
    private pagerService: PagerService
  ) {}

  fetchData(): void {
    this.adminService.getBooks().subscribe({
      next: (books) => {
        this.books = books;
        if (this.pager) {
          this.setPage(this.pager.currentPage);
        } else {
          this.setPage(1);
        }
      },
      error: (err) => (this.errorMessage = err),
    });
  }

  open(content, book?: Book) {
    this.selectedBook = book ? book : newBook();
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
      this.books.length,
      page,
      this.itemsPerPage
    );

    if (page < 1 || page > this.pager.totalPages) {
      return;
    }

    this.pagedItems = this.books.slice(
      this.pager.startIndex,
      this.pager.endIndex + 1
    );
  }

  submit() {
    if (this.selectedBook.id) {
      this.adminService.editBook(this.selectedBook).subscribe({
        next: (_) => this.fetchData(),
        error: (err) => (this.errorMessage = err),
      });
    } else {
      this.adminService.addBook(this.selectedBook).subscribe({
        next: (_) => this.fetchData(),
        error: (err) => (this.errorMessage = err),
      });
    }

    this.modalRef.close();
  }

  deleteBook(id: number) {
    this.adminService.deleteBook(id).subscribe({
      next: (_) => this.fetchData(),
      error: (err) => (this.errorMessage = err),
    });
  }

  ngOnInit(): void {
    this.fetchData();
  }
}
