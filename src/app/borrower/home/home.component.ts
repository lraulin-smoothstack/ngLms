import { Component, OnInit, Input, Output } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import { CookieService } from 'ngx-cookie-service';
import { PagerService } from '../../common/services/pager.service';

import { Loan } from '../entity/loan';
import { Book } from '../entity/book';
import { Branch } from '../entity/branch';
import { Pager } from '../entity/pager';
import { Borrower } from '../entity/borrower';
import { BorrowerState } from '../entity/borrowerState';
import { BorrowerService } from '../borrower.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @Input() state$;

  book: Book;
  branch: Branch;
  pagedLoans: Pager;
  pagedBooks: Pager;

  constructor(
    private pagerSvc: PagerService,
    private cookieSvc: CookieService,
    private borrowerSvc: BorrowerService
  ) {
    this.borrowerSvc.fetchLoans();
    this.borrowerSvc.fetchBranches();
  }

  ngOnInit(): void {

    this.state$.subscribe(
      state => {

        const borrower = state.borrower;
        const cookie = this.cookieSvc.get('borrowerId');

        if(borrower.id != parseInt(cookie)){
          state.next(Object.assign({}, {...state, borrower: null}));
          return;
        }

        if(state.books) {
          this.pagedBooks = this.pagerSvc.getPager(state.books.length, 1, 1);
          console.log(this.pagedBooks);
        }

        if(state.loans) {
          this.pagedLoans = this.pagerSvc.getPager(state.loans.length, 1, 1);
          console.log(this.pagedLoans);
        }
    });
  }

  selectBranch(branch: Branch) {
    this.branch = branch;
    this.borrowerSvc.fetchAvailableBooks(this.branch);
  }

  checkoutBook(book: Book): void {
    this.book = book;
    this.borrowerSvc.checkoutBook(this.book, this.branch);
  }

  checkinLoan(loan: Loan) {
    this.borrowerSvc.checkinLoan(loan);
  }
}
