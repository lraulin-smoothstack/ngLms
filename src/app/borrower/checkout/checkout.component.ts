import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Observable, Subject, of } from 'rxjs';

import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';


import { Book } from '../entity/book';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  @Input() books;
  @Input() branch;

  @Output("checkoutBook") checkoutBook: EventEmitter<any> = new EventEmitter();  

  book: Book;

  searchBooks$: Observable<Book[]>;
  searchTerms = new Subject<string>();

  constructor() { }

  ngOnInit(): void {

    this.searchBooks$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.searchBooks(term))
    );
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  searchBooks(term: string): Observable<Book[]> {
    if (!term.trim()) {
      return of(this.books);
    }
    return of(this.books.filter( book =>
      book.name.includes(term) || book.author.includes(term)));
  }

  selectBook(book: Book) {
    this.book = book;
  }

  getBookAuthors(book) {
    return book.authors.map( author => author.name );
  }

  getBookGenres(book) {
    return book.genres.map( genre => genre.name );
  }

}
