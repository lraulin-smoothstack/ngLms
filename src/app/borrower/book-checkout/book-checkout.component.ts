import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";

import { Observable, Subject, of } from 'rxjs';
import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

import { CookieService } from 'ngx-cookie-service';
import { BorrowerService } from '../service/borrower.service';

import { Book } from '../entity/book';
import { Branch } from '../entity/branch';
import { Borrower } from '../entity/borrower';



@Component({
  selector: 'app-book-checkout',
  templateUrl: './book-checkout.component.html',
  styleUrls: ['./book-checkout.component.css']
})
export class BookCheckoutComponent implements OnInit {

  book: Book;
  branch: Branch;
  books: Array<any>;
  borrower: Borrower;

  searchBooks$: Observable<Book[]>;
  searchTerms = new Subject<string>();

  constructor(
    public router: Router,
    private cookieService: CookieService,
    private borrowerService: BorrowerService
  ) {
    this.borrower = this.borrowerService.borrower;
    this.branch = this.borrowerService.branch;
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  searchBooks(term: string): Observable<Book[]> {
    if (!term.trim()) {
      return of(this.books);
    }
    return of(this.books.filter( book =>
      book.title.includes(term)
      ||
      book.authors.join().includes(term)
      ||
      book.genres.join().includes(term)
    ));
  }

  selectedBook(book): void {
    // if(book) {
    //   this.book = {
    //     id: book.id,
    //     title: book.title,
    //     authors: book.authors,
    //     genres: book.genres,
    //     branch: book.branch,
    //     dueDate: book.dueDate
    //   }
    // } else {
    //   this.book = null;
    // }
  }

  checkoutBook(): void {
    console.log("CHECKING OUT BOOK");
    // this.borrowerService.checkoutBook(this.borrower.id, this.book)
    //   .subscribe( (res) => {
    //     console.log(res);
    //   });
  }

  ngOnInit(): void {
    const cookieExists: boolean = this.cookieService.check('borrowerId');
    // if(!this.borrower || !this.branch){
    //   this.router.navigate(['/borrower/login']);
    // } else {
    //   this.borrowerService.getAvailableBooks(this.branch.id, this.borrower.id)
    //     .subscribe( (books) => {
    //       this.books = books.map( b => {
    //         let book = {}
    //         book = b;
    //         book['authors'] = b.authors.map( author => author.name);
    //         book['genres'] = b.genres.map( genre => genre.name);
    //         return book;
    //       })
    //       this.search('');
    //   });
    //
    //   this.searchBooks$ = this.searchTerms.pipe(
    //     debounceTime(300),
    //     distinctUntilChanged(),
    //     switchMap((term: string) => this.searchBooks(term))
    //   );
    // }
  }
}
