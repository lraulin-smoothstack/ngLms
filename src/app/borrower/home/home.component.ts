import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CookieService } from 'ngx-cookie-service';
import { BorrowerService } from '../service/borrower.service';

import { Loan } from '../entity/loan';
import { Book } from '../entity/book';
import { Branch } from '../entity/branch';
import { Borrower } from '../entity/borrower';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  borrower: Borrower;
  loans: Array<Loan>;
  loan: Loan;

  constructor(
    public router: Router,
    private cookieService: CookieService,
    private borrowerService: BorrowerService
  ) {}

  ngOnInit(): void {
    const cookieExists: boolean = this.cookieService.check('borrowerId');

    if(cookieExists){
      const borrowerId = this.cookieService.get('borrowerId');

      // PROD
      // this.borrowerService.getBorrower(borrowerId)
      //   .subscribe( (borrower) => {
      //     this.borrower = borrower;
      //     this.borrowerService.getLoans(this.borrower.id)
      //       .subscribe( (loans) => { this.loans = loans.filter(loan => loan.dateIn == null); });
      // });

      // DEV: Until auth server is up
      this.borrower = this.borrowerService.getBorrower(borrowerId);
      this.borrowerService.getLoans(this.borrower.id)
        .subscribe( (loans) => {
          this.loans = loans.filter(loan => loan.dateIn == null);
         });

    } else {
      this.router.navigate(['/borrower/login']);
    }
  }

  selectedLoan(loan): void {
    this.loan = loan;
  }

  checkoutBook(): void {
    this.router.navigate(['/borrower/branch']);
  }

  checkinBook(loan: Loan): void {
    this.borrowerService.checkinBook(loan)
      .subscribe( (res) => {
        this.borrowerService.getLoans(this.borrower.id)
          .subscribe( (loans) => {
            this.loans = loans.filter(loan => loan.dateIn == null);
          });
      });
  }

  getBookAuthors(loan: Loan) {
    return loan.id.book.authors.map( author => author.name );
  }

  getBookGenres(loan: Loan) {
    return loan.id.book.genres.map( genre => genre.name );
  }

  logout(): void {
    this.cookieService.deleteAll('/');
    this.router.navigate(['/']);
  }
}
