import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Observable, Subject, of } from 'rxjs';

import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

import { Loan } from '../entity/loan';

@Component({
  selector: 'app-return',
  templateUrl: './return.component.html',
  styleUrls: ['./return.component.css']
})
export class ReturnComponent implements OnInit {

  @Input() loans;
  @Output("checkinLoan") checkinLoan: EventEmitter<any> = new EventEmitter();

  loan: Loan;
  searchLoans$: Observable<Loan[]>;
  searchTerms = new Subject<string>();

  constructor() { console.log(this.loans); }

  ngOnInit(): void {
    this.searchLoans$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.searchLoans(term))
    );
  }

  search(term: string): void {
    console.log("LOANS IN RETURN");
    console.log(this.loans);
    this.searchTerms.next(term);
  }

  searchLoans(term: string): Observable<Loan[]> {
    if (!term.trim()) {
      return of(this.loans);
    }
    return of(this.loans.filter( loan =>
      loan.name.includes(term) || loan.includes(term)));
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
