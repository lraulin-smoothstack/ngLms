import { Injectable, Inject } from '@angular/core';
import { BookCopy } from '../models/book-copy.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BookCopiesService {
  bookCopies: BookCopy[];
  isLoading: boolean;

  constructor(
    private http: HttpClient,
    @Inject('domain') private domain: string
  ) {
    this.bookCopies = [];
  }

  getBookCopies(id: number, callback?: any): void {
    this.isLoading = true;
    this.http
      .get(`${this.domain}/lms/librarian/book-copies/branches/${id}`)
      .subscribe((data: BookCopy[]) => {
        this.bookCopies = data;
        this.isLoading = false;

        if (callback) {
          callback(data);
        }
      });
  }

  updateBookCopy(
    bookId: number,
    branchId: number,
    bookCopy: BookCopy,
    callback?: any
  ): void {
    this.isLoading = true;
    this.http
      .put(
        `${this.domain}/lms/librarian/book-copies/books/${bookId}/branches/${branchId}`,
        bookCopy
      )
      .subscribe((data: any) => {
        const bookCopyToUpdate = this.bookCopies.find(
          (bc: BookCopy) =>
            bc.id.book.id == bookId && bc.id.branch.id == branchId
        );
        bookCopyToUpdate.amount = bookCopy.amount;
        this.isLoading = false;

        if (callback) {
          callback(data);
        }
      });
  }

  addBookCopy(bookCopy: BookCopy, callback?: any): void {
    this.isLoading = true;
    this.http
      .post(`${this.domain}/lms/librarian/book-copies`, bookCopy)
      .subscribe((data: BookCopy) => {
        this.getBookCopies(data.id.branch.id, callback);
      });
  }

  deleteBookCopy(bookId: number, branchId: number, callback?: any): void {
    this.isLoading = true;
    this.http
      .delete(
        `${this.domain}/lms/librarian/book-copies/books/${bookId}/branches/${branchId}`
      )
      .subscribe((data: BookCopy[]) => {
        this.bookCopies = this.bookCopies.filter(
          (bc: BookCopy) =>
            bc.id.book.id != bookId || bc.id.branch.id != branchId
        );
        this.isLoading = false;

        if (callback) {
          callback(data);
        }
      });
  }
}
