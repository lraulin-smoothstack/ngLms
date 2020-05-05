import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Book } from '../../common/interfaces/book.interface';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  books: Book[];
  isLoading: boolean;

  constructor(
    private http: HttpClient,
    @Inject('domain') private domain: string
  ) {
    this.books = [];
  }

  getBooks(branchId: number, callback?: any) {
    this.isLoading = true;
    this.http
      .get(
        `${this.domain}/lms/librarian/books/book-copies/branches/${branchId}`
      )
      .subscribe((data: Book[]) => {
        this.books = data;
        this.isLoading = false;

        if (callback) {
          callback(data);
        }
      });
  }
}
