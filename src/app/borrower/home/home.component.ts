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
  book: Book;
  branch: Branch;

  constructor(
    public router: Router,
    private cookieService: CookieService,
    private borrowerService: BorrowerService
  ) {}

  ngOnInit(): void {
    const cookieExists: boolean = this.cookieService.check('borrowerId');

    if(cookieExists){
      const borrowerId = this.cookieService.get('borrowerId');
      // Temp until auth server up
      this.borrower = this.borrowerService.getBorrower(borrowerId);
      // PROD
      // this.borrowerService.getBorrower(borrowerId)
      //   .subscribe( (borrower) => {
      //     this.borrower = borrower;
      //     this.borrowerService.getLoans(this.borrower.id)
      //       .subscribe( (loans) => { this.loans = loans.filter(loan => loan.dateIn == null); });
      // });
    } else {
      this.router.navigate(['/borrower/login']);
    }
  }

  selectedBook(book): void {
    if(book) {
      this.book = {
        id: book.id,
        title: book.title,
        // authors: book.authors.map( author => author.name ),
        authors: book.authors.map( author => author.name),
        genres: book.genres.map( genre => genre.name),
        branch: book.branch,
        dueDate: book.dueDate
      }
    } else {
      this.book = null;
    }
  }

  checkoutBook(): void {
    this.router.navigate(['/borrower/branch']);
  }

  checkinBook(): void {
    this.borrowerService.checkinBook(this.borrower, this.book)
      .subscribe( (res) => {
        console.log(res);
        this.borrowerService.getLoans(this.borrower.id)
          .subscribe( (loans) => {
            console.log("BOOK CHECKED IN");
            this.loans = loans;
            console.log("NEW LOANS");
            console.log(this.loans);
          });
      });
  }

  logout(): void {
    this.cookieService.deleteAll('/');
    this.router.navigate(['/']);
  }
}
