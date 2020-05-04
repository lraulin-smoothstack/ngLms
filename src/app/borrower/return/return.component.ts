import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Observable, Subject, of } from 'rxjs';

import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

import { Loan } from '../entity/loan';


import { PagerService } from '../../common/services/pager.service';
import { Pager } from '../entity/pager';

@Component({
  selector: 'app-return',
  templateUrl: './return.component.html',
  styleUrls: ['./return.component.css']
})
export class ReturnComponent implements OnInit {

  @Input() loans$;
  @Output("checkinLoan") checkinLoan: EventEmitter<any> = new EventEmitter();

  loan: Loan;
  searchLoans$: Observable<Loan[]>;
  searchTerms = new Subject<string>();


  // pagedLoans: Pager;
  pagedBooks: Pager;

  constructor(private pagerSvc: PagerService) { }

  ngOnInit(): void {
    this.searchLoans$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.searchLoans(term))
    );

    // if(state.books) {
    //   this.pagedBooks = this.pagerSvc.getPager(state.books.length, 1, 1);
    //   console.log(this.pagedBooks);
    // }

    // if(state.loans) {
    //   this.pagedLoans = this.pagerSvc.getPager(state.loans.length, 1, 1);
    //   console.log(this.pagedLoans);
    // }
  }

  ngAfterViewInit() {
    this.search('');
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  searchLoans(term: string): Observable<Loan[]> {
    if (!term.trim()) {
      return this.loans$;
    }
    return of(this.loans$.getValue().filter( loan =>
      loan.id.book.title.includes(term)
      ||
      loan.id.book.authors.join().includes(term)
    ));
  }

  getBookAuthors(book) {
    return book.authors.map( author => author.name );
  }

  getBookGenres(book) {
    return book.genres.map( genre => genre.name );
  }

  selectLoan(loan: Loan) {
    this.loan = loan;
  }
}
